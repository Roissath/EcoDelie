// app/prestataire/clients/page.tsx
'use client'

import { Users2, Phone, Mail } from 'lucide-react'

export default function MesClients() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes clients</h1>

      {/* Liste des clients */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Liste de mes clients</h2>

        <ul className="space-y-6">
          {/* Client 1 */}
          <li className="flex items-center gap-4 border-b pb-4">
            {/* Icône utilisateur */}
            <div className="bg-green-100 p-3 rounded-full">
              <Users2 className="text-green-600 w-6 h-6" />
            </div>

            {/* Détails du client */}
            <div>
              <p className="text-lg font-semibold text-gray-800">Mme Diarra A.</p>
              <div className="flex items-center text-gray-600 text-sm mt-1 gap-2">
                <Phone className="w-4 h-4" />
                <span>06 12 34 56 78</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1 gap-2">
                <Mail className="w-4 h-4" />
                <span>adiarra@example.com</span>
              </div>
            </div>
          </li>

          {/* Client 2 */}
          <li className="flex items-center gap-4 border-b pb-4">
            {/* Icône utilisateur */}
            <div className="bg-green-100 p-3 rounded-full">
              <Users2 className="text-green-600 w-6 h-6" />
            </div>

            {/* Détails du client */}
            <div>
              <p className="text-lg font-semibold text-gray-800">Mr Ahouanou K.</p>
              <div className="flex items-center text-gray-600 text-sm mt-1 gap-2">
                <Phone className="w-4 h-4" />
                <span>07 98 76 54 32</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm mt-1 gap-2">
                <Mail className="w-4 h-4" />
                <span>kahouanou@example.com</span>
              </div>
            </div>
          </li>
          {/* Ajoute autant de clients que nécessaire */}
        </ul>
      </div>
    </div>
  )
}
