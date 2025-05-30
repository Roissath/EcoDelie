'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  statut?: string
}

interface Document {
  id: number
  type: string
  url: string
  statut: string
  commentaire?: string
  date_upload: string
  utilisateur: Utilisateur
}

export default function DocumentsAdminPage() {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/document', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setDocuments(Array.isArray(data) ? data : []))
  }, [])

  const valider = async (id: number) => {
    await fetch(`http://localhost:3001/document/${id}/valider`, {
      method: 'PATCH',
      credentials: 'include'
    })
    refresh()
  }

  const rejeter = async (id: number) => {
    const commentaire = prompt('Motif du rejet ?')
    if (!commentaire) return
    await fetch(`http://localhost:3001/document/${id}/rejeter`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ commentaire })
    })
    refresh()
  }

  const refresh = () => {
    fetch('http://localhost:3001/document', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setDocuments(data))
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">Gestion des documents</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md border rounded-xl text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Utilisateur</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Lien</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Commentaire</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{doc.utilisateur.nom} {doc.utilisateur.prenom}</td>
                  <td className="px-4 py-2">{doc.utilisateur.email}</td>
                  <td className="px-4 py-2">{doc.type}</td>
                  <td className="px-4 py-2">
                    <a href={doc.url} target="_blank" className="text-blue-600 underline">Voir</a>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      doc.statut === 'valide' ? 'bg-green-100 text-green-700' :
                      doc.statut === 'rejete' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-600">{doc.commentaire || '-'}</td>
                  <td className="px-4 py-2">{new Date(doc.date_upload).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-2 text-center flex gap-2 justify-center">
                    <button onClick={() => valider(doc.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">Valider</button>
                    <button onClick={() => rejeter(doc.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Rejeter</button>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-400">Aucun document soumis</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  )
}
