'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function AnnoncesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Annonces proches</h1>
        <p className="text-gray-700 mb-6">
          Consultez les annonces de livraison correspondant à vos trajets et disponibilités.
        </p>
        <div className="flex justify-center mb-6">
          <Image
            src="/illustrations/livreur-annonces.jpg"
            alt="Annonces"
            width={500}
            height={300}
            className="rounded-xl"
          />
        </div>
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Voir les annonces disponibles
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
