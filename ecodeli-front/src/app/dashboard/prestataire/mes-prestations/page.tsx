// app/prestataire/prestations/page.tsx
'use client'

import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function MesPrestations() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mes prestations</h1>

      <div className="flex justify-end mb-4">
        <Link href="/prestataire/prestations/ajouter" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">
          <PlusCircle className="w-5 h-5" />
          Ajouter une prestation
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Exemple de carte prestation */}
        <div className="bg-white rounded-2xl border shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Coiffure à domicile</h2>
          <p className="text-gray-600 text-sm mb-2">Durée : 1h • Prix : 25€</p>
          <p className="text-gray-500 text-sm mb-4">"Coupe, brushing et soin inclus."</p>
          <div className="flex justify-between text-sm">
            <Link href="#" className="text-blue-600 hover:underline">Modifier</Link>
            <button className="text-red-500 hover:underline">Supprimer</button>
          </div>
        </div>
        {/* Dupliquer cette carte pour les autres prestations */}
      </div>
    </div>
  )
}
