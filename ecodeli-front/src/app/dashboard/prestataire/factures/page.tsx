// app/prestataire/factures/page.tsx
'use client'

import { FileText, Download } from 'lucide-react'

export default function MesFactures() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes factures</h1>

      {/* Liste des factures */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Factures disponibles</h2>

        <ul className="space-y-6">
          {/* Facture 1 */}
          <li className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              {/* Icône document */}
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Facture #2025-001</p>
                <p className="text-sm text-gray-600">Émise le 1er mai 2025</p>
              </div>
            </div>

            {/* Bouton de téléchargement */}
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </li>

          {/* Facture 2 */}
          <li className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              {/* Icône document */}
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Facture #2025-002</p>
                <p className="text-sm text-gray-600">Émise le 10 mai 2025</p>
              </div>
            </div>

            {/* Bouton de téléchargement */}
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </li>

          {/* Tu peux ajouter d'autres factures ici si nécessaire */}
        </ul>
      </div>
    </div>
  )
}
