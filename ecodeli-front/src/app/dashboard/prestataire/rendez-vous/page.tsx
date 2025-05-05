// app/prestataire/rendez-vous/page.tsx
'use client'

import { CheckCircle2, Clock3 } from 'lucide-react'

export default function MesRendezVous() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes rendez-vous</h1>

      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des rendez-vous</h2>
        <ul className="space-y-4">
          {/* Rendez-vous 1 */}
          <li className="border p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-medium">👩 Mme Diarra – Coiffure à domicile</p>
              <p className="text-sm text-gray-600">📅 Lundi 6 mai à 14h00</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              Confirmé
            </div>
          </li>

          {/* Rendez-vous 2 */}
          <li className="border p-4 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-medium">🧔 Mr Ahouanou – Repassage</p>
              <p className="text-sm text-gray-600">📅 Mardi 7 mai à 9h30</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center gap-2 text-yellow-600 font-medium">
              <Clock3 className="w-5 h-5" />
              En attente
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
