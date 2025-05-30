"use client"

import Link from "next/link"
import { ShoppingCart, Briefcase, PackageCheck, Truck, CreditCard, User, Plus, Bell } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  annoncesActives: number
  commandesEnCours: number
  livraisonsEnAttente: number
  totalDepense: number
  recentActivities: Activity[]
}

interface Activity {
  id: number
  type: "commande" | "livraison" | "annonce" | "paiement"
  title: string
  description: string
  date: string
  status: "success" | "pending" | "info" | "error"
}

export default function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats>({
    annoncesActives: 0,
    commandesEnCours: 0,
    livraisonsEnAttente: 0,
    totalDepense: 0,
    recentActivities: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Appel API pour récupérer les statistiques du dashboard
        const response = await fetch("http://localhost:3001/dashboard/client/stats", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard:", error)
        setError("Impossible de charger les données du dashboard")

        // En mode développement, on peut garder des données de fallback
        if (process.env.NODE_ENV === "development") {
          setStats({
            annoncesActives: 0,
            commandesEnCours: 0,
            livraisonsEnAttente: 0,
            totalDepense: 0,
            recentActivities: [],
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
        <main className="flex-1 max-w-6xl mx-auto py-16 px-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Section d'en-tête avec statistiques */}
      <section className="bg-gradient-to-r from-[#0070C0] to-blue-600 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Espace Client EcoDeli</h1>
            <p className="text-xl opacity-90">Gérez vos commandes, livraisons et découvrez nos services</p>
          </div>

          {/* Statistiques en temps réel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Annonces actives</p>
                  <p className="text-3xl font-bold">{stats.annoncesActives}</p>
                </div>
                <Bell className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Commandes en cours</p>
                  <p className="text-3xl font-bold">{stats.commandesEnCours}</p>
                </div>
                <PackageCheck className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Livraisons en attente</p>
                  <p className="text-3xl font-bold">{stats.livraisonsEnAttente}</p>
                </div>
                <Truck className="w-8 h-8 text-white/80" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total dépensé</p>
                  <p className="text-3xl font-bold">{stats.totalDepense.toFixed(2)} €</p>
                </div>
                <CreditCard className="w-8 h-8 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal - tes cartes de navigation */}
      <main className="flex-1 max-w-6xl mx-auto py-16 px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Que souhaitez-vous faire ?</h2>
          <Link href="/dashboard/client/annonces/creer">
            <button className="bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Créer une annonce
            </button>
          </Link>
        </div>

        {/* Cartes de navigation - ton design original */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Explorer Produits */}
          <Link
            href="/dashboard/client/commercants"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition">
                <ShoppingCart className="text-green-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Produits</h2>
                <p className="text-gray-600 text-sm">Voir les produits disponibles</p>
              </div>
            </div>
          </Link>

          {/* Explorer Prestations */}
          <Link
            href="/dashboard/client/prestations"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition">
                <Briefcase className="text-blue-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Explorer Prestations</h2>
                <p className="text-gray-600 text-sm">Voir les services disponibles</p>
              </div>
            </div>
          </Link>

          {/* Mes Commandes */}
          <Link
            href="/dashboard/client/commandes"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition">
                <PackageCheck className="text-purple-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Commandes</h2>
                <p className="text-gray-600 text-sm">Suivre mes commandes passées</p>
              </div>
            </div>
          </Link>

          {/* Mes Livraisons */}
          <Link
            href="/dashboard/client/livraisons"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition">
                <Truck className="text-orange-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mes Livraisons</h2>
                <p className="text-gray-600 text-sm">Suivre mes livraisons de produits</p>
              </div>
            </div>
          </Link>

          {/* Paiements */}
          <Link
            href="/dashboard/client/paiements"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition">
                <CreditCard className="text-red-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Paiements & Factures</h2>
                <p className="text-gray-600 text-sm">Voir mes paiements et factures</p>
              </div>
            </div>
          </Link>

          {/* Mon Profil */}
          <Link
            href="/dashboard/client/profil"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full group-hover:bg-gray-200 transition">
                <User className="text-gray-600 w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Mon Profil</h2>
                <p className="text-gray-600 text-sm">Modifier mes informations personnelles</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Section activité récente */}
        {stats.recentActivities.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Activité récente</h3>
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="space-y-4">
                {stats.recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.status === "success"
                            ? "bg-green-500"
                            : activity.status === "pending"
                              ? "bg-yellow-500"
                              : activity.status === "error"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message d'erreur si problème de connexion */}
        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Problème de connexion</h4>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
