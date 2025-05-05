'use client'

import { useEffect, useState } from 'react'
import { Briefcase } from 'lucide-react'
import Link from 'next/link'

interface Prestation {
  id: number
  titre: string
  description: string
  date_publication: string
  infoPrestataire?: {
    utilisateur: {
      nom: string
      prenom: string
    }
  }
}

export default function PrestationsClient() {
  const [prestations, setPrestations] = useState<Prestation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clientId = 1 // Remplacer dynamiquement plus tard
    fetch(`http://localhost:3001/annonces/client/${clientId}/prestations`)
      .then(res => res.json())
      .then(data => {
        setPrestations(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6 flex items-center gap-2">
        <Briefcase className="w-7 h-7 text-green-600" />
        Mes prestations validées
      </h1>

      {loading ? (
        <p>Chargement...</p>
      ) : prestations.length === 0 ? (
        <p className="text-gray-500">Aucune prestation acceptée pour le moment.</p>
      ) : (
        <ul className="space-y-6">
          {prestations.map(p => (
            <li key={p.id} className="bg-white p-6 rounded-xl shadow border">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{p.titre}</h2>
              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
              <p className="text-sm text-gray-500">
                Par : {p.infoPrestataire?.utilisateur.prenom} {p.infoPrestataire?.utilisateur.nom}
              </p>
              <p className="text-sm text-gray-500">Publiée le : {new Date(p.date_publication).toLocaleDateString()}</p>

              <div className="mt-4 flex gap-4">
                <Link href={`/client/prestations/${p.id}`} className="text-blue-600 underline">
                  Voir détails
                </Link>
                <Link href={`/client/chat/${p.id}`} className="text-green-600 underline">
                  Discuter
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
