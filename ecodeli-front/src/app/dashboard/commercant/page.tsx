'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { Package, ListOrdered, PlusCircle, CalendarCheck, BarChart2, CreditCard } from 'lucide-react'
import Footer from '@/components/Footer'

export default function DashboardCommercant() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-10 text-center">Espace Commerçant</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Créer une annonce */}
          <Link href="/dashboard/commercant/creer-annonce" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <PlusCircle className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Créer une annonce</h2>
                <p className="text-gray-600 text-sm">Publier une demande de livraison de produit</p>
              </div>
            </div>
          </Link>

          {/* Gérer mes annonces */}
          <Link href="/dashboard/commercant/mes-annonces" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <ListOrdered className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes annonces</h2>
                <p className="text-gray-600 text-sm">Modifier, archiver, suivre vos annonces</p>
              </div>
            </div>
          </Link>

          {/* Gérer mes produits */}
          <Link href="/dashboard/commercant/produits" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Package className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes produits</h2>
                <p className="text-gray-600 text-sm">Consulter ou mettre à jour votre catalogue</p>
              </div>
            </div>
          </Link>

          {/* Mes commandes livrées */}
          <Link href="/dashboard/commercant/commandes" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CalendarCheck className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Commandes livrées</h2>
                <p className="text-gray-600 text-sm">Historique des commandes terminées</p>
              </div>
            </div>
          </Link>

          {/* Mes paiements */}
          <Link href="/dashboard/commercant/paiements" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CreditCard className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements</h2>
                <p className="text-gray-600 text-sm">Vérifiez vos paiements reçus ou en attente</p>
              </div>
            </div>
          </Link>

          {/* Statistiques */}
          <Link href="/dashboard/commercant/statistiques" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <BarChart2 className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Statistiques</h2>
                <p className="text-gray-600 text-sm">Visualisez vos performances et livraisons</p>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
