"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ClipboardCheck, User, Calendar, Mail, FileText } from "lucide-react"

interface Utilisateur {
  nom: string
  prenom: string
  email: string
}

interface PrestationAnnonce {
  id: number
  titre: string
  description: string
  statut: string
  date_publication: string
  utilisateur: Utilisateur | null
}

export default function PrestationDetailPage() {
  const { id } = useParams()
  const [prestation, setPrestation] = useState<PrestationAnnonce | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/annonces/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPrestation(data))
  }, [id])

  if (!prestation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "validee":
        return "bg-green-100 text-green-800 border-green-200"
      case "refusee":
        return "bg-red-100 text-red-800 border-red-200"
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
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Détail de la prestation #{prestation.id}
          </h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(prestation.statut)}`}>
            {prestation.statut}
          </span>
        </div>

        <div className="space-y-6">
          {/* Informations de la prestation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">📝 Informations Générales</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Titre de la prestation</label>
                <p className="text-lg font-semibold text-gray-900">{prestation.titre}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <div className="bg-gray-50 rounded-lg p-4 mt-1">
                  <p className="text-gray-700">{prestation.description || "-"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Statut</label>
                  <p className="text-gray-900 font-medium capitalize">{prestation.statut}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Date de publication</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">
                      {new Date(prestation.date_publication).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations du prestataire */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">👤 Prestataire</h2>
            </div>

            {prestation.utilisateur ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nom complet</label>
                    <p className="text-gray-900 font-medium">
                      {prestation.utilisateur.nom} {prestation.utilisateur.prenom}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{prestation.utilisateur.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun utilisateur lié à cette prestation.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
