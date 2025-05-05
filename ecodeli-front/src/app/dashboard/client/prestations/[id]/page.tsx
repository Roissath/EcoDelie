'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface PrestationDetail {
  id: number
  titre: string
  description: string
  date_publication: string
  statut: string
  infoPrestataire?: {
    tarif_prestation: number
    utilisateur: {
      nom: string
      prenom: string
      email: string
    }
  }
}

export default function PrestationDetailPage() {
  const { id } = useParams()
  const [prestation, setPrestation] = useState<PrestationDetail | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`http://localhost:3001/annonces/client/prestations/${id}`)
      .then(res => res.json())
      .then(setPrestation)
      .catch(() => router.push('/dashboard/client/prestations'))
  }, [id, router])

  if (!prestation) {
    return <p className="p-6">Chargement...</p>
  }

  const date = new Date(prestation.date_publication).toLocaleDateString()

  return (
    <div className="bg-[#FAFAFA] p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[#0070C0] mb-4">{prestation.titre}</h1>

      <p className="text-gray-700 mb-2">{prestation.description}</p>
      <p className="text-sm text-gray-500 mb-2">Statut : <strong>{prestation.statut}</strong></p>
      <p className="text-sm text-gray-500 mb-2">Publié le : {date}</p>

      {prestation.infoPrestataire && (
        <div className="mt-6 p-4 border rounded-xl bg-white">
          <h2 className="text-lg font-semibold mb-2">Prestataire assigné</h2>
          <p>👤 {prestation.infoPrestataire.utilisateur.prenom} {prestation.infoPrestataire.utilisateur.nom}</p>
          <p>📧 {prestation.infoPrestataire.utilisateur.email}</p>
          <p>💰 Tarif proposé : {prestation.infoPrestataire.tarif_prestation} €</p>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-xl text-sm font-medium"
        >
          ← Retour
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-green-700"
        >
          Discuter avec le prestataire
        </button>
      </div>
    </div>
  )
}
