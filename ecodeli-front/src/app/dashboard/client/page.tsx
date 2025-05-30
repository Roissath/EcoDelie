"use client"

import Link from "next/link"
import { ShoppingCart, Briefcase, PackageCheck, Truck, CreditCard, User, Plus, Bell } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  annoncesActives: number
  commandesEnCours: number
  livraisonsEnAttente: number
  totalDepense: number
}

export default function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats>({
    annoncesActives: 0,
    commandesEnCours: 0,
    livraisonsEnAttente: 0,
    totalDepense: 0,
  })

  useEffect(() => {
    // Simuler le chargement des statistiques
    const fetchStats = async () => {
      try {
        // Tu peux remplacer par tes vrais appels API
        const mockStats = {
          annoncesActives: 3,
          commandesEnCours: 2,
          livraisonsEnAttente: 1,
          totalDepense: 245.5,
        }
        setStats(mockStats)
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Section hero améliorée */}
      <section className="bg-gradient-to-r from-[#0070C0] to-blue-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenue dans votre espace client</h1>
          <p className="text-xl opacity-90 mb-8">Gérez vos commandes, livraisons et découvrez nos services</p>
          <Link href="/dashboard/client/annonces/creer">
            <button className="bg-white text-[#0070C0] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2 mx-auto">
              <Plus className="w-5 h-5" />
              Créer une nouvelle annonce
            </button>
          </Link>
        </div>
      </section>

      {/* Statistiques rapides */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Votre activité en un coup d'œil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Annonces actives</p>
                  <p className="text-3xl font-bold text-[#0070C0]">{stats.annoncesActives}</p>
                </div>
                <Bell className="w-8 h-8 text-[#0070C0]" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Commandes en cours</p>
                  <p className="text-3xl font-bold text-green-600">{stats.commandesEnCours}</p>
                </div>
                <PackageCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Livraisons en attente</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.livraisonsEnAttente}</p>
                </div>
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total dépensé</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalDepense.toFixed(2)} €</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal - tes cartes existantes améliorées */}
      <main className="flex-1 max-w-6xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Que souhaitez-vous faire ?</h2>

        {/* Cartes de navigation - utilise ton design existant mais amélioré */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Explorer Produits */}
          <Link
            href="/dashboard/client/commercants"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition">
                <ShoppingCart className="text-green-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Produits</h2>
                <p className="text-gray-600 text-sm">Découvrez les produits disponibles chez nos commerçants</p>
              </div>
            </div>
          </Link>

          {/* Explorer Prestations */}
          <Link
            href="/dashboard/client/prestations"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition">
                <Briefcase className="text-blue-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Prestations</h2>
                <p className="text-gray-600 text-sm">Trouvez des services à la personne et prestations</p>
              </div>
            </div>
          </Link>

          {/* Mes Commandes */}
          <Link
            href="/dashboard/client/commandes"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition">
                <PackageCheck className="text-purple-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Commandes</h2>
                <p className="text-gray-600 text-sm">Suivez l'état de vos commandes passées et en cours</p>
              </div>
            </div>
          </Link>

          {/* Mes Livraisons */}
          <Link
            href="/dashboard/client/livraisons"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition">
                <Truck className="text-orange-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Livraisons</h2>
                <p className="text-gray-600 text-sm">Suivez vos livraisons de produits en temps réel</p>
              </div>
            </div>
          </Link>

          {/* Paiements */}
          <Link
            href="/dashboard/client/paiements"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition">
                <CreditCard className="text-red-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements & Factures</h2>
                <p className="text-gray-600 text-sm">Consultez vos paiements et téléchargez vos factures</p>
              </div>
            </div>
          </Link>

          {/* Mon Profil */}
          <Link
            href="/dashboard/client/profil"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl border hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition">
                <User className="text-gray-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mon Profil</h2>
                <p className="text-gray-600 text-sm">Modifiez vos informations personnelles et préférences</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Section d'actions rapides */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/client/annonces/creer">
              <button className="bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Créer une annonce
              </button>
            </Link>
            <Link href="/dashboard/client/panier">
              <button className="border border-[#0070C0] text-[#0070C0] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Voir mon panier
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
