'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function StatistiquesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Statistiques</h1>
        <p className="text-gray-700 mb-6">
          Suivez vos performances de vente, le nombre de commandes livrées et l’évolution de votre activité sur la plateforme.
        </p>
        <div className="flex justify-center">
          <Image
            src="/illustrations/commercant-statistiques.jpg"
            alt="Statistiques"
            width={500}
            height={300}
            className="rounded-xl"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
