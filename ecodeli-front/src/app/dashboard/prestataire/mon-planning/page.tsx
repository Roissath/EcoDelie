// app/prestataire/planning/page.tsx
'use client'

import { CalendarPlus, Trash2 } from 'lucide-react'

export default function MonPlanning() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mon planning</h1>

      {/* Section : Ajout de créneau */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter un créneau</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border p-2 rounded-xl"
            placeholder="Date"
          />
          <input
            type="time"
            className="border p-2 rounded-xl"
            placeholder="Heure de début"
          />
          <button type="submit" className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition">
            <CalendarPlus className="w-5 h-5" />
            Ajouter
          </button>
        </form>
      </div>

      {/* Section : Liste des créneaux */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-semibold mb-4">Créneaux disponibles</h2>
        <ul className="space-y-4">
          <li className="flex items-center justify-between border p-3 rounded-xl">
            <span>🗓️ Mercredi 1er Mai – 14h00</span>
            <button className="text-red-600 hover:underline flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </li>
          <li className="flex items-center justify-between border p-3 rounded-xl">
            <span>🗓️ Vendredi 3 Mai – 10h30</span>
            <button className="text-red-600 hover:underline flex items-center gap-1">
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
