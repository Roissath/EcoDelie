'use client'

import Image from 'next/image'
import Footer from '@/components/Footer'

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-6 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Mes documents</h1>
        <p className="text-gray-700 mb-6">Déposez ou mettez à jour vos justificatifs (pièce d’identité, carte grise...)</p>
        <div className="flex justify-center mb-6">
          <Image src="/illustrations/livreur-documents.jpg" alt="Documents" width={500} height={300} className="rounded-xl" />
        </div>
        <div className="text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
            Ajouter un document
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
