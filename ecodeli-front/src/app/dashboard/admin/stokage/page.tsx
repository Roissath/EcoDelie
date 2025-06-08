"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import {
  Package,
  Warehouse,
  Calendar,
  MapPin,
  User,
  Truck,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Wifi,
  WifiOff,
  Eye,
  Trash2,
} from "lucide-react"

interface Colis {
  id: number
  descriptif: string
  dimension: string
  prix_livraison: number
  statut: string
  photo?: string
  livreur?: {
    nom: string
    prenom: string
  }
  annonce?: {
    titre: string
  }
}

interface Entrepot {
  id: number
  adresse: string
  gestionnaire: string
  capacite_stock: number
}

interface Stokage {
  id: number
  date_entree: string
  date_sortie?: string
  entrepot: Entrepot
  colis: Colis
}

// Données de démonstration
const demoStokages: Stokage[] = [
  {
    id: 1,
    date_entree: "2024-01-15T10:30:00Z",
    date_sortie: undefined,
    entrepot: {
      id: 1,
      adresse: "123 Rue de la Logistique, Paris",
      gestionnaire: "Jean Dupont",
      capacite_stock: 1000,
    },
    colis: {
      id: 1,
      descriptif: "Colis électronique fragile",
      dimension: "30x20x15 cm",
      prix_livraison: 15.5,
      statut: "en_stock",
      livreur: { nom: "Martin", prenom: "Pierre" },
      annonce: { titre: "Livraison express Paris" },
    },
  },
  {
    id: 2,
    date_entree: "2024-01-14T14:20:00Z",
    date_sortie: "2024-01-15T09:00:00Z",
    entrepot: {
      id: 2,
      adresse: "456 Avenue du Commerce, Lyon",
      gestionnaire: "Sophie Leroy",
      capacite_stock: 800,
    },
    colis: {
      id: 2,
      descriptif: "Produits alimentaires",
      dimension: "40x30x25 cm",
      prix_livraison: 12.0,
      statut: "livre",
      livreur: { nom: "Dubois", prenom: "Marie" },
      annonce: { titre: "Courses alimentaires" },
    },
  },
  {
    id: 3,
    date_entree: "2024-01-13T09:15:00Z",
    date_sortie: undefined,
    entrepot: {
      id: 1,
      adresse: "123 Rue de la Logistique, Paris",
      gestionnaire: "Jean Dupont",
      capacite_stock: 1000,
    },
    colis: {
      id: 3,
      descriptif: "Vêtements",
      dimension: "50x40x20 cm",
      prix_livraison: 8.5,
      statut: "en_stock",
      livreur: { nom: "Garnier", prenom: "Thomas" },
      annonce: { titre: "Livraison mode" },
    },
  },
  {
    id: 4,
    date_entree: "2024-01-12T16:45:00Z",
    date_sortie: undefined,
    entrepot: {
      id: 3,
      adresse: "789 Boulevard Industriel, Marseille",
      gestionnaire: "Paul Moreau",
      capacite_stock: 1200,
    },
    colis: {
      id: 4,
      descriptif: "Livres et documents",
      dimension: "25x20x10 cm",
      prix_livraison: 6.0,
      statut: "en_stock",
      livreur: { nom: "Bernard", prenom: "Claire" },
      annonce: { titre: "Livraison documents" },
    },
  },
  {
    id: 5,
    date_entree: "2024-01-11T11:30:00Z",
    date_sortie: "2024-01-12T15:20:00Z",
    entrepot: {
      id: 2,
      adresse: "456 Avenue du Commerce, Lyon",
      gestionnaire: "Sophie Leroy",
      capacite_stock: 800,
    },
    colis: {
      id: 5,
      descriptif: "Équipement sportif",
      dimension: "60x40x30 cm",
      prix_livraison: 20.0,
      statut: "livre",
      livreur: { nom: "Rousseau", prenom: "Antoine" },
      annonce: { titre: "Livraison sport" },
    },
  },
]

export default function StokageAdminPage() {
  const [stokages, setStokages] = useState<Stokage[]>(demoStokages)
  const [stokagesRaw, setStokagesRaw] = useState<Stokage[]>(demoStokages)
  const [search, setSearch] = useState("")
  const [filterStatut, setFilterStatut] = useState("")
  const [filterEntrepot, setFilterEntrepot] = useState("")
  const [showSortis, setShowSortis] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [apiAvailable, setApiAvailable] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStokages = async () => {
    try {
      setLoading(true)
      setError("")

      console.log("🔍 Récupération des stockages...")

      // Tester la connexion au backend
      const response = await fetch("http://localhost:3001/stokage", {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("📦 Stockages récupérés:", data)

        // Valider et nettoyer les données
        const validStokages = Array.isArray(data)
          ? data.map((s: any) => ({
              id: s.id,
              date_entree: s.date_entree,
              date_sortie: s.date_sortie || undefined,
              entrepot: s.entrepot || { id: 0, adresse: "Entrepôt inconnu", gestionnaire: "N/A", capacite_stock: 0 },
              colis: s.colis || {
                id: 0,
                descriptif: "Colis inconnu",
                dimension: "N/A",
                prix_livraison: 0,
                statut: "inconnu",
              },
            }))
          : []

        setStokagesRaw(validStokages)
        setStokages(validStokages)
        setApiAvailable(true)
        console.log(`✅ ${validStokages.length} stockages chargés depuis l'API`)
      } else {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      setLastUpdate(new Date())
    } catch (err) {
      console.error("❌ Erreur lors du chargement des stockages:", err)
      setError(err instanceof Error ? err.message : "Erreur inconnue")
      setApiAvailable(false)
      // Utiliser les données de démo en cas d'erreur
      setStokagesRaw(demoStokages)
      setStokages(demoStokages)
    } finally {
      setLoading(false)
    }
  }

  const supprimerStokage = async (id: number) => {
    if (!confirm("Supprimer ce stockage ?")) return

    try {
      const response = await fetch(`http://localhost:3001/stokage/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setStokages(stokages.filter((s) => s.id !== id))
        setStokagesRaw(stokagesRaw.filter((s) => s.id !== id))
        console.log(`🗑️ Stockage ${id} supprimé`)
      } else {
        console.error(`❌ Erreur suppression stockage ${id}:`, response.status)
      }
    } catch (error) {
      console.error("❌ Erreur suppression stockage:", error)
    }
  }

  const marquerSortie = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/stokage/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ date_sortie: new Date().toISOString() }),
      })

      if (response.ok) {
        const now = new Date().toISOString()
        setStokages((prev) =>
          prev.map((s) => (s.id === id ? { ...s, date_sortie: now, colis: { ...s.colis, statut: "livre" } } : s)),
        )
        setStokagesRaw((prev) =>
          prev.map((s) => (s.id === id ? { ...s, date_sortie: now, colis: { ...s.colis, statut: "livre" } } : s)),
        )
        console.log(`✅ Sortie marquée pour le stockage ${id}`)
      } else {
        console.error(`❌ Erreur marquage sortie ${id}:`, response.status)
      }
    } catch (error) {
      console.error("❌ Erreur marquage sortie:", error)
    }
  }

  useEffect(() => {
    fetchStokages()
  }, [])

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "en_stock":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "livre":
        return "bg-green-100 text-green-800 border-green-200"
      case "en_transit":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Filtrage des stockages
  const stokagesFiltres = stokages.filter((s) => {
    const terme = search.toLowerCase()
    const matchSearch =
      s.colis.descriptif.toLowerCase().includes(terme) ||
      s.entrepot.adresse.toLowerCase().includes(terme) ||
      s.entrepot.gestionnaire.toLowerCase().includes(terme) ||
      (s.colis.livreur && `${s.colis.livreur.nom} ${s.colis.livreur.prenom}`.toLowerCase().includes(terme))

    const matchStatut = !filterStatut || s.colis.statut === filterStatut
    const matchEntrepot = !filterEntrepot || s.entrepot.id.toString() === filterEntrepot
    const matchSortie = showSortis || !s.date_sortie

    return matchSearch && matchStatut && matchEntrepot && matchSortie
  })

  // Statistiques
  const stats = {
    total: stokagesRaw.length,
    enStock: stokagesRaw.filter((s) => !s.date_sortie).length,
    sortis: stokagesRaw.filter((s) => s.date_sortie).length,
    entrepots: new Set(stokagesRaw.map((s) => s.entrepot.id)).size,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des stockages...</p>
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
            <Warehouse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Gestion du Stockage
          </h1>
          <p className="text-gray-600">Superviser les box et espaces d'entreposage</p>
        </div>

        {/* Status Banner */}
        <div
          className={`rounded-xl p-4 mb-6 border ${
            apiAvailable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {apiAvailable ? (
                <>
                  <Wifi className="w-5 h-5 text-green-600" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-800 font-medium">
                    ✅ Données chargées depuis la base de données - {stokagesRaw.length} stockages trouvés
                  </p>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-600" />
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-red-800 font-medium">
                      ❌ Backend non accessible - Affichage des données de démonstration
                    </p>
                    {error && <p className="text-red-700 text-sm mt-1">Erreur: {error}</p>}
                    <p className="text-red-700 text-sm mt-1">
                      💡 Vérifiez que votre backend NestJS est démarré sur http://localhost:3001
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Dernière mise à jour: {lastUpdate.toLocaleTimeString("fr-FR")}
              </span>
              <button
                onClick={fetchStokages}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total stockages" value={stats.total} icon={<Package />} color="from-blue-500 to-blue-600" />
          <StatCard title="En stock" value={stats.enStock} icon={<Warehouse />} color="from-green-500 to-green-600" />
          <StatCard title="Sortis" value={stats.sortis} icon={<Truck />} color="from-purple-500 to-purple-600" />
          <StatCard title="Entrepôts" value={stats.entrepots} icon={<MapPin />} color="from-orange-500 to-orange-600" />
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un stockage..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tous les statuts</option>
                <option value="en_stock">En stock</option>
                <option value="livre">Livré</option>
                <option value="en_transit">En transit</option>
              </select>
            </div>

            <select
              value={filterEntrepot}
              onChange={(e) => setFilterEntrepot(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les entrepôts</option>
              {Array.from(new Set(stokagesRaw.map((s) => s.entrepot.id))).map((entrepotId) => {
                const entrepot = stokagesRaw.find((s) => s.entrepot.id === entrepotId)?.entrepot
                return (
                  <option key={entrepotId} value={entrepotId.toString()}>
                    {entrepot?.adresse}
                  </option>
                )
              })}
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSortis}
                onChange={(e) => setShowSortis(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Afficher les colis sortis</span>
            </label>

            <span className="text-sm text-gray-500 ml-auto">
              {stokagesFiltres.length} stockage{stokagesFiltres.length > 1 ? "s" : ""} trouvé
              {stokagesFiltres.length > 1 ? "s" : ""} sur {stokagesRaw.length}
            </span>
          </div>
        </div>

        {/* Stockages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stokagesFiltres.map((s) => (
            <div
              key={s.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Stockage #{s.id}</h3>
                    <p className="text-sm text-gray-500">{s.colis.descriptif}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatutColor(s.colis.statut)}`}>
                  {s.colis.statut}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Warehouse className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Entrepôt:</span>
                  <span className="font-medium">{s.entrepot.adresse}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Gestionnaire:</span>
                  <span className="font-medium">{s.entrepot.gestionnaire}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Entrée:</span>
                  <span className="font-medium">{new Date(s.date_entree).toLocaleString("fr-FR")}</span>
                </div>

                {s.date_sortie && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Sortie:</span>
                    <span className="font-medium">{new Date(s.date_sortie).toLocaleString("fr-FR")}</span>
                  </div>
                )}

                {s.colis.livreur && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Livreur:</span>
                    <span className="font-medium">
                      {s.colis.livreur.nom} {s.colis.livreur.prenom}
                    </span>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Dimension:</span>
                      <span className="font-medium ml-1">{s.colis.dimension}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Prix:</span>
                      <span className="font-medium ml-1">{s.colis.prix_livraison} €</span>
                    </div>
                  </div>
                  {s.colis.annonce && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">Annonce:</span>
                      <span className="font-medium ml-1">{s.colis.annonce.titre}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Link href={`/dashboard/admin/entrepot/${s.entrepot.id}`} className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    Voir entrepôt
                  </button>
                </Link>

                {!s.date_sortie && (
                  <button
                    onClick={() => marquerSortie(s.id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Truck className="w-4 h-4" />
                    Marquer sortie
                  </button>
                )}

                <button
                  onClick={() => supprimerStokage(s.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {stokagesFiltres.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Warehouse className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun stockage trouvé</h3>
            <p className="text-gray-500">
              {search || filterStatut || filterEntrepot
                ? "Aucun stockage ne correspond aux critères de recherche"
                : "Aucun stockage disponible"}
            </p>
            {stokagesRaw.length > 0 && stokagesFiltres.length === 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  💡 <strong>{stokagesRaw.length} stockages</strong> sont disponibles mais filtrés.
                </p>
                <p className="text-blue-700 text-sm mt-1">Vérifiez vos filtres ou modifiez vos critères de recherche</p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
