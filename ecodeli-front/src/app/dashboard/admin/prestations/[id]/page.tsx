'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Utilisateur {
  nom: string
  prenom: string
  email: string
}

interface PrestationAnnonce {
  id: number
  titre: string
  description: string
  statut: string
  date_publication: string
  utilisateur: Utilisateur | null
}

export default function PrestationDetailPage() {
  const { id } = useParams()
  const [prestation, setPrestation] = useState<PrestationAnnonce | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/annonces/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setPrestation(data))
  }, [id])

  if (!prestation) {
    return <div className="p-10 text-center text-gray-600">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">
          Détail de la prestation #{prestation.id}
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📝 Informations Générales</h2>
          <p className="mb-2"><span className="font-semibold">Titre :</span> {prestation.titre}</p>
          <p className="mb-2"><span className="font-semibold">Description :</span> {prestation.description || '-'}</p>
          <p className="mb-2"><span className="font-semibold">Statut :</span> {prestation.statut}</p>
          <p><span className="font-semibold">Date publication :</span> {new Date(prestation.date_publication).toLocaleString('fr-FR')}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">👤 Client</h2>
          {prestation.utilisateur ? (
            <>
              <p className="mb-2"><span className="font-semibold">Nom :</span> {prestation.utilisateur.nom}</p>
              <p className="mb-2"><span className="font-semibold">Prénom :</span> {prestation.utilisateur.prenom}</p>
              <p><span className="font-semibold">Email :</span> {prestation.utilisateur.email}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Aucun utilisateur lié.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
