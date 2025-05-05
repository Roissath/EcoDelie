'use client'

import Link from 'next/link'
import { CalendarCheck2, ClipboardList, Clock3, CreditCard, FileText, UserCheck } from 'lucide-react'


export default function DashboardPrestataire() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      <main className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-10 text-center">Espace Prestataire</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mes prestations */}
          <Link href="/dashboard/prestataire/mes-prestations" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <ClipboardList className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes prestations</h2>
                <p className="text-gray-600 text-sm">Consulter, accepter ou refuser les demandes</p>
              </div>
            </div>
          </Link>

          {/* Mon planning */}
          <Link href="/dashboard/prestataire/mon-planning" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Clock3 className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mon planning</h2>
                <p className="text-gray-600 text-sm">Gérer mes créneaux de disponibilité</p>
              </div>
            </div>
          </Link>

          {/* Rendez-vous confirmés */}
          <Link href="/dashboard/prestataire/rendez-vous" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CalendarCheck2 className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes rendez-vous</h2>
                <p className="text-gray-600 text-sm">Interventions validées et à venir</p>
              </div>
            </div>
          </Link>

          {/* Mes clients */}
          <Link href="/dashboard/prestataire/mes-clients" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <UserCheck className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes clients</h2>
                <p className="text-gray-600 text-sm">Voir mes clients récurrents ou occasionnels</p>
              </div>
            </div>
          </Link>

          {/* Mes paiements */}
          <Link href="/dashboard/prestataire/mes-paiements" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CreditCard className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements</h2>
                <p className="text-gray-600 text-sm">Historique et virements reçus</p>
              </div>
            </div>
          </Link>

          {/* Factures */}
          <Link href="/dashboard/prestataire/factures" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <FileText className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes factures</h2>
                <p className="text-gray-600 text-sm">Télécharger ou envoyer mes factures</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
      
    </div>
  )
}
