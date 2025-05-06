'use client'

import { useEffect, useState } from 'react'

interface Prestation {
  id: number
  titre: string
  description: string
  date: string
  statut: string
  prestataire?: {
    nom: string
    prenom: string
  }
}

export default function PrestationsClient() {
  const [prestations, setPrestations] = useState<Prestation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/annonces', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPrestations(data)
        } else {
          console.error('Réponse inattendue :', data)
          setPrestations([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Erreur fetch prestations client :', err)
        setPrestations([])
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Les prestations </h1>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : prestations.length === 0 ? (
        <p className="text-gray-500">Aucune prestation trouvée.</p>
      ) : (
        <ul className="space-y-6">
          {prestations.map((p) => (
            <li
              key={p.id}
              className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-blue-700">{p.titre}</h2>
                <span className="text-sm text-gray-500 italic">
                  {new Date(p.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{p.description}</p>
              {p.prestataire && (
                <p className="text-sm text-gray-500">
                  Prestataire : {p.prestataire.prenom} {p.prestataire.nom}
                </p>
              )}
              <p
                className={`text-sm font-medium mt-2 ${
                  p.statut === 'validée'
                    ? 'text-green-600'
                    : p.statut === 'en attente'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                Statut : {p.statut}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
