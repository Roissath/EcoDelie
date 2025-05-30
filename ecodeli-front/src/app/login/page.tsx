'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Identifiants incorrects.')
        return
      }

      const user = data.user
      if (!user || !user.id || !user.type) {
        setError('Profil utilisateur incomplet.')
        return
      }

      // Redirection vers l'espace du user avec son ID
    router.push(`/dashboard/${user.type}`)
    } catch (err) {
      console.error(err)
      setError('Erreur de connexion.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl space-y-8">
        <div className="flex justify-center">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={80} height={80} />
        </div>

        <h1 className="text-center text-2xl font-extrabold text-[#0070C0]">Connexion à EcoDeli</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Adresse email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@example.com"
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-800 text-black"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition"
          >
            Se connecter
          </button>

          <Link href="/forgot-password" className="text-blue-800 hover:underline text-sm text-center block">
            Mot de passe oublié ?
          </Link>
        </form>
      </div>
    </div>
  )
}
