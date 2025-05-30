'use client'

import { useState } from 'react'

export default function UploadDocumentsForm() {
  const [files, setFiles] = useState<FileList | null>(null)
  const [type, setType] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!files || !type || !userId) {
      setError('Tous les champs sont requis')
      return
    }

    const formData = new FormData()
    Array.from(files).forEach(file => {
      formData.append('files', file)
    })
    formData.append('type_document', type)
    formData.append('utilisateurId', userId.toString())

    setLoading(true)
    setSuccess(false)
    setError('')

    try {
      const res = await fetch('http://localhost:3001/document/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!res.ok) {
        throw new Error('Échec de l\'envoi')
      }

      setSuccess(true)
      setFiles(null)
      setType('')
    } catch (err) {
      setError('Erreur lors de l\'envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-[#0070C0]">Soumettre des documents</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Type de document</label>
          <input
            type="text"
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Utilisateur ID</label>
          <input
            type="number"
            value={userId ?? ''}
            onChange={e => setUserId(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fichiers</label>
          <input
            type="file"
            multiple
            onChange={e => setFiles(e.target.files)}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0070C0] text-white px-4 py-2 rounded hover:bg-[#005ea2] disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Envoi...' : 'Envoyer les documents'}
        </button>
        {success && <p className="text-green-600 text-sm mt-2">Documents envoyés avec succès !</p>}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}
