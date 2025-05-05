'use client'

import { useEffect, useState } from 'react'
import { ClipboardList } from 'lucide-react'

interface Commande {
  id: number
  date_commande: string
  prix_unitaire: number
  statut: string
  produit?: {
    nom: string
    imageUrl?: string
  }
}

export default function CommandesClient() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clientId = 1 // ⚠️ À remplacer par l'utilisateur connecté plus tard

    fetch(`http://localhost:3001/commandes/client/${clientId}`)
      .then(res => res.json())
      .then(data => {
        setCommandes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6 flex items-center gap-2">
        <ClipboardList className="w-7 h-7 text-green-600" />
        Mes commandes
      </h1>

      {loading ? (
        <p className="text-gray-600">Chargement...</p>
      ) : commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande passée.</p>
      ) : (
        <ul className="space-y-6">
          {commandes.map(cmd => (
            <li key={cmd.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{cmd.produit?.nom || 'Produit inconnu'}</h2>
                <p className="text-sm text-gray-600">Commande du : {new Date(cmd.date_commande).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Statut : <span className="font-semibold">{cmd.statut}</span></p>
              </div>
              <div className="text-right">
                <p className="text-green-700 font-bold text-xl">{cmd.prix_unitaire.toFixed(2)} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
