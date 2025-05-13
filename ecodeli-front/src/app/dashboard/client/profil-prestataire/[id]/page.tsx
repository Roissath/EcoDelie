'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface InfoPrestataire {
  id: number
  types_services: string
  certification?: string
  status: string
  tarif_prestation: number
  bio?: string
  competence?: string
  verifie: boolean
  utilisateur: {
    id: number
    prenom: string
    nom: string
    email: string
    photo?: string
  }
}

export default function ProfilPrestatairePage() {
  const { id } = useParams()
  const [prestataire, setPrestataire] = useState<InfoPrestataire | null>(null)

  useEffect(() => {
    fetch(`http://localhost:3001/info-prestataire/utilisateur/${id}`)
      .then(res => res.json())
      .then(data => setPrestataire(data))
  }, [id])

  if (!prestataire) return <div className="p-6 text-center">Chargement...</div>

  const user = prestataire.utilisateur

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white shadow rounded-2xl p-8 space-y-4 text-center">
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-100">
          <Image
            src={user.photo || '/default-avatar.png'}
            alt="Avatar"
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          {user.prenom} {user.nom}
        </h1>
        <p className="text-sm text-gray-500 mb-1">{user.email}</p>
        <p className="text-sm text-green-600 font-medium">
          {prestataire.verifie ? '✅ Prestataire vérifié' : '⏳ En cours de validation'}
        </p>

        <div className="mt-4 space-y-2 text-left text-gray-700 max-w-xl mx-auto">
          <p><strong>Tarif :</strong> {prestataire.tarif_prestation} €</p>
          <p><strong>Statut :</strong> {prestataire.status}</p>
          <p><strong>Services :</strong> {prestataire.types_services}</p>
          {prestataire.competence && <p><strong>Compétences :</strong> {prestataire.competence}</p>}
          {prestataire.certification && <p><strong>Certification :</strong> {prestataire.certification}</p>}
          {prestataire.bio && <p><strong>Présentation :</strong> {prestataire.bio}</p>}
        </div>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Link
            href={`/dashboard/client/chat/${user.id}`}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            💬 Contacter
          </Link>
          <Link
            href={`/dashboard/client/prestations?prestataire=${user.id}`}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            Voir ses prestations
          </Link>
        </div>
      </div>
    </div>
  )
}
