'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Livraison {
  id: number
  date_livraison: string
  adresse: string
  statut: string
  commande?: {
    id: number
    prix_unitaire: number
    date_commande: string
  }
}

export default function LivraisonsClientPage() {
  const [livraisons, setLivraisons] = useState<Livraison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/livraison/client/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setLivraisons(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10 text-lg">Chargement des livraisons...</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mes Livraisons</h1>
      {livraisons.length === 0 ? (
        <p className="text-center text-gray-500">Aucune livraison pour le moment.</p>
      ) : (
        <div className="grid gap-6">
          {livraisons.map((livraison) => (
            <div key={livraison.id} className="border border-gray-200 rounded-2xl p-5 shadow bg-white hover:shadow-md transition">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-500">Livraison #{livraison.id}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
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
              <p className="text-gray-700"><strong>Adresse :</strong> {livraison.adresse}</p>
              <p className="text-gray-700"><strong>Date prévue :</strong> {new Date(livraison.date_livraison).toLocaleDateString()}</p>

              {livraison.commande && (
                <div className="mt-2 text-sm text-gray-600">
                  <p><strong>Commande liée :</strong> #{livraison.commande.id}</p>
                  <p><strong>Prix :</strong> {livraison.commande.prix_unitaire} €</p>
                  <p><strong>Date commande :</strong> {new Date(livraison.commande.date_commande).toLocaleDateString()}</p>
                </div>
              )}

              <Link
                href={`/dashboard/client/livraisons/${livraison.id}`}
                className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
              >
                Voir les détails
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
