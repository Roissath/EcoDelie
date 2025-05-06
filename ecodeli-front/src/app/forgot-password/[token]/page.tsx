'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password !== confirmPassword) {
      setError('❌ Les mots de passe ne correspondent pas.')
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Votre mot de passe a été réinitialisé avec succès.')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        setError(data.message || 'Erreur lors de la réinitialisation.')
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#0070C0] mb-6">Réinitialisation du mot de passe</h1>

        {message && <div className="bg-green-100 text-green-700 text-sm p-3 rounded-xl mb-4 text-center">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nouveau mot de passe"
              className="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirmez le mot de passe"
              className="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  )
}
