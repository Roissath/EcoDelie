"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Image from "next/image"
import Link from "next/link"
import { Search, UserPlus, Download, Eye, Trash2, CheckCircle, XCircle } from "lucide-react"

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  type: string
  statut?: string
  age: number
  datdenaissance: string
  langue_utilise?: string
  adresse?: string
  telephone?: string
  photo?: string
}

export default function UtilisateursAdminPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([])
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/utilisateurs", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUtilisateurs(Array.isArray(data) ? data : []))
  }, [])

  const supprimer = async (id: number) => {
    if (!confirm("Supprimer cet utilisateur ?")) return
    await fetch(`http://localhost:3001/utilisateurs/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    setUtilisateurs(utilisateurs.filter((u) => u.id !== id))
  }

  const validerProfil = async (id: number) => {
    await fetch(`http://localhost:3001/utilisateurs/${id}/valider-profil`, {
      method: "PATCH",
      credentials: "include",
    })
    setUtilisateurs((prev) => prev.map((u) => (u.id === id ? { ...u, statut: "valide" } : u)))
  }

  const rejeterProfil = async (id: number) => {
    await fetch(`http://localhost:3001/utilisateurs/${id}/rejeter-profil`, {
      method: "PATCH",
      credentials: "include",
    })
    setUtilisateurs((prev) => prev.map((u) => (u.id === id ? { ...u, statut: "rejete" } : u)))
  }

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const terme = search.toLowerCase()
    const matchSearch =
      u.nom.toLowerCase().includes(terme) ||
      u.prenom.toLowerCase().includes(terme) ||
      u.email.toLowerCase().includes(terme)
    const matchType = !filterType || u.type === filterType
    const matchStatus = !filterStatus || u.statut === filterStatus

    return matchSearch && matchType && matchStatus
  })

  const getStatusColor = (statut?: string) => {
    switch (statut) {
      case "valide":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejete":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "client":
        return "bg-blue-100 text-blue-800"
      case "livreur":
        return "bg-green-100 text-green-800"
      case "commercant":
        return "bg-purple-100 text-purple-800"
      case "prestataire":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-10 px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Gestion des Utilisateurs
          </h1>
          <p className="text-gray-600">Gérez tous les utilisateurs de votre plateforme</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="w-full pl-10 pr-4 py-3 border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              >
                <option value="">Tous les types</option>
                <option value="client">Client</option>
                <option value="livreur">Livreur</option>
                <option value="commercant">Commerçant</option>
                <option value="prestataire">Prestataire</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
              >
                <option value="">Tous les statuts</option>
                <option value="valide">Validé</option>
                <option value="rejete">Rejeté</option>
                <option value="en_attente">En attente</option>
              </select>

              <button className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilisateursFiltres.map((u) => (
            <div
              key={u.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {u.photo ? (
                    <Image
                      src={u.photo || "/placeholder.svg"}
                      alt="profil"
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {u.prenom[0]}
                        {u.nom[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {u.prenom} {u.nom}
                    </h3>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(u.statut)}`}>
                  {u.statut || "en attente"}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(u.type)}`}>{u.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Téléphone:</span>
                  <span className="text-gray-900">{u.telephone || "-"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Âge:</span>
                  <span className="text-gray-900">{u.age} ans</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/admin/utilisateurs/${u.id}`} className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    Voir
                  </button>
                </Link>

                {u.statut === "en_attente" && (
                  <>
                    <button
                      onClick={() => validerProfil(u.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                      title="Valider"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => rejeterProfil(u.id)}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                      title="Rejeter"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => supprimer(u.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {utilisateursFiltres.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
