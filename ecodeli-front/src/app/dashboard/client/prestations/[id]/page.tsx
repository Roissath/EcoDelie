'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Prestation {
  id: number
  titre: string
  description: string
  date_publication: string
  statut: string
  utilisateur: {
    id: number
    nom: string
    prenom: string
  }
  type_annonce: string
}

export default function DetailPrestationPage() {
  const { id } = useParams()
  const router = useRouter()
  const [prestation, setPrestation] = useState<Prestation | null>(null)
  const [similaires, setSimilaires] = useState<Prestation[]>([])

  useEffect(() => {
    fetch(`http://localhost:3001/annonces/${id}`)
      .then(res => res.json())
      .then(data => {
        setPrestation(data)
        if (data.type_annonce) {
          fetch(`http://localhost:3001/annonces/type/${data.type_annonce}`)
            .then(res => res.json())
            .then(list => {
              setSimilaires(list.filter((a: Prestation) => a.id !== data.id))
            })
        }
      })
  }, [id])

  const accepterPrestation = async () => {
    const res = await fetch(`http://localhost:3001/annonce-client`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ annonceId: prestation?.id })
    })
    if (res.ok) {
      alert('Prestation acceptée.')
      router.push('/dashboard/client/prestations')
    } else {
      alert('Erreur lors de l’acceptation.')
    }
  }

  if (!prestation) return <div className="p-6 text-center text-gray-500">Chargement en cours...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      {/* Prestation en détail */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
        <h1 className="text-3xl font-bold text-blue-700">{prestation.titre}</h1>
        <p className="text-gray-700 leading-relaxed">{prestation.description}</p>
        <div className="text-sm text-gray-500">
          Publiée le <span className="font-medium">{new Date(prestation.date_publication).toLocaleDateString()}</span>
          {' '}• Statut : <span className="capitalize font-medium">{prestation.statut}</span>
        </div>
        <div className="text-gray-600">
          Proposée par : <span className="font-semibold">{prestation.utilisateur.prenom} {prestation.utilisateur.nom}</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={accepterPrestation}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition font-medium"
          >
            ✅ Accepter la prestation
          </button>
          <Link
            href={`/dashboard/client/chat/${prestation.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition font-medium"
          >
            💬 Discuter avec le prestataire
          </Link>
        </div>
      </div>

      {/* Prestations similaires */}
      {similaires.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Prestations similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similaires.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/client/prestations/${p.id}`}
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-5 block border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">{p.titre}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
                <p className="text-xs text-gray-400 mt-3">Par {p.utilisateur.prenom} {p.utilisateur.nom}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
