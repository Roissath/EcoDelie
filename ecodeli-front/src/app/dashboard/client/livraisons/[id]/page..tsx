'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface LivraisonDetail {
  id: number
  date_livraison: string
  adresse: string
  statut: string
  commande?: {
    id: number
    prix_unitaire: number
    date_commande: string
    statut: string
  }
  client?: {
    nom: string
    prenom: string
    adresse: string
  }
  livreur?: {
    nom: string
    prenom: string
  }
}

export default function LivraisonDetailPage() {
  const { id } = useParams()
  const [livraison, setLivraison] = useState<LivraisonDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/livraison/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setLivraison(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-10 text-lg">Chargement...</div>
  if (!livraison) return <div className="text-center py-10 text-red-600">Aucune information trouvée.</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Détails de la Livraison #{livraison.id}</h1>

      <div className="bg-white rounded-xl shadow p-6 border space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Date prévue :</p>
          <p className="text-lg font-medium">{new Date(livraison.date_livraison).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Adresse de livraison :</p>
          <p className="text-lg font-medium">{livraison.adresse}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Statut :</p>
          <span
            className={`text-sm px-3 py-1 rounded-full inline-block ${
              livraison.statut === 'livrée'
                ? 'bg-green-100 text-green-700'
                : livraison.statut === 'en cours'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {livraison.statut}
          </span>
        </div>

        {livraison.commande && (
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-1">Commande liée :</h2>
            <p>ID : #{livraison.commande.id}</p>
            <p>Prix : {livraison.commande.prix_unitaire} €</p>
            <p>Passée le : {new Date(livraison.commande.date_commande).toLocaleDateString()}</p>
            <p>Statut de la commande : {livraison.commande.statut}</p>
          </div>
        )}

        {livraison.livreur && (
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-1">Livreur assigné :</h2>
            <p>{livraison.livreur.prenom} {livraison.livreur.nom}</p>
          </div>
        )}
      </div>

      <Link
        href="/dashboard/client/livraisons"
        className="mt-6 inline-block text-blue-600 hover:underline text-sm"
      >
        ← Retour à mes livraisons
      </Link>
    </div>
  )
}
