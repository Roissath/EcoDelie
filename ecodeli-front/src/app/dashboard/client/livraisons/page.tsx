'use client'

import { useEffect, useState } from 'react'
import { Truck } from 'lucide-react'

interface Livraison {
  id: number
  statut: string
  adresse: string
  date_livraison: string
  commande: {
    id: number
    date_commande: string
    prix_unitaire: number
  }
  livreur?: {
    nom: string
    prenom: string
  }
}

export default function LivraisonsClient() {
  const [livraisons, setLivraisons] = useState<Livraison[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clientId = 1 // ⚠️ Remplacer par le vrai ID connecté plus tard

    fetch(`http://localhost:3001/livraisons/client/${clientId}`)
      .then(res => res.json())
      .then(data => {
        setLivraisons(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6 flex items-center gap-2">
        <Truck className="w-7 h-7 text-green-600" />
        Suivi de mes livraisons
      </h1>

      {loading ? (
        <p className="text-gray-600">Chargement en cours...</p>
      ) : livraisons.length === 0 ? (
        <p className="text-gray-500">Aucune livraison trouvée.</p>
      ) : (
        <ul className="space-y-6">
          {livraisons.map((liv) => (
            <li key={liv.id} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row justify-between sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">
                  Commande #{liv.commande?.id}
                </h2>
                <p className="text-sm text-gray-600">Adresse : {liv.adresse}</p>
                <p className="text-sm text-gray-600">
                  Livré par : {liv.livreur ? `${liv.livreur.prenom} ${liv.livreur.nom}` : 'Non encore assigné'}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Date prévue : {new Date(liv.date_livraison).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    liv.statut === 'livré'
                      ? 'bg-green-100 text-green-800'
                      : liv.statut === 'en route'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {liv.statut}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
