'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

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

export default function AdminDocumentDetailPage() {
  const { id } = useParams()
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetch(`http://localhost:3001/document/user/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setUtilisateur(data[0].utilisateur)
          setDocuments(data)
        }
      })
  }, [id])

  const updateDocumentStatut = async (docId: number, statut: string, commentaire?: string) => {
    await fetch(`http://localhost:3001/document/${docId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ statut, commentaire })
    })

    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, statut, commentaire } : doc
      )
    )
  }

  const validerProfil = async () => {
    if (!utilisateur) return
    await fetch(`http://localhost:3001/utilisateurs/${utilisateur.id}/valider-profil`, {
      method: 'PATCH',
      credentials: 'include',
    })
    setUtilisateur({ ...utilisateur, statut: 'valide' })
  }

  const rejeterProfil = async () => {
    if (!utilisateur) return
    await fetch(`http://localhost:3001/utilisateurs/${utilisateur.id}/rejeter-profil`, {
      method: 'PATCH',
      credentials: 'include',
    })
    setUtilisateur({ ...utilisateur, statut: 'rejete' })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Détails de l'utilisateur</h1>

        {utilisateur && (
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <p><strong>Nom :</strong> {utilisateur.nom} {utilisateur.prenom}</p>
            <p><strong>Email :</strong> {utilisateur.email}</p>
            <p><strong>Rôle :</strong> {utilisateur.type}</p>
            <p><strong>Statut du profil :</strong>
              <span className={`ml-2 font-semibold ${utilisateur.statut === 'valide' ? 'text-green-600' : utilisateur.statut === 'rejete' ? 'text-red-600' : 'text-yellow-600'}`}>
                {utilisateur.statut}
              </span>
            </p>
            <div className="mt-4 flex gap-4">
              <button onClick={validerProfil} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                Valider le profil
              </button>
              <button onClick={rejeterProfil} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Rejeter le profil
              </button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-[#0070C0] mb-4">Documents soumis</h2>

        {documents.length === 0 ? (
          <p className="text-gray-500">Aucun document soumis.</p>
        ) : (
          <ul className="space-y-6">
            {documents.map((doc) => (
              <li key={doc.id} className="bg-white p-6 rounded-xl shadow border">
                <p className="mb-1"><strong>Type :</strong> {doc.type_document}</p>
                <p className="mb-1"><strong>Date :</strong> {new Date(doc.date_upload).toLocaleDateString()}</p>
                <p className="mb-2"><strong>Statut :</strong>
                  <span className={`ml-2 px-2 py-1 text-sm font-semibold rounded-full ${
                    doc.statut === 'valide' ? 'bg-green-100 text-green-700' :
                    doc.statut === 'rejete' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doc.statut}
                  </span>
                </p>

                {doc.commentaire && (
                  <p className="text-sm text-red-600 italic mb-2">
                    <strong>Motif du rejet :</strong> {doc.commentaire}
                  </p>
                )}

                <Link
                  href={`http://localhost:3001/uploads/${doc.url}`}
                  target="_blank"
                  className="text-blue-600 underline text-sm"
                >
                  Voir le document
                </Link>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {doc.statut !== 'valide' && (
                    <button
                      onClick={() => updateDocumentStatut(doc.id, 'valide')}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >Valider</button>
                  )}
                  {doc.statut !== 'rejete' && (
                    <button
                      onClick={() => {
                        const reason = prompt('Motif du rejet :') || ''
                        updateDocumentStatut(doc.id, 'rejete', reason)
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >Rejeter</button>
                  )}
                  {doc.statut !== 'en_attente' && (
                    <button
                      onClick={() => updateDocumentStatut(doc.id, 'en_attente')}
                      className="bg-yellow-300 text-black px-3 py-1 rounded text-sm hover:bg-yellow-400"
                    >Remettre en attente</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  )
}
