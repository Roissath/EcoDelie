'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function PaiementsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Mes paiements</h1>
        <p className="text-gray-700 mb-6">
          Suivez l’état de vos paiements reçus ou en attente. Vérifiez vos virements et téléchargez vos justificatifs.
        </p>
        <div className="flex justify-center">
          <Image
            src="/illustrations/commercant-paiements.jpg"
            alt="Paiements"
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
