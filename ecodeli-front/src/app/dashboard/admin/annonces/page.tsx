'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Utilisateur {
  nom: string
  prenom: string
}

interface InfoLivreur {
  utilisateur: Utilisateur
  type_transport: string
}

interface AnnonceClient {
  id: number
  type_annonce: string
  liste_courses?: string
  description?: string
  statut: string
  datePublication: string
  datePriseEnCharge?: string
  dateLivraison?: string
  lieu_depart: string
  lieu_arrivee: string
  utilisateur: Utilisateur
  livreurs: InfoLivreur[]
}

export default function AnnoncesAdminPage() {
  const [annonces, setAnnonces] = useState<AnnonceClient[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/annonces-client', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setAnnonces(Array.isArray(data) ? data : []))
  }, [])

  const validerAnnonce = async (id: number) => {
    await fetch(`http://localhost:3001/annonces-client/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ statut: 'validee' }),
    })
    setAnnonces((prev) =>
      prev.map((a) => (a.id === id ? { ...a, statut: 'validee' } : a))
    )
  }

  const supprimerAnnonce = async (id: number) => {
    if (!confirm('Supprimer cette annonce ?')) return
    await fetch(`http://localhost:3001/annonces-client/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    setAnnonces(annonces.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-center text-[#0070C0] mb-8">
          Gestion des Annonces
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Publication</th>
                <th className="px-4 py-2">Prise en charge</th>
                <th className="px-4 py-2">Livraison</th>
                <th className="px-4 py-2">Livreurs</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {annonces.map((a) => (
                <tr
                  key={a.id}
                  className="border-t text-sm hover:bg-gray-50 text-gray-800"
                  onClick={() => router.push(`/dashboard/admin/annonces/${a.id}`)}
                >
                  <td className="px-4 py-2">{a.utilisateur?.nom} {a.utilisateur?.prenom}</td>
                  <td className="px-4 py-2 capitalize">{a.type_annonce}</td>
                  <td className="px-4 py-2">{a.description || a.liste_courses || '-'}</td>
                  <td className="px-4 py-2">{a.statut}</td>
                  <td className="px-4 py-2">
                    {new Date(a.datePublication).toLocaleString()}
                    <br />
                    <span className="text-xs text-gray-800">
                      Départ : {a.lieu_depart} → Arrivée : {a.lieu_arrivee}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {a.datePriseEnCharge
                      ? new Date(a.datePriseEnCharge).toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-4 py-2">
                    {a.dateLivraison
                      ? `Livré : ${new Date(a.dateLivraison).toLocaleString()}`
                      : '-'}
                  </td>
                  <td className="px-4 py-2">
                    {a.livreurs?.length > 0 ? (
                      <ul className="list-disc ml-4 text-xs text-gray-800">
                        {a.livreurs.map((l, i) => (
                          <li key={i}>
                            {l.utilisateur.nom} {l.utilisateur.prenom} ({l.type_transport})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-xs text-gray-400">Aucun livreur</span>
                    )}
                  </td>
                  <td
                    className="px-4 py-2 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <td className="px-4 py-2 text-center flex gap-2 justify-center">
  <Link
    href={`/dashboard/admin/annonces/${a.id}`}
    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
  >
    Détail
  </Link>
  {a.statut !== 'validee' && (
    <button
      onClick={() => validerAnnonce(a.id)}
      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    >
      Valider
    </button>
  )}
  <button
    onClick={() => supprimerAnnonce(a.id)}
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  >
    Supprimer
  </button>
</td>
                  </td>
                </tr>
              ))}
              {annonces.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-400">
                    Aucune annonce trouvée
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
