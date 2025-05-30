'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = useParams() as { token: string };

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Erreur inconnue')
      }

      setMessage('Mot de passe mis à jour avec succès.')
      setTimeout(() => router.push('/login'), 2500)
    } catch (err: any) {
      setError(err.message || 'Erreur serveur.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Réinitialiser le mot de passe</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}

        <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded mb-4" />

        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border border-gray-300 rounded mb-4" />

        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Réinitialiser
        </button>
      </form>
    </div>
  )
}
