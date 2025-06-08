"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CreditCard, Download, Calendar, DollarSign, Filter } from "lucide-react"

interface Paiement {
  id: number
  montant: number
  date_paiement: string
  moyen_paiement: string
  statut: string
  reference: string
  utilisateur: {
    nom: string
    prenom: string
    email: string
  }
}

export default function PaiementsAdminPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [filterStatus, setFilterStatus] = useState("")
  const [filterPayment, setFilterPayment] = useState("")

  useEffect(() => {
    fetch("http://localhost:3001/paiements", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setPaiements(Array.isArray(data) ? data : [])
      })
  }, [])

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const downloadFacture = (id: number) => {
    window.open(`http://localhost:3001/paiements/${id}/facture/public`, "_blank")
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "validé":
        return "bg-green-100 text-green-800 border-green-200"
      case "en attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-red-100 text-red-800 border-red-200"
    }
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "carte":
        return "bg-blue-100 text-blue-800"
      case "paypal":
        return "bg-purple-100 text-purple-800"
      case "virement":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const paiementsFiltres = paiements.filter((p) => {
    const matchStatus = !filterStatus || p.statut === filterStatus
    const matchPayment = !filterPayment || p.moyen_paiement === filterPayment
    return matchStatus && matchPayment
  })

  const totalMontant = paiementsFiltres.reduce((sum, p) => sum + p.montant, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Paiements enregistrés
          </h1>
          <p className="text-gray-600">Gérez tous les paiements de la plateforme</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">€{totalMontant.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{paiementsFiltres.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Validés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {paiements.filter((p) => p.statut === "validé").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">⏳</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {paiements.filter((p) => p.statut === "en attente").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            >
              <option value="">Tous les statuts</option>
              <option value="validé">Validé</option>
              <option value="en attente">En attente</option>
              <option value="échoué">Échoué</option>
            </select>

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            >
              <option value="">Tous les moyens</option>
              <option value="carte">Carte bancaire</option>
              <option value="paypal">PayPal</option>
              <option value="virement">Virement</option>
            </select>

            <span className="text-sm text-gray-500">
              {paiementsFiltres.length} paiement{paiementsFiltres.length > 1 ? "s" : ""} trouvé
              {paiementsFiltres.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Payments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {paiementsFiltres.map((p) => (
            <div
              key={p.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {p.utilisateur.nom} {p.utilisateur.prenom}
                    </h3>
                    <p className="text-sm text-gray-500">{p.utilisateur.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(p.statut)}`}>
                  {p.statut}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Montant:</span>
                  <span className="text-lg font-bold text-green-700">€{p.montant.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mode de paiement:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(p.moyen_paiement)}`}
                  >
                    {p.moyen_paiement}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(p.date_paiement)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Référence:</span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{p.reference}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => downloadFacture(p.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Télécharger la facture
                </button>
              </div>
            </div>
          ))}
        </div>

        {paiementsFiltres.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun paiement trouvé</h3>
            <p className="text-gray-500">Aucun paiement ne correspond à vos critères</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
