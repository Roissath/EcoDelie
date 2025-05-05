'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include', // 🔐 pour envoyer le cookie
    }).then(() => {
      router.push('/')
    })
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Déconnexion...
    </div>
  )
}
