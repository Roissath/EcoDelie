"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex flex-col items-center justify-center text-center p-6">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl max-w-md w-full">
        <div className="flex justify-center">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={80} height={80} />
        </div>
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-6">
          Inscription réussie !
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-4 mb-6">
          Votre compte a bien été créé. Vous pouvez maintenant accéder à votre espace personnel via le bouton ci-dessous.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Se connecter
        </button>
      </div>
    </div>
  )
}
