// app/client/page.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, Briefcase, PackageCheck, Truck, CreditCard, User } from 'lucide-react'

export default function DashboardClient() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
     

      {/* Contenu principal */}
      <main className="flex-1 max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-10 text-center">Espace Client</h1>

        {/* Cartes de navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Explorer Produits */}
          <Link href="/dashboard/client/commercants" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <ShoppingCart className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Produits</h2>
                <p className="text-gray-600 text-sm">Voir les produits disponibles</p>
              </div>
            </div>
          </Link>

          {/* Explorer Prestations */}
          <Link href="/dashboard/client/prestations" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Briefcase className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Prestations</h2>
                <p className="text-gray-600 text-sm">Voir les services disponibles</p>
              </div>
            </div>
          </Link>

          {/* Mes Commandes */}
          <Link href="/dashboard/client/commandes" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <PackageCheck className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Commandes</h2>
                <p className="text-gray-600 text-sm">Suivre mes commandes passées</p>
              </div>
            </div>
          </Link>

          {/* Mes Livraisons */}
          <Link href="/dashboard/client/livraisons" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <Truck className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Livraisons</h2>
                <p className="text-gray-600 text-sm">Suivre mes livraisons de produits</p>
              </div>
            </div>
          </Link>

          {/* Paiements */}
          <Link href="/dashboard/client/paiements" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <CreditCard className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements & Factures</h2>
                <p className="text-gray-600 text-sm">Voir mes paiements et factures</p>
              </div>
            </div>
          </Link>

          {/* Mon Profil */}
          <Link href="/dashboard/client/profil" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
              <User className="text-green-600 w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mon Profil</h2>
                <p className="text-gray-600 text-sm">Modifier mes informations personnelles</p>
              </div>
            </div>
          </Link>

        </div>
      </main>

      
    </div>
  )
}
