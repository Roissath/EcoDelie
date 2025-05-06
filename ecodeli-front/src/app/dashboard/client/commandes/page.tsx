'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Commande {
  id: number
  statut: string
  date_commande: string
  prix_unitaire: number
}

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/commande/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setCommandes(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Chargement des commandes...
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes Commandes</h1>

      {commandes.length === 0 ? (
        <p className="text-gray-600">Aucune commande trouvée.</p>
      ) : (
        <div className="space-y-4">
          {commandes.map(commande => (
            <CommandeCard key={commande.id} commande={commande} />
          ))}
        </div>
      )}
    </div>
  )
}

function CommandeCard({ commande }: { commande: Commande }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500">Commande #{commande.id}</p>
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
          {commande.statut}
        </span>
      </div>
      <p className="text-gray-800"><strong>Date :</strong> {new Date(commande.date_commande).toLocaleDateString()}</p>
      <p className="text-gray-800"><strong>Prix :</strong> {commande.prix_unitaire} €</p>

      <Link
        href={`/dashboard/client/commandes/${commande.id}`}
        className="inline-block mt-4 text-sm text-blue-600 hover:underline font-medium"
      >
        Voir les détails →
      </Link>
    </div>
  )
}
