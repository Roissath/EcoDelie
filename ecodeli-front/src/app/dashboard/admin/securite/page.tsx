"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {
  Shield,
  Users,
  Key,
  Lock,
  UserCheck,
  UserX,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
} from "lucide-react"

interface UtilisateurSecurite {
  id: number
  nom: string
  prenom: string
  email: string
  type: string
  statut: string
  derniere_connexion?: string
  tentatives_connexion: number
  compte_verrouille: boolean
  role: string
}

// Données de démonstration
const demoUtilisateurs: UtilisateurSecurite[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    type: "client",
    statut: "valide",
    derniere_connexion: "2024-01-15T10:30:00Z",
    tentatives_connexion: 0,
    compte_verrouille: false,
    role: "utilisateur",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@email.com",
    type: "livreur",
    statut: "en_attente",
    derniere_connexion: "2024-01-14T14:20:00Z",
    tentatives_connexion: 2,
    compte_verrouille: false,
    role: "livreur",
  },
  {
    id: 3,
    nom: "Dubois",
    prenom: "Pierre",
    email: "pierre.dubois@email.com",
    type: "commercant",
    statut: "valide",
    derniere_connexion: "2024-01-13T09:15:00Z",
    tentatives_connexion: 0,
    compte_verrouille: false,
    role: "commercant",
  },
  {
    id: 4,
    nom: "Leroy",
    prenom: "Marie",
    email: "marie.leroy@email.com",
    type: "prestataire",
    statut: "rejete",
    derniere_connexion: "2024-01-12T16:45:00Z",
    tentatives_connexion: 5,
    compte_verrouille: true,
    role: "prestataire",
  },
  {
    id: 5,
    nom: "Admin",
    prenom: "Système",
    email: "admin@ecodeli.com",
    type: "admin",
    statut: "valide",
    derniere_connexion: "2024-01-15T11:00:00Z",
    tentatives_connexion: 0,
    compte_verrouille: false,
    role: "administrateur",
  },
]

export default function SecuritePage() {
  const [utilisateurs, setUtilisateurs] = useState<UtilisateurSecurite[]>(demoUtilisateurs)
  const [search, setSearch] = useState("")
  const [filterStatut, setFilterStatut] = useState("")
  const [filterType, setFilterType] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchUtilisateurs = async () => {
    setLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // En réalité, vous feriez : const response = await fetch('http://localhost:3001/utilisateurs')
      setUtilisateurs(demoUtilisateurs)
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUtilisateurs()
  }, [])

  const changerStatut = async (id: number, nouveauStatut: string) => {
    try {
      // Simuler un appel API
      setUtilisateurs((prev) => prev.map((u) => (u.id === id ? { ...u, statut: nouveauStatut } : u)))
      console.log(`Statut de l'utilisateur ${id} changé vers ${nouveauStatut}`)
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error)
    }
  }

  const verrouillerCompte = async (id: number, verrouiller: boolean) => {
    try {
      setUtilisateurs((prev) => prev.map((u) => (u.id === id ? { ...u, compte_verrouille: verrouiller } : u)))
      console.log(`Compte ${id} ${verrouiller ? "verrouillé" : "déverrouillé"}`)
    } catch (error) {
      console.error("Erreur lors du verrouillage:", error)
    }
  }

  const reinitialiserMotDePasse = async (id: number) => {
    try {
      setUtilisateurs((prev) => prev.map((u) => (u.id === id ? { ...u, tentatives_connexion: 0 } : u)))
      alert("Mot de passe réinitialisé et envoyé par email")
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error)
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "valide":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejete":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "valide":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejete":
        return <UserX className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const terme = search.toLowerCase()
    const matchSearch =
      u.nom.toLowerCase().includes(terme) ||
      u.prenom.toLowerCase().includes(terme) ||
      u.email.toLowerCase().includes(terme)
    const matchStatut = !filterStatut || u.statut === filterStatut
    const matchType = !filterType || u.type === filterType

    return matchSearch && matchStatut && matchType
  })

  const stats = {
    total: utilisateurs.length,
    valides: utilisateurs.filter((u) => u.statut === "valide").length,
    enAttente: utilisateurs.filter((u) => u.statut === "en_attente").length,
    rejetes: utilisateurs.filter((u) => u.statut === "rejete").length,
    verrouilles: utilisateurs.filter((u) => u.compte_verrouille).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Sécurité & Accès
          </h1>
          <p className="text-gray-600">Gérer les rôles, accès et statuts utilisateurs</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <StatCard title="Total" value={stats.total} icon={<Users />} color="from-blue-500 to-blue-600" />
          <StatCard title="Validés" value={stats.valides} icon={<UserCheck />} color="from-green-500 to-green-600" />
          <StatCard title="En attente" value={stats.enAttente} icon={<Clock />} color="from-yellow-500 to-yellow-600" />
          <StatCard title="Rejetés" value={stats.rejetes} icon={<UserX />} color="from-red-500 to-red-600" />
          <StatCard
            title="Verrouillés"
            value={stats.verrouilles}
            icon={<Lock />}
            color="from-purple-500 to-purple-600"
          />
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Tous les statuts</option>
                <option value="valide">Validé</option>
                <option value="en_attente">En attente</option>
                <option value="rejete">Rejeté</option>
              </select>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Tous les types</option>
              <option value="client">Client</option>
              <option value="livreur">Livreur</option>
              <option value="commercant">Commerçant</option>
              <option value="prestataire">Prestataire</option>
              <option value="admin">Administrateur</option>
            </select>

            <button
              onClick={fetchUtilisateurs}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Utilisateur</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Sécurité</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Dernière connexion</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {utilisateursFiltres.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {u.prenom} {u.nom}
                        </div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                        {u.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatutIcon(u.statut)}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatutColor(u.statut)}`}
                        >
                          {u.statut}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          {u.compte_verrouille ? (
                            <>
                              <Lock className="w-4 h-4 text-red-500" />
                              <span className="text-red-600 font-medium">Verrouillé</span>
                            </>
                          ) : (
                            <>
                              <Key className="w-4 h-4 text-green-500" />
                              <span className="text-green-600">Actif</span>
                            </>
                          )}
                        </div>
                        {u.tentatives_connexion > 0 && (
                          <div className="flex items-center gap-1 text-sm text-orange-600">
                            <AlertTriangle className="w-3 h-3" />
                            <span>{u.tentatives_connexion} tentatives</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {u.derniere_connexion
                        ? new Date(u.derniere_connexion).toLocaleString("fr-FR")
                        : "Jamais connecté"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {u.statut === "en_attente" && (
                          <>
                            <button
                              onClick={() => changerStatut(u.id, "valide")}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                            >
                              Valider
                            </button>
                            <button
                              onClick={() => changerStatut(u.id, "rejete")}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                            >
                              Rejeter
                            </button>
                          </>
                        )}

                        {u.compte_verrouille ? (
                          <button
                            onClick={() => verrouillerCompte(u.id, false)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                          >
                            Déverrouiller
                          </button>
                        ) : (
                          <button
                            onClick={() => verrouillerCompte(u.id, true)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                          >
                            Verrouiller
                          </button>
                        )}

                        <button
                          onClick={() => reinitialiserMotDePasse(u.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                        >
                          Reset MDP
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {utilisateursFiltres.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500">Aucun utilisateur ne correspond aux critères de recherche.</p>
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
