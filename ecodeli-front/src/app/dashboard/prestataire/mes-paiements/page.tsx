// app/prestataire/paiements/page.tsx
'use client'

import { CreditCard, CalendarDays } from 'lucide-react'

export default function MesPaiements() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes paiements</h1>

      {/* Historique des paiements */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des virements</h2>

        <ul className="space-y-6">
          {/* Paiement 1 */}
          <li className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              {/* Icône carte de crédit */}
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Virement - 120€</p>
                <div className="flex items-center text-gray-600 text-sm gap-2 mt-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>Reçu le 1er mai 2025</span>
                </div>
              </div>
            </div>

            {/* Statut paiement */}
            <span className="text-green-600 font-semibold">✔️ Payé</span>
          </li>

          {/* Paiement 2 */}
          <li className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              {/* Icône carte de crédit */}
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Virement - 85€</p>
                <div className="flex items-center text-gray-600 text-sm gap-2 mt-1">
                  <CalendarDays className="w-4 h-4" />
                  <span>En attente de validation</span>
                </div>
              </div>
            </div>

            {/* Statut paiement */}
            <span className="text-yellow-500 font-semibold">⏳ En attente</span>
          </li>

          {/* Tu peux ajouter d'autres paiements ici si nécessaire */}
        </ul>
      </div>
    </div>
  )
}
