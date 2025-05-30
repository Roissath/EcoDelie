'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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

export default function PrestationsAdminPage() {
  const [prestations, setPrestations] = useState<PrestationAnnonce[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/annonces/type/prestation', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setPrestations(Array.isArray(data) ? data : []))
  }, [])

  const validerPrestation = async (id: number) => {
    await fetch(`http://localhost:3001/annonces/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ statut: 'validee' }),
    })
    setPrestations(prev => prev.map(p => (p.id === id ? { ...p, statut: 'validee' } : p)))
  }

  const supprimerPrestation = async (id: number) => {
    if (!confirm('Supprimer cette prestation ?')) return
    await fetch(`http://localhost:3001/annonces/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    setPrestations(prestations.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">Annonces de Prestations</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Prestataire</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Titre</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prestations.length > 0 ? (
                prestations
                  .filter(p => p.utilisateur) // évite l'erreur "nom of null"
                  .map(p => (
                    <tr
                      key={p.id}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/dashboard/admin/prestations/${p.id}`)}
                    >
                      <td className="px-4 py-2">{p.utilisateur!.nom} {p.utilisateur!.prenom}</td>
                      <td className="px-4 py-2">{p.utilisateur!.email}</td>
                      <td className="px-4 py-2 font-medium text-gray-800">{p.titre}</td>
                      <td className="px-4 py-2">{p.description}</td>
                      <td className="px-4 py-2 capitalize">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.statut === 'validee' ? 'bg-green-100 text-green-700' : p.statut === 'refusee' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {p.statut}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {new Date(p.date_publication).toLocaleDateString('fr-FR')}
                      </td>
                      <td
                        className="px-4 py-2 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-2 justify-center">
                          <Link
                            href={`/dashboard/admin/prestations/${p.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Détail
                          </Link>
                          {p.statut !== 'validee' && (
                            <button
                              onClick={() => validerPrestation(p.id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                            >
                              Valider
                            </button>
                          )}
                          <button
                            onClick={() => supprimerPrestation(p.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-4">
                    Aucune prestation trouvée
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
