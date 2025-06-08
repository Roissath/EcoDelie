"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Package, MapPin, User, Calendar, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Utilisateur {
  nom: string
  prenom: string
  email?: string
  telephone?: string
}

interface InfoLivreur {
  utilisateur: Utilisateur
  type_transport: string
  statut: string
}

interface AnnonceClient {
  id: number
  type_annonce: string
  description?: string
  liste_courses?: string
  statut: string
  lieu_depart: string
  lieu_arrivee: string
  poids_estime: number
  prix_livraison: number
  colis_fragile: boolean
  datePublication: string
  datePriseEnCharge?: string
  dateLivraison?: string
  utilisateur: Utilisateur
  livreurs: InfoLivreur[]
}

export default function AnnonceAdminDetailPage() {
  const { id } = useParams()
  const [annonce, setAnnonce] = useState<AnnonceClient | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/annonces-client/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAnnonce(data))
  }, [id])

  if (!annonce)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    )

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "validee":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "en_cours":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "livree":
        return <CheckCircle className="w-5 h-5 text-purple-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "validee":
        return "bg-green-100 text-green-800 border-green-200"
      case "en_cours":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "livree":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Détail de l'annonce #{annonce.id}
          </h1>
          <div className="flex items-center justify-center gap-2">
            {getStatusIcon(annonce.statut)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(annonce.statut)}`}>
              {annonce.statut}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Informations Générales */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Informations Générales</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Type d'annonce</label>
                  <p className="text-gray-900 font-medium capitalize">{annonce.type_annonce}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Poids estimé</label>
                  <p className="text-gray-900 font-medium">{annonce.poids_estime} kg</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Prix de livraison</label>
                  <p className="text-gray-900 font-medium">{annonce.prix_livraison} €</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Colis fragile</label>
                  <p className="text-gray-900 font-medium">{annonce.colis_fragile ? "Oui" : "Non"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="text-gray-900">{annonce.description || annonce.liste_courses || "-"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trajet */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Trajet</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Point de départ</label>
                  <p className="text-gray-900 font-medium">{annonce.lieu_depart}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Point d'arrivée</label>
                  <p className="text-gray-900 font-medium">{annonce.lieu_arrivee}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <label className="text-sm font-medium text-gray-500">Date de publication</label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{new Date(annonce.datePublication).toLocaleString("fr-FR")}</p>
                </div>
              </div>
              {annonce.datePriseEnCharge && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Date de prise en charge</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{new Date(annonce.datePriseEnCharge).toLocaleString("fr-FR")}</p>
                  </div>
                </div>
              )}
              {annonce.dateLivraison && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Date de livraison</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{new Date(annonce.dateLivraison).toLocaleString("fr-FR")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Client */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Client</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Nom complet</label>
                <p className="text-gray-900 font-medium">
                  {annonce.utilisateur.nom} {annonce.utilisateur.prenom}
                </p>
              </div>
              {annonce.utilisateur.email && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{annonce.utilisateur.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Livreurs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Livreurs assignés</h2>
            </div>

            {annonce.livreurs.length > 0 ? (
              <div className="space-y-4">
                {annonce.livreurs.map((livreur, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {livreur.utilisateur.nom} {livreur.utilisateur.prenom}
                      </p>
                      <p className="text-sm text-gray-500">Transport: {livreur.type_transport}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {livreur.statut}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun livreur n'a pris en charge cette annonce pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
