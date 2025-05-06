'use client'

import { useEffect, useState } from 'react'
import { FileDown, Eye } from 'lucide-react'
import Link from 'next/link'

interface Paiement {
  id: number
  montant: number
  date_paiement: string
  statut: string
  utilisateur: { id: number; nom: string }
  annonce?: { id: number; titre: string }
}

export default function PaiementsClient() {
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/paiements/me', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setPaiements(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const telechargerFacture = async (paiementId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/paiements/${paiementId}/facture`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Erreur lors de la génération de la facture')
      const data = await res.json()
      const url = `http://localhost:3001${data.file}`
      window.open(url, '_blank')
    } catch (err) {
      console.error(err)
      alert("Échec du téléchargement de la facture")
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes paiements</h1>

      {paiements.length === 0 ? (
        <p className="text-gray-600">Aucun paiement trouvé.</p>
      ) : (
        <div className="grid gap-6">
          {paiements.map(p => (
            <div key={p.id} className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="font-semibold text-lg text-gray-800">Montant : {p.montant.toFixed(2)} €</p>
                <p className="text-gray-500 text-sm">Statut : {p.statut}</p>
                <p className="text-gray-500 text-sm">Date : {new Date(p.date_paiement).toLocaleDateString()}</p>
                {p.annonce && (
                  <p className="text-gray-500 text-sm">Annonce : {p.annonce.titre}</p>
                )}
              </div>

              <div className="flex gap-4 mt-4 md:mt-0">
                {p.annonce?.id && (
                  <Link
                    href={`/dashboard/client/commandes/${p.annonce.id}`}
                    className="flex items-center gap-1 text-sm text-[#0070C0] hover:underline"
                  >
                    <Eye className="w-4 h-4" />
                    Voir commande
                  </Link>
                )}

                <button
                  onClick={() => telechargerFacture(p.id)}
                  className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-700"
                >
                  <FileDown className="w-4 h-4" />
                  Télécharger facture
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
