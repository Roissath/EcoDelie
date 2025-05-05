'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function ProduitsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Mes produits</h1>
        <p className="text-gray-700 mb-6">
          Consultez et gérez vos produits disponibles à la livraison. Mettez à jour les informations, prix et photos selon vos stocks.
        </p>
        <div className="flex justify-center">
          <Image
            src="/illustrations/gestion-produits.jpg"
            alt="Gestion des produits"
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
