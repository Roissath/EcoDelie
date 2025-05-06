'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Livraison {
  adresse: string
  statut: string
}

interface Facture {
  numero: string
  total: number
}

interface ProduitCommande {
  id: number
  nom: string
  prix: number
  quantite: number
  image?: string
}

interface Commande {
  id: number
  statut: string
  date_commande: string
  prix_unitaire: number
  livraison?: Livraison
  facture?: Facture
  produits?: ProduitCommande[]
}

export default function DetailCommandePage() {
  const { id } = useParams()
  const router = useRouter()
  const [commande, setCommande] = useState<Commande | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/commande/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCommande(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center py-10 text-gray-500">Chargement...</div>
  if (!commande) return <div className="text-center py-10 text-red-500">Commande introuvable.</div>

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold text-[#0070C0] mb-4">Détail de la commande #{commande.id}</h1>

      <div className="space-y-2 text-gray-800">
        <p><strong>Statut :</strong> {commande.statut}</p>
        <p><strong>Date :</strong> {new Date(commande.date_commande).toLocaleDateString()}</p>
        <p><strong>Prix total :</strong> {commande.prix_unitaire} €</p>
      </div>

      {commande.produits && commande.produits.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Produits commandés</h2>
          <div className="space-y-4">
            {commande.produits.map((prod) => (
              <div key={prod.id} className="flex gap-4 items-center border rounded-lg p-4 shadow-sm">
                {prod.image && (
                  <img
                    src={prod.image}
                    alt={prod.nom}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-[#0070C0]">{prod.nom}</p>
                  <p>Quantité : {prod.quantite}</p>
                  <p>Prix unitaire : {prod.prix} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {commande.livraison && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Livraison</h2>
          <p><strong>Adresse :</strong> {commande.livraison.adresse}</p>
          <p><strong>Statut :</strong> {commande.livraison.statut}</p>
        </div>
      )}

      {commande.facture && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Facture</h2>
          <p><strong>Numéro :</strong> {commande.facture.numero}</p>
          <p><strong>Total :</strong> {commande.facture.total} €</p>
        </div>
      )}
    </div>
  )
}
