'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

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

export default function UtilisateursAdminPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/utilisateurs', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUtilisateurs(Array.isArray(data) ? data : []))
  }, [])

  const supprimer = async (id: number) => {
    if (!confirm('Supprimer cet utilisateur ?')) return
    await fetch(`http://localhost:3001/utilisateurs/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    setUtilisateurs(utilisateurs.filter((u) => u.id !== id))
    toast.success('Utilisateur supprimé')
  }

  const validerProfil = async (id: number) => {
    await fetch(`http://localhost:3001/utilisateurs/${id}/valider-profil`, {
      method: 'PATCH',
      credentials: 'include',
    })
    setUtilisateurs((prev) =>
      prev.map((u) => (u.id === id ? { ...u, statut: 'valide' } : u))
    )
    toast.success('Profil validé')
  }

  const rejeterProfil = async (id: number) => {
    await fetch(`http://localhost:3001/utilisateurs/${id}/rejeter-profil`, {
      method: 'PATCH',
      credentials: 'include',
    })
    setUtilisateurs((prev) =>
      prev.map((u) => (u.id === id ? { ...u, statut: 'rejete' } : u))
    )
    toast.error('Profil rejeté')
  }

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const terme = search.toLowerCase()
    return (
      u.nom.toLowerCase().includes(terme) ||
      u.prenom.toLowerCase().includes(terme) ||
      u.email.toLowerCase().includes(terme) ||
      u.adresse?.toLowerCase().includes(terme) ||
      u.age.toString().includes(terme)
    )
  })

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-[#0070C0] mb-10">Gestion des Utilisateurs</h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
            <thead className="bg-[#0070C0] text-white">
              <tr className="text-sm text-center">
                <th className="px-4 py-4">Photo</th>
                <th className="px-4 py-4">Prénom</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Téléphone</th>
                <th className="px-4 py-4">Adresse</th>
                <th className="px-4 py-4">Rôle</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4">Âge</th>
                <th className="px-4 py-4">Date Naissance</th>
                <th className="px-4 py-4">Langue</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {utilisateursFiltres.map((u) => (
                <tr key={u.id} className="text-center border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {u.photo ? (
                      <Image src={u.photo} alt="profil" width={40} height={40} className="rounded-full mx-auto" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">{u.prenom} {u.nom}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.telephone}</td>
                  <td className="px-4 py-3">{u.adresse}</td>
                  <td className="px-4 py-3 capitalize">{u.type}</td>
                  <td className="px-4 py-3 capitalize">
                    <span className={`px-2 py-1 rounded-full text-white text-xs ${u.statut === 'valide' ? 'bg-green-500' : u.statut === 'rejete' ? 'bg-yellow-500' : 'bg-gray-400'}`}>{u.statut}</span>
                  </td>
                  <td className="px-4 py-3">{u.age}</td>
                  <td className="px-4 py-3">{new Date(u.datdenaissance).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3">{u.langue_utilise || '-'}</td>
                  <td className="px-4 py-3 space-y-2">
                    <Link href={`/dashboard/admin/utilisateurs/${u.id}`}>
                      <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-700 transition w-full">
                        En savoir plus
                      </button>
                    </Link>
                    <button
                      onClick={() => supprimer(u.id)}
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-600 transition w-full"
                    >
                      Supprimer
                    </button>
                    {u.statut === 'en_attente' && (
                      <>
                        <button
                          onClick={() => validerProfil(u.id)}
                          className="bg-green-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-green-600 transition w-full"
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => rejeterProfil(u.id)}
                          className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-yellow-600 transition w-full"
                        >
                          Rejeter
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {utilisateursFiltres.length === 0 && (
                <tr>
                  <td colSpan={11} className="text-center py-6 text-gray-400">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
