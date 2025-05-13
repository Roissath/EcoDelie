'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Prestation {
  id: number
  titre: string
  description: string
  utilisateur: {
    id: number
    prenom: string
    nom: string
  }
  type_annonce: string
}

export default function ListePrestationsClient() {
  const searchParams = useSearchParams()
  const prestataireId = searchParams.get('prestataire')

  const [prestations, setPrestations] = useState<Prestation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = prestataireId
      ? `http://localhost:3001/annonces?type=prestation&utilisateurId=${prestataireId}`
      : `http://localhost:3001/annonces/type/prestation`

    fetch(url)
      .then(res => res.json())
      .then(data => setPrestations(data))
      .finally(() => setLoading(false))
  }, [prestataireId])

  if (loading) return <div className="p-6 text-center">Chargement des prestations...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        {prestataireId ? 'Prestations du prestataire' : 'Toutes les prestations disponibles'}
      </h1>

      {prestations.length === 0 ? (
        <p className="text-center text-gray-500">Aucune prestation trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {prestations.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/client/prestations/${p.id}`}
              className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-5 block border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">{p.titre}</h3>
              <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
              <p className="text-xs text-gray-400 mt-3">
                Par {p.utilisateur.prenom} {p.utilisateur.nom}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
