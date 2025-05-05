'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function MesAnnoncesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Mes annonces</h1>
        <p className="text-gray-700 mb-6">
          Consultez et gérez vos annonces en cours, archivées ou expirées. Vous pouvez modifier leur contenu à tout moment.
        </p>
        <div className="flex justify-center">
          <Image
            src="/illustrations/stand-marché.jpg"
            alt="Mes annonces"
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
