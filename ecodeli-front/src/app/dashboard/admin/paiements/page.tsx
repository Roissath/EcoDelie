'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Paiement {
  id: number
  montant: number
  date_paiement: string
  moyen_paiement: string
  statut: string
  reference: string
  utilisateur: {
    nom: string
    prenom: string
    email: string
  }
}

export default function PaiementsAdminPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/paiements', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setPaiements(Array.isArray(data) ? data : [])
      })
  }, [])

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  const downloadFacture = (id: number) => {
    window.open(`http://localhost:3001/paiements/${id}/facture/public`, '_blank')
}

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">Paiements enregistrés</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Montant</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Mode</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50 text-gray-800">
                  <td className="px-4 py-2 font-medium">{p.utilisateur.nom} {p.utilisateur.prenom}</td>
                  <td className="px-4 py-2">{p.utilisateur.email}</td>
                  <td className="px-4 py-2 font-semibold text-green-700">{p.montant.toFixed(2)} €</td>
                  <td className="px-4 py-2">{formatDate(p.date_paiement)}</td>
                  <td className="px-4 py-2 capitalize">{p.moyen_paiement}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                      ${p.statut === 'validé' ? 'bg-green-100 text-green-700' :
                        p.statut === 'en attente' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-700'}`}>
                      {p.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                  <button
  onClick={() => downloadFacture(p.id)}
  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
>
  📎 Télécharger la facture
</button>

                  </td>
                </tr>
              ))}
              {paiements.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 py-4">
                    Aucun paiement trouvé
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
