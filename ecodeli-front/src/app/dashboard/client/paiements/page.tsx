'use client'

import { useEffect, useState } from 'react'
import { CreditCard } from 'lucide-react'

interface Paiement {
  id: number
  montant: number
  date_paiement: string
  moyen_paiement: string
  statut: string
  facture?: {
    pdf_url?: string
  }
}

export default function PaiementsClient() {
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clientId = 1 // à remplacer dynamiquement après login

    fetch(`http://localhost:3001/paiements/client/${clientId}`)
      .then(res => res.json())
      .then(data => {
        setPaiements(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6 flex items-center gap-2">
        <CreditCard className="w-7 h-7 text-green-600" />
        Paiements & Factures
      </h1>

      {loading ? (
        <p className="text-gray-600">Chargement...</p>
      ) : paiements.length === 0 ? (
        <p className="text-gray-500">Aucun paiement effectué.</p>
      ) : (
        <ul className="space-y-6">
          {paiements.map((p) => (
            <li key={p.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Paiement #{p.id}</h2>
                <p className="text-sm text-gray-600">Date : {new Date(p.date_paiement).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Moyen : {p.moyen_paiement}</p>
                <p className="text-sm text-gray-600">Statut : <span className="font-semibold">{p.statut}</span></p>
              </div>
              <div className="text-right">
                <p className="text-green-700 font-bold text-xl">{p.montant.toFixed(2)} €</p>

                {p.facture?.pdf_url && (
                  <a
                    href={p.facture.pdf_url}
                    target="_blank"
                    className="text-sm text-blue-700 underline mt-2 inline-block"
                  >
                    Voir facture
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
