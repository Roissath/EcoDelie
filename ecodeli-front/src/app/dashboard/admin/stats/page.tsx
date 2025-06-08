"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts"
import {
  BarChart3,
  Download,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  RefreshCw,
  Wifi,
  WifiOff,
  FileText,
  Award,
  Truck,
  Store,
  Activity,
  AlertCircle,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]

interface DashboardStats {
  utilisateursParType: Array<{ type: string; total: number; pourcentage: number }>
  totalUtilisateurs: number
  totalCommandes: number
  totalLivraisons: number
  totalCA: number
  croissanceCA: number
  topClients: any[]
  topPrestations: any[]
  evolutionMensuelle: Array<{ mois: string; commandes: number; ca: number }>
  repartitionGeographique: Array<{ ville: string; pourcentage: number; utilisateurs: number }>
  indicateursPerformance: {
    tauxSatisfaction: number
    tempsLivraisonMoyen: number
    tauxReussite: number
    tauxRetour: number
  }
}

interface TopClient {
  id: number
  nom: string
  prenom: string
  email: string
  nombreCommandes: number
  montantTotal: number
  dernierCommande: string
  scoresFidelite: number
  type: string
  anciennete?: string
  tauxSatisfaction?: number
}

interface TopPrestation {
  id: number
  type: string
  nombreDemandes: number
  tarifMoyen: number
  satisfactionMoyenne: number
  croissance: string
  description: string
  dureeeMoyenne?: string
  zonePrincipale?: string
}

interface TopLivreur {
  id: number
  nom: string
  prenom: string
  nombreLivraisons: number
  noteMoyenne: number
  tauxReussite: number
  chiffreAffaires: number
  zonePrincipale: string
}

interface TopCommercant {
  id: number
  nom: string
  proprietaire: string
  nombreCommandes: number
  chiffreAffaires: number
  noteMoyenne: number
  typeCommerce: string
  ville: string
}

export default function StatistiquesPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [topClients, setTopClients] = useState<TopClient[]>([])
  const [topPrestations, setTopPrestations] = useState<TopPrestation[]>([])
  const [topLivreurs, setTopLivreurs] = useState<TopLivreur[]>([])
  const [topCommercants, setTopCommercants] = useState<TopCommercant[]>([])
  const [filtreType, setFiltreType] = useState("")
  const [dateDebut, setDateDebut] = useState("")
  const [dateFin, setDateFin] = useState("")
  const [loading, setLoading] = useState(false)
  const [apiAvailable, setApiAvailable] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<"dashboard" | "tops" | "exports" | "analytics">("dashboard")
  const [error, setError] = useState<string | null>(null)

  const API_BASE_URL = "http://localhost:3001"

  const buildQueryParams = () => {
    const params = new URLSearchParams()
    if (filtreType) params.append("type", filtreType)
    if (dateDebut) params.append("dateDebut", dateDebut)
    if (dateFin) params.append("dateFin", dateFin)
    return params.toString()
  }

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Test de connectivité
      const healthResponse = await fetch(`${API_BASE_URL}/stats/test`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (!healthResponse.ok) {
        throw new Error("API non accessible")
      }

      // Récupération des stats principales
      const queryParams = buildQueryParams()
      const dashboardResponse = await fetch(`${API_BASE_URL}/stats/dashboard?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (dashboardResponse.ok) {
        const response = await dashboardResponse.json()

        if (response.success && response.data) {
          setDashboardStats(response.data)
          setApiAvailable(true)
        } else {
          throw new Error(response.error || "Erreur dans la réponse")
        }
      } else {
        throw new Error(`Erreur HTTP: ${dashboardResponse.status}`)
      }

      setLastUpdate(new Date())
    } catch (err) {
      console.error("Erreur API Dashboard:", err)
      setError(err instanceof Error ? err.message : "Erreur inconnue")
      setApiAvailable(false)
    } finally {
      setLoading(false)
    }
  }

  const fetchTopClients = async () => {
    try {
      const queryParams = buildQueryParams()
      const response = await fetch(`${API_BASE_URL}/stats/top/clients-fideles?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setTopClients(data.data)
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des top clients:", err)
    }
  }

  const fetchTopPrestations = async () => {
    try {
      const queryParams = buildQueryParams()
      const response = await fetch(`${API_BASE_URL}/stats/top/prestations-demandees?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setTopPrestations(data.data)
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des top prestations:", err)
    }
  }

  const fetchTopLivreurs = async () => {
    try {
      const queryParams = buildQueryParams()
      const response = await fetch(`${API_BASE_URL}/stats/top/livreurs?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setTopLivreurs(data.data)
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des top livreurs:", err)
    }
  }

  const fetchTopCommercants = async () => {
    try {
      const queryParams = buildQueryParams()
      const response = await fetch(`${API_BASE_URL}/stats/top/commercants?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setTopCommercants(data.data)
        }
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des top commerçants:", err)
    }
  }

  const exportData = async (format: "csv" | "excel" | "pdf" | "datamining") => {
    try {
      setLoading(true)

      let endpoint = ""
      switch (format) {
        case "csv":
          endpoint = "/stats/export/csv"
          break
        case "excel":
          endpoint = "/stats/export/excel"
          break
        case "pdf":
          endpoint = "/stats/export/pdf"
          break
        case "datamining":
          endpoint = "/stats/export/datamining"
          break
      }

      const queryParams = buildQueryParams()
      const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()

        if (data.success) {
          if (format === "datamining") {
            console.log("📊 Données pour application Java:", data.data)
            console.log("📋 Métadonnées:", data.data.metadata)
            alert(`Export ${format.toUpperCase()} généré ! Consultez la console pour les données.`)
          } else {
            console.log(`📄 Export ${format.toUpperCase()}:`, data.data)
            alert(`Export ${format.toUpperCase()} généré avec succès !`)
          }
        } else {
          throw new Error(data.error || `Erreur lors de l'export ${format}`)
        }
      } else {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
    } catch (err) {
      console.error(`Erreur export ${format}:`, err)
      alert(`Erreur lors de l'export ${format}: ${err instanceof Error ? err.message : "Erreur inconnue"}`)
    } finally {
      setLoading(false)
    }
  }

  const refreshAllData = async () => {
    await fetchDashboardStats()
    if (activeTab === "tops") {
      await Promise.all([fetchTopClients(), fetchTopPrestations(), fetchTopLivreurs(), fetchTopCommercants()])
    }
  }

  useEffect(() => {
    fetchDashboardStats()
  }, [filtreType, dateDebut, dateFin])

  useEffect(() => {
    if (activeTab === "tops") {
      Promise.all([fetchTopClients(), fetchTopPrestations(), fetchTopLivreurs(), fetchTopCommercants()])
    }
  }, [activeTab, filtreType, dateDebut, dateFin])

  if (loading && !dashboardStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Chargement des statistiques...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      <Header />
      <div className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Status Banner */}
          <div
            className={`rounded-xl p-4 mb-6 border ${
              apiAvailable ? "bg-green-600/20 border-green-600" : "bg-red-600/20 border-red-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {apiAvailable ? (
                  <>
                    <Wifi className="w-5 h-5 text-green-400" />
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-300 font-medium">✅ API connectée - Données en temps réel</p>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-red-400" />
                    <div>
                      <p className="text-red-300 font-medium">❌ Backend non accessible</p>
                      {error && <p className="text-red-200 text-sm mt-1">Erreur: {error}</p>}
                      <p className="text-red-200 text-sm mt-1">
                        💡 Vérifiez que votre backend NestJS est démarré sur http://localhost:3001
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  Dernière mise à jour: {lastUpdate.toLocaleTimeString("fr-FR")}
                </span>
                <button
                  onClick={refreshAllData}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-1 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  Actualiser
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
            <div className="flex items-center gap-4 mb-6 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Statistiques EcoDeli
                </h1>
                <p className="text-blue-200 mt-1">Tableau de bord analytique complet - Mission 2 Data Mining</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab("tops")}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === "tops" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
            >
              🏆 Top 5 (Mission 2)
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
            >
              📈 Analytics
            </button>
            <button
              onClick={() => setActiveTab("exports")}
              className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === "exports" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-200 hover:bg-white/20"
              }`}
            >
              📤 Exports & Data Mining
            </button>
          </div>

          {/* Filtres */}
          {(activeTab === "dashboard" || activeTab === "analytics") && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-white font-medium">Type :</label>
                  <select
                    value={filtreType}
                    onChange={(e) => setFiltreType(e.target.value)}
                    className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Tous</option>
                    <option value="client">Client</option>
                    <option value="livreur">Livreur</option>
                    <option value="prestataire">Prestataire</option>
                    <option value="commercant">Commerçant</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-white font-medium">Du :</label>
                  <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-white font-medium">Au :</label>
                  <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && dashboardStats && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <KPICard
                  title="Utilisateurs"
                  value={dashboardStats.totalUtilisateurs}
                  icon={<Users className="w-8 h-8" />}
                  color="from-blue-500 to-blue-600"
                  change="+12%"
                />
                <KPICard
                  title="Commandes"
                  value={dashboardStats.totalCommandes}
                  icon={<Package className="w-8 h-8" />}
                  color="from-green-500 to-green-600"
                  change="+8%"
                />
                <KPICard
                  title="Chiffre d'Affaires"
                  value={`€${dashboardStats.totalCA.toLocaleString()}`}
                  icon={<DollarSign className="w-8 h-8" />}
                  color="from-purple-500 to-purple-600"
                  change={`+${dashboardStats.croissanceCA}%`}
                />
                <KPICard
                  title="Livraisons"
                  value={dashboardStats.totalLivraisons}
                  icon={<TrendingUp className="w-8 h-8" />}
                  color="from-orange-500 to-orange-600"
                  change="+15%"
                />
              </div>

              {/* Indicateurs de Performance */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <StatCard title="Satisfaction" value={`${dashboardStats.indicateursPerformance.tauxSatisfaction}/5`} />
                <StatCard
                  title="Temps Livraison"
                  value={`${dashboardStats.indicateursPerformance.tempsLivraisonMoyen}h`}
                />
                <StatCard title="Taux Réussite" value={`${dashboardStats.indicateursPerformance.tauxReussite}%`} />
                <StatCard title="Taux Retour" value={`${dashboardStats.indicateursPerformance.tauxRetour}%`} />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <ChartCard title="Répartition des utilisateurs">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardStats.utilisateursParType}
                        dataKey="total"
                        nameKey="type"
                        outerRadius={100}
                        label
                      >
                        {dashboardStats.utilisateursParType.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Répartition géographique">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardStats.repartitionGeographique}>
                      <XAxis dataKey="ville" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="utilisateurs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>

              <ChartCard title="Évolution mensuelle" className="mb-8">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardStats.evolutionMensuelle}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mois" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(30, 41, 59, 0.9)",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="commandes"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ca"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </>
          )}

          {/* Dashboard vide si pas de données */}
          {activeTab === "dashboard" && !dashboardStats && !loading && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold text-white mb-2">Aucune donnée disponible</h3>
              <p className="text-gray-400 mb-4">Impossible de récupérer les statistiques du dashboard</p>
              <button
                onClick={fetchDashboardStats}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Top 5 Tab - Mission 2 */}
          {activeTab === "tops" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">🏆 Mission 2 - Top 5 Requis</h2>
                <p className="text-yellow-200">Analyse des clients fidèles et prestations les plus demandées</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 5 Clients Fidèles */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">Top 5 Clients Fidèles</h3>
                  </div>

                  {topClients.length > 0 ? (
                    <div className="space-y-4">
                      {topClients.slice(0, 5).map((client, index) => (
                        <div key={client.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-500 text-black"
                                  : index === 1
                                    ? "bg-gray-400 text-black"
                                    : index === 2
                                      ? "bg-orange-600 text-white"
                                      : "bg-blue-600 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {client.prenom} {client.nom}
                              </p>
                              <p className="text-sm text-gray-300">{client.nombreCommandes} commandes</p>
                              <p className="text-xs text-blue-300">{client.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-400">€{client.montantTotal}</p>
                            <p className="text-xs text-gray-400">{client.dernierCommande}</p>
                            <p className="text-xs text-yellow-400">{client.scoresFidelite}% fidélité</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune donnée de clients disponible</p>
                      <p className="text-sm mt-1">Vérifiez la connexion API</p>
                    </div>
                  )}
                </div>

                {/* Top 5 Prestations Demandées */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Store className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Top 5 Prestations Demandées</h3>
                  </div>

                  {topPrestations.length > 0 ? (
                    <div className="space-y-4">
                      {topPrestations.slice(0, 5).map((prestation, index) => (
                        <div key={prestation.id} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  index === 0
                                    ? "bg-yellow-500 text-black"
                                    : index === 1
                                      ? "bg-gray-400 text-black"
                                      : index === 2
                                        ? "bg-orange-600 text-white"
                                        : "bg-blue-600 text-white"
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-white">{prestation.type}</p>
                                <p className="text-sm text-gray-300">{prestation.description}</p>
                                {prestation.zonePrincipale && (
                                  <p className="text-xs text-purple-300">{prestation.zonePrincipale}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-3 text-sm">
                            <span className="text-blue-400">{prestation.nombreDemandes} demandes</span>
                            <span className="text-green-400">€{prestation.tarifMoyen}</span>
                            <span className="text-yellow-400">⭐ {prestation.satisfactionMoyenne}/5</span>
                          </div>
                          <div className="mt-2 text-xs text-green-300">{prestation.croissance}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune donnée de prestations disponible</p>
                      <p className="text-sm mt-1">Vérifiez la connexion API</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Top Livreurs et Commerçants */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top 5 Livreurs */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-bold text-white">Top 5 Livreurs</h3>
                  </div>

                  {topLivreurs.length > 0 ? (
                    <div className="space-y-4">
                      {topLivreurs.slice(0, 5).map((livreur, index) => (
                        <div key={livreur.id} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-500 text-black"
                                  : index === 1
                                    ? "bg-gray-400 text-black"
                                    : index === 2
                                      ? "bg-orange-600 text-white"
                                      : "bg-blue-600 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {livreur.prenom} {livreur.nom}
                              </p>
                              <p className="text-sm text-gray-300">{livreur.zonePrincipale}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-blue-400">{livreur.nombreLivraisons} livraisons</span>
                            <span className="text-yellow-400">⭐ {livreur.noteMoyenne}/5</span>
                            <span className="text-green-400">€{livreur.chiffreAffaires}</span>
                          </div>
                          <div className="mt-1 text-xs text-purple-300">{livreur.tauxReussite}% réussite</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Truck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune donnée de livreurs disponible</p>
                      <p className="text-sm mt-1">Vérifiez la connexion API</p>
                    </div>
                  )}
                </div>

                {/* Top 5 Commerçants */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Store className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Top 5 Commerçants</h3>
                  </div>

                  {topCommercants.length > 0 ? (
                    <div className="space-y-4">
                      {topCommercants.slice(0, 5).map((commercant, index) => (
                        <div key={commercant.id} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-yellow-500 text-black"
                                  : index === 1
                                    ? "bg-gray-400 text-black"
                                    : index === 2
                                      ? "bg-orange-600 text-white"
                                      : "bg-blue-600 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-white">{commercant.nom}</p>
                              <p className="text-sm text-gray-300">{commercant.proprietaire}</p>
                              <p className="text-xs text-purple-300">
                                {commercant.typeCommerce} - {commercant.ville}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-blue-400">{commercant.nombreCommandes} commandes</span>
                            <span className="text-green-400">€{commercant.chiffreAffaires}</span>
                            <span className="text-yellow-400">⭐ {commercant.noteMoyenne}/5</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Store className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune donnée de commerçants disponible</p>
                      <p className="text-sm mt-1">Vérifiez la connexion API</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && dashboardStats && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                <h2 className="text-2xl font-bold text-blue-300 mb-2">📈 Analytics Avancées</h2>
                <p className="text-blue-200">Analyses détaillées et indicateurs de performance</p>
              </div>

              {/* KPIs Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                  title="Taux de Croissance"
                  value={`${dashboardStats.croissanceCA}%`}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="from-green-500 to-green-600"
                  trend="up"
                />
                <AnalyticsCard
                  title="Satisfaction Moyenne"
                  value={`${dashboardStats.indicateursPerformance.tauxSatisfaction}/5`}
                  icon={<Award className="w-6 h-6" />}
                  color="from-yellow-500 to-yellow-600"
                  trend="up"
                />
                <AnalyticsCard
                  title="Chiffre d'Affaires"
                  value={`€${dashboardStats.totalCA.toLocaleString()}`}
                  icon={<DollarSign className="w-6 h-6" />}
                  color="from-purple-500 to-purple-600"
                  trend="up"
                />
                <AnalyticsCard
                  title="Taux Réussite"
                  value={`${dashboardStats.indicateursPerformance.tauxReussite}%`}
                  icon={<Activity className="w-6 h-6" />}
                  color="from-blue-500 to-blue-600"
                  trend="up"
                />
              </div>

              {/* Charts Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartCard title="Performance par type d'utilisateur">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardStats.utilisateursParType}>
                      <XAxis dataKey="type" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(30, 41, 59, 0.9)",
                          border: "none",
                          borderRadius: "12px",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="pourcentage" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Répartition géographique détaillée">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardStats.repartitionGeographique}
                        dataKey="pourcentage"
                        nameKey="ville"
                        outerRadius={100}
                        label
                      >
                        {dashboardStats.repartitionGeographique.map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
            </div>
          )}

          {/* Exports Tab */}
          {activeTab === "exports" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-purple-300 mb-2">📤 Exports & Data Mining</h2>
                <p className="text-purple-200">Exportez vos données pour analyse externe et application Java</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ExportCard
                  title="Export CSV"
                  description="Données tabulaires pour Excel"
                  icon={<FileText className="w-8 h-8" />}
                  color="from-green-500 to-green-600"
                  onClick={() => exportData("csv")}
                />
                <ExportCard
                  title="Export Excel"
                  description="Fichier Excel avec graphiques"
                  icon={<BarChart3 className="w-8 h-8" />}
                  color="from-blue-500 to-blue-600"
                  onClick={() => exportData("excel")}
                />
                <ExportCard
                  title="Export PDF"
                  description="Rapport complet PDF"
                  icon={<Download className="w-8 h-8" />}
                  color="from-red-500 to-red-600"
                  onClick={() => exportData("pdf")}
                />
                <ExportCard
                  title="Data Mining"
                  description="Données pour application Java"
                  icon={<Truck className="w-8 h-8" />}
                  color="from-purple-500 to-purple-600"
                  onClick={() => exportData("datamining")}
                />
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4">📊 Informations sur les exports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Formats disponibles :</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• CSV : Données brutes pour analyse</li>
                      <li>• Excel : Tableaux avec mise en forme</li>
                      <li>• PDF : Rapport visuel complet</li>
                      <li>• Data Mining : JSON pour application Java</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-300 mb-2">Données incluses :</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Statistiques utilisateurs</li>
                      <li>• Top 5 clients fidèles</li>
                      <li>• Top 5 prestations demandées</li>
                      <li>• Données de performance</li>
                      <li>• Métadonnées d'export</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

function KPICard({
  title,
  value,
  icon,
  color,
  change,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  change: string
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
        <span className="text-green-400 text-sm font-medium">{change}</span>
      </div>
      <h3 className="text-sm font-medium text-blue-200 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
      <h3 className="text-sm font-medium text-blue-200 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

function ChartCard({
  title,
  children,
  className = "",
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ${className}`}>
      <h2 className="text-lg font-bold mb-4 text-white">{title}</h2>
      <div className="bg-white rounded-xl p-4">{children}</div>
    </div>
  )
}

function ExportCard({
  title,
  description,
  icon,
  color,
  onClick,
}: {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
    >
      <div
        className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-blue-200">{description}</p>
    </div>
  )
}

function AnalyticsCard({
  title,
  value,
  icon,
  color,
  trend,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  trend: "up" | "down"
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className={`text-sm font-medium ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
          {trend === "up" ? "↗️" : "↘️"}
        </div>
      </div>
      <h3 className="text-sm font-medium text-blue-200 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}
