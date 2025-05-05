'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { Users, PackageSearch, ClipboardCheck, CreditCard, BarChart, Warehouse } from 'lucide-react'
import Footer from '@/components/Footer'


export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-10 text-center">Back-Office EcoDeli</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gestion des utilisateurs */}
          <Link href="/admin/utilisateurs" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Users className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Utilisateurs</h2>
                <p className="text-gray-600 text-sm">Gérer comptes clients, livreurs, commerçants, prestataires</p>
              </div>
            </div>
          </Link>

          {/* Gestion des annonces */}
          <Link href="/admin/annonces" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <PackageSearch className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Annonces</h2>
                <p className="text-gray-600 text-sm">Voir et modérer les annonces de livraison</p>
              </div>
            </div>
          </Link>

          {/* Gestion des prestations */}
          <Link href="/admin/prestations" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <ClipboardCheck className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Prestations</h2>
                <p className="text-gray-600 text-sm">Superviser les prestations et interventions</p>
              </div>
            </div>
          </Link>

          {/* Paiements */}
          <Link href="/admin/paiements" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CreditCard className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements</h2>
                <p className="text-gray-600 text-sm">Vérifier paiements, litiges, virements</p>
              </div>
            </div>
          </Link>

          {/* Statistiques */}
          <Link href="/admin/statistiques" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <BarChart className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Statistiques</h2>
                <p className="text-gray-600 text-sm">Suivre l'activité générale de la plateforme</p>
              </div>
            </div>
          </Link>

          {/* Gestion des box / entrepôts */}
          <Link href="/admin/stockages" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Warehouse className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Stockages</h2>
                <p className="text-gray-600 text-sm">Gérer les box et espaces d'entreposage</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
     <div>
        {/* FOOTER */}
              <Footer />
     </div>
    </div>
  )
}
