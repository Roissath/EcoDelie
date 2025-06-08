"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Package, MapPin, Clock, User, CheckCircle, Trash2, Eye, Filter, AlertCircle } from "lucide-react"

interface Utilisateur {
  nom: string
  prenom: string
  email?: string
}

interface InfoLivreur {
  utilisateur: Utilisateur
  type_transport: string
  statut: string
}

interface AnnonceClient {
  id: number
  type_annonce: string
  liste_courses?: string
  description?: string
  statut: string
  datePublication: string
  datePriseEnCharge?: string
  dateLivraison?: string
  lieu_depart: string
  lieu_arrivee: string
  poids_estime: number
  prix_livraison: number
  colis_fragile: boolean
  magasin?: string
  date_course?: string
  utilisateur: Utilisateur
  livreurs: InfoLivreur[]
}

interface AnnoncePrestation {
  id: number
  type_annonce: string
  titre: string
  description: string
  statut: string
  date_publication: string
  utilisateur: Utilisateur | null
}

export default function AnnoncesAdminPage() {
  const [annoncesClient, setAnnoncesClient] = useState<AnnonceClient[]>([])
  const [annoncesPrestation, setAnnoncesPrestation] = useState<AnnoncePrestation[]>([])
  const [activeTab, setActiveTab] = useState<"client" | "prestation">("client")
  const [filterStatus, setFilterStatus] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError("")

        console.log("🔍 Chargement des annonces...")

        // Récupérer les annonces clients (livraisons/courses)
        try {
          const clientResponse = await fetch("http://localhost:3001/annonces-client", {
            credentials: "include",
          })
          if (clientResponse.ok) {
            const clientData = await clientResponse.json()
            console.log("📦 Annonces clients récupérées:", clientData)
            setAnnoncesClient(Array.isArray(clientData) ? clientData : [])
          } else {
            console.error("❌ Erreur annonces clients:", clientResponse.status)
          }
        } catch (err) {
          console.error("❌ Erreur réseau annonces clients:", err)
        }

        // Récupérer les annonces de prestations
        try {
          const prestationResponse = await fetch("http://localhost:3001/annonces/type/prestation", {
            credentials: "include",
          })
          if (prestationResponse.ok) {
            const prestationData = await prestationResponse.json()
            console.log("🛠️ Prestations récupérées:", prestationData)
            setAnnoncesPrestation(Array.isArray(prestationData) ? prestationData : [])
          } else {
            console.error("❌ Erreur prestations:", prestationResponse.status)
          }
        } catch (err) {
          console.error("❌ Erreur réseau prestations:", err)
        }
      } catch (error) {
        console.error("❌ Erreur générale:", error)
        setError("Erreur lors du chargement des annonces")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const validerAnnonceClient = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/annonces-client/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut: "validee" }),
      })

      if (response.ok) {
        setAnnoncesClient((prev) => prev.map((a) => (a.id === id ? { ...a, statut: "validee" } : a)))
        console.log(`✅ Annonce client ${id} validée`)
      }
    } catch (error) {
      console.error("❌ Erreur validation annonce client:", error)
    }
  }

  const supprimerAnnonceClient = async (id: number) => {
    if (!confirm("Supprimer cette annonce client ?")) return

    try {
      const response = await fetch(`http://localhost:3001/annonces-client/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setAnnoncesClient(annoncesClient.filter((a) => a.id !== id))
        console.log(`🗑️ Annonce client ${id} supprimée`)
      }
    } catch (error) {
      console.error("❌ Erreur suppression annonce client:", error)
    }
  }

  const validerAnnoncePrestation = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/annonces/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut: "validee" }),
      })

      if (response.ok) {
        setAnnoncesPrestation((prev) => prev.map((a) => (a.id === id ? { ...a, statut: "validee" } : a)))
        console.log(`✅ Prestation ${id} validée`)
      }
    } catch (error) {
      console.error("❌ Erreur validation prestation:", error)
    }
  }

  const supprimerAnnoncePrestation = async (id: number) => {
    if (!confirm("Supprimer cette prestation ?")) return

    try {
      const response = await fetch(`http://localhost:3001/annonces/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setAnnoncesPrestation(annoncesPrestation.filter((a) => a.id !== id))
        console.log(`🗑️ Prestation ${id} supprimée`)
      }
    } catch (error) {
      console.error("❌ Erreur suppression prestation:", error)
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "validee":
        return "bg-green-100 text-green-800 border-green-200"
      case "refusee":
        return "bg-red-100 text-red-800 border-red-200"
      case "en_cours":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "livree":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const annoncesFiltrees =
    activeTab === "client"
      ? annoncesClient.filter((a) => !filterStatus || a.statut === filterStatus)
      : annoncesPrestation.filter((a) => !filterStatus || a.statut === filterStatus)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des annonces...</p>
          <p className="text-gray-500 text-sm mt-2">Récupération depuis la base de données...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white"
            >
              Réessayer
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Gestion des Annonces
          </h1>
          <p className="text-gray-600">Supervisez toutes les annonces de la plateforme</p>
        </div>

        {/* Status Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-green-800 font-medium">
              ✅ Données chargées depuis la base de données - {annoncesClient.length} annonces clients,{" "}
              {annoncesPrestation.length} prestations
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setActiveTab("client")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "client"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Annonces Clients ({annoncesClient.length})
            </button>
            <button
              onClick={() => setActiveTab("prestation")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "prestation"
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Prestations ({annoncesPrestation.length})
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            >
              <option value="">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="validee">Validée</option>
              <option value="en_cours">En cours</option>
              <option value="livree">Livrée</option>
              <option value="refusee">Refusée</option>
            </select>
            <span className="text-sm text-gray-500">
              {annoncesFiltrees.length} annonce{annoncesFiltrees.length > 1 ? "s" : ""} trouvée
              {annoncesFiltrees.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Annonces Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeTab === "client"
            ? // Affichage des annonces clients (VRAIES DONNÉES)
              annoncesClient
                .filter((a) => !filterStatus || a.statut === filterStatus)
                .map((a) => (
                  <div
                    key={a.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Annonce #{a.id}</h3>
                          <p className="text-sm text-gray-500 capitalize">{a.type_annonce}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(a.statut)}`}>
                        {a.statut}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Client:</span>
                        <span className="font-medium">
                          {a.utilisateur?.nom} {a.utilisateur?.prenom}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-600">
                            <span className="font-medium">De:</span> {a.lieu_depart}
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">À:</span> {a.lieu_arrivee}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Publié le:</span>
                        <span className="font-medium">{new Date(a.datePublication).toLocaleDateString("fr-FR")}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Poids:</span>
                          <span className="font-medium ml-1">{a.poids_estime} kg</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Prix:</span>
                          <span className="font-medium ml-1">{a.prix_livraison} €</span>
                        </div>
                      </div>

                      {a.colis_fragile && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                          <p className="text-sm text-orange-800 font-medium">⚠️ Colis fragile</p>
                        </div>
                      )}

                      {(a.description || a.liste_courses) && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 line-clamp-2">{a.description || a.liste_courses}</p>
                        </div>
                      )}

                      {a.livreurs?.length > 0 && (
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-blue-900 mb-1">Livreurs assignés:</p>
                          {a.livreurs.map((l, i) => (
                            <div key={i} className="text-sm text-blue-700">
                              {l.utilisateur.nom} {l.utilisateur.prenom} ({l.type_transport})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Link href={`/dashboard/admin/annonces/${a.id}`} className="flex-1">
                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                          <Eye className="w-4 h-4" />
                          Détail
                        </button>
                      </Link>

                      {a.statut !== "validee" && (
                        <button
                          onClick={() => validerAnnonceClient(a.id)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Valider
                        </button>
                      )}

                      <button
                        onClick={() => supprimerAnnonceClient(a.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
            : // Affichage des prestations (VRAIES DONNÉES)
              annoncesPrestation
                .filter((p) => !filterStatus || p.statut === filterStatus)
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{p.titre}</h3>
                          <p className="text-sm text-gray-500">Prestation #{p.id}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(p.statut)}`}>
                        {p.statut}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      {p.utilisateur && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">Prestataire:</span>
                          <span className="font-medium">
                            {p.utilisateur.nom} {p.utilisateur.prenom}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Publié le:</span>
                        <span className="font-medium">{new Date(p.date_publication).toLocaleDateString("fr-FR")}</span>
                      </div>

                      {p.description && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-700 line-clamp-3">{p.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Link href={`/dashboard/admin/prestations/${p.id}`} className="flex-1">
                        <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                          <Eye className="w-4 h-4" />
                          Détail
                        </button>
                      </Link>

                      {p.statut !== "validee" && (
                        <button
                          onClick={() => validerAnnoncePrestation(p.id)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Valider
                        </button>
                      )}

                      <button
                        onClick={() => supprimerAnnoncePrestation(p.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
        </div>

        {annoncesFiltrees.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune {activeTab === "client" ? "annonce" : "prestation"} trouvée
            </h3>
            <p className="text-gray-500">
              {annoncesFiltrees.length === 0 && filterStatus
                ? `Aucune ${activeTab === "client" ? "annonce" : "prestation"} avec le statut "${filterStatus}"`
                : `Aucune ${activeTab === "client" ? "annonce" : "prestation"} disponible`}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
