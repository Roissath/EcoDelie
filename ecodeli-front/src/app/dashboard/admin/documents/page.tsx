"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { FileText, User, Calendar, ExternalLink, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  type: string
  statut: string
}

interface Document {
  id: number
  type_document: string
  url: string
  statut: string
  commentaire?: string
  date_upload: string
  utilisateur: Utilisateur
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetch("http://localhost:3001/document", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDocuments(Array.isArray(data) ? data : []))
  }, [])

  const grouped = documents.reduce<Record<number, Document[]>>((acc, doc) => {
    if (!acc[doc.utilisateur.id]) acc[doc.utilisateur.id] = []
    acc[doc.utilisateur.id].push(doc)
    return acc
  }, {})

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "valide":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejete":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "valide":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejete":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getUserStatusColor = (statut: string) => {
    switch (statut) {
      case "valide":
        return "bg-green-100 text-green-800"
      case "rejete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Gestion des Documents
          </h1>
          <p className="text-gray-600">Validez les pièces justificatives des utilisateurs</p>
        </div>

        {/* Documents by User */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([userId, docs]) => {
            const user = docs[0].utilisateur
            const pendingDocs = docs.filter((doc) => doc.statut === "en_attente").length
            const validDocs = docs.filter((doc) => doc.statut === "valide").length
            const rejectedDocs = docs.filter((doc) => doc.statut === "rejete").length

            return (
              <div
                key={userId}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
              >
                {/* User Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold">
                          {user.nom} {user.prenom}
                        </h2>
                        <p className="text-blue-100">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{user.type}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getUserStatusColor(user.statut)}`}
                          >
                            {user.statut || "en_attente"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{validDocs}</div>
                          <div className="text-blue-100">Validés</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{pendingDocs}</div>
                          <div className="text-blue-100">En attente</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{rejectedDocs}</div>
                          <div className="text-blue-100">Rejetés</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {docs.map((doc) => (
                      <div key={doc.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <h3 className="font-medium text-gray-900">{doc.type_document}</h3>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(doc.statut)}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.statut)}`}
                            >
                              {doc.statut}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>Déposé le {new Date(doc.date_upload).toLocaleDateString("fr-FR")}</span>
                        </div>

                        {doc.commentaire && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                            <p className="text-sm text-red-700">
                              <span className="font-medium">Motif du rejet:</span> {doc.commentaire}
                            </p>
                          </div>
                        )}

                        <a
                          href={`http://localhost:3001/uploads/${doc.url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir le document
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                      href={`/dashboard/admin/documents/${userId}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                    >
                      <Eye className="w-4 h-4" />
                      Voir les détails et gérer
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document soumis</h3>
            <p className="text-gray-500">Les documents des utilisateurs apparaîtront ici</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
