'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/document', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setDocuments(Array.isArray(data) ? data : []))
  }, [])

  const grouped = documents.reduce<Record<number, Document[]>>((acc, doc) => {
    if (!acc[doc.utilisateur.id]) acc[doc.utilisateur.id] = []
    acc[doc.utilisateur.id].push(doc)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">
          Gestion des Documents Utilisateurs
        </h1>

        {Object.entries(grouped).map(([userId, docs]) => {
          const user = docs[0].utilisateur
          return (
            <div key={userId} className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {user.nom} {user.prenom} ({user.email}) - {user.type}
              </h2>
              <p className="mb-4 text-sm">Statut du profil :
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  user.statut === 'valide' ? 'bg-green-100 text-green-700' :
                  user.statut === 'rejete' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {user.statut || 'en_attente'}
                </span>
              </p>
              <ul className="space-y-3">
                {docs.map(doc => (
                  <li key={doc.id} className="border p-3 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <p><strong>{doc.type_document}</strong></p>
                        <p className="text-sm text-gray-500">Déposé le : {new Date(doc.date_upload).toLocaleDateString()}</p>
                        <a href={`http://localhost:3001/uploads/${doc.url}`} target="_blank" rel="noreferrer" className="text-blue-600 underline text-sm">Voir</a>
                        {doc.commentaire && <p className="text-xs text-red-500 italic mt-1">{doc.commentaire}</p>}
                      </div>
                      <div className="text-sm italic">Statut :
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                          doc.statut === 'valide' ? 'bg-green-100 text-green-700' :
                          doc.statut === 'rejete' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {doc.statut}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Link href={`/dashboard/admin/documents/${userId}`} className="text-blue-600 hover:underline text-sm">
                  Voir les documents en détail
                </Link>
              </div>
            </div>
          )
        })}

        {documents.length === 0 && (
          <div className="text-center text-gray-400">
            <img src="/icons/empty-doc.svg" alt="Aucun document" className="mx-auto w-12 h-12 mb-2" />
            <p>Aucun document soumis</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
