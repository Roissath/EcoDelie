'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Colis {
  id: number
  descriptif: string
  dimension: string
  prix_livraison: number
  statut: string
  photo?: string
  livreur?: {
    nom: string
    prenom: string
  }
  annonce?: {
    titre: string
  }
}

interface Entrepot {
  id: number
  adresse: string
  gestionnaire: string
  capacite_stock: number
}

interface Stokage {
  id: number
  date_entree: string
  date_sortie?: string
  entrepot: Entrepot
  colis: Colis
}

export default function StokagesAdminPage() {
  const [stokages, setStokages] = useState<Stokage[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/stokage', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStokages(Array.isArray(data) ? data : []))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">Gestion du Stockage</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Colis</th>
                <th className="px-4 py-2">Entrepôt</th>
                <th className="px-4 py-2">Date d'entrée</th>
                <th className="px-4 py-2">Date de sortie</th>
                <th className="px-4 py-2">Livreur</th>
                <th className="px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {stokages.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {s.colis.descriptif} ({s.colis.dimension})<br />
                    {s.colis.annonce?.titre && <span className="text-xs text-gray-500">Annonce: {s.colis.annonce.titre}</span>}
                  </td>
                  <td className="px-4 py-2">
                    {s.entrepot.adresse}<br />
                    <span className="text-xs text-gray-500">Géré par: {s.entrepot.gestionnaire}</span>
                  </td>
                  <td className="px-4 py-2">{new Date(s.date_entree).toLocaleString()}</td>
                  <td className="px-4 py-2">{s.date_sortie ? new Date(s.date_sortie).toLocaleString() : '-'}</td>
                  <td className="px-4 py-2">
                    {s.colis.livreur ? `${s.colis.livreur.nom} ${s.colis.livreur.prenom}` : <span className="text-xs text-gray-400">Non spécifié</span>}
                  </td>
                  <td className="px-4 py-2 capitalize">{s.colis.statut}</td>
                </tr>
              ))}
              {stokages.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-400">Aucun colis stocké</td>
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
