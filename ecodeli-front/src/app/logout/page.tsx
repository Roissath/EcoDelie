'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      try {
        await fetch('http://localhost:3001/auth/logout', {
          method: 'POST',
          credentials: 'include', // 🔐 pour supprimer le cookie jwt
        })

        router.replace('/login') // Redirection après déconnexion
      } catch (error) {
        console.error('Erreur lors de la déconnexion', error)
        router.push('/login') // Redirige quand même en cas d’erreur
      }
    }

    logout()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
      Déconnexion en cours...
    </div>
  )
}
