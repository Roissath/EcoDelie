'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  type: string
  statut?: string
  age: number
  datdenaissance: string
  langue_utilise?: string
  adresse?: string
  telephone?: string
  photo?: string
}

export default function UtilisateurDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3001/utilisateurs/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUtilisateur(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center mt-10">Chargement...</div>
  if (!utilisateur) return <div className="text-center mt-10 text-red-500">Utilisateur introuvable</div>

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-8">Détail de l'utilisateur</h1>

        <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          <div className="flex flex-col items-center gap-4">
            {utilisateur.photo ? (
              <Image src={utilisateur.photo} alt="Photo de profil" width={100} height={100} className="rounded-full" />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full" />
            )}
            <h2 className="text-xl font-semibold">{utilisateur.prenom} {utilisateur.nom}</h2>
            <span className={`px-3 py-1 rounded-full text-white text-sm ${
              utilisateur.statut === 'valide'
                ? 'bg-green-500'
                : utilisateur.statut === 'rejete'
                ? 'bg-yellow-500'
                : 'bg-gray-400'
            }`}>
              {utilisateur.statut || 'en attente'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Email :</strong> {utilisateur.email}</p>
            <p><strong>Téléphone :</strong> {utilisateur.telephone}</p>
            <p><strong>Adresse :</strong> {utilisateur.adresse}</p>
            <p><strong>Rôle :</strong> {utilisateur.type}</p>
            <p><strong>Âge :</strong> {utilisateur.age}</p>
            <p><strong>Date de naissance :</strong> {new Date(utilisateur.datdenaissance).toLocaleDateString('fr-FR')}</p>
            <p><strong>Langue :</strong> {utilisateur.langue_utilise || '-'}</p>
          </div>

          <div className="text-center pt-6">
            <Link href={`/dashboard/admin/documents/${utilisateur.id}`}>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                Voir ses documents
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
