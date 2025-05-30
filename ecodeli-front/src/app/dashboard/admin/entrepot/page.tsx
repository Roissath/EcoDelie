'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Colis {
  id: number
  descriptif: string
  dimension: string
  prix_livraison: number
  statut: string
  date_entree?: string
  date_sortie?: string
  livreur?: {
    nom: string
    prenom: string
  }
  annonce?: {
    id: number
    titre: string
  }
}

interface Entrepot {
  id: number
  adresse: string
  capacite_stock: number
  gestionnaire: string
  colis: Colis[]
}

export default function EntrepotDetailPage() {
  const { id } = useParams()
  const [entrepot, setEntrepot] = useState<Entrepot | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/entrepots/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setEntrepot(data))
  }, [id])

  if (!entrepot) return <div className="p-10 text-center">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-6">
          Entrepôt #{entrepot.id}
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <p><strong>Adresse :</strong> {entrepot.adresse}</p>
          <p><strong>Capacité :</strong> {entrepot.capacite_stock} colis</p>
          <p><strong>Gestionnaire :</strong> {entrepot.gestionnaire}</p>
        </div>

        <h2 className="text-2xl font-semibold text-[#0070C0] mb-4">Colis stockés</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Descriptif</th>
                <th className="px-4 py-2">Dimension</th>
                <th className="px-4 py-2">Prix Livraison</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Date entrée</th>
                <th className="px-4 py-2">Date sortie</th>
                <th className="px-4 py-2">Livreur</th>
                <th className="px-4 py-2">Annonce</th>
              </tr>
            </thead>
            <tbody>
              {entrepot.colis.map(colis => (
                <tr key={colis.id} className="border-t">
                  <td className="px-4 py-2">{colis.descriptif}</td>
                  <td className="px-4 py-2">{colis.dimension}</td>
                  <td className="px-4 py-2">{colis.prix_livraison} €</td>
                  <td className="px-4 py-2">{colis.statut}</td>
                  <td className="px-4 py-2">{colis.date_entree ? new Date(colis.date_entree).toLocaleString() : '-'}</td>
                  <td className="px-4 py-2">{colis.date_sortie ? new Date(colis.date_sortie).toLocaleString() : '-'}</td>
                  <td className="px-4 py-2">{colis.livreur ? `${colis.livreur.nom} ${colis.livreur.prenom}` : '-'}</td>
                  <td className="px-4 py-2">
                    {colis.annonce ? (
                      <a
                        href={`/dashboard/admin/annonces/${colis.annonce.id}`}
                        className="text-blue-600 underline"
                      >
                        Voir
                      </a>
                    ) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
