'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

interface Produit {
  id: string
  nom: string
  prix: number
  imageUrl: string
  commercantNom: string
}

export default function ExplorerProduits() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/produits') // Adapté à ton NestJS
      .then(res => res.json())
      .then(data => {
        setProduits(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-10">🛍️ Produits des commerçants</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Chargement en cours...</p>
      ) : produits.length === 0 ? (
        <p className="text-gray-600 text-center">Aucun produit disponible.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produits.map(produit => (
            <div key={produit.id} className="bg-white rounded-2xl shadow border hover:shadow-lg p-4 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <ShoppingCart className="text-green-600 w-5 h-5" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{produit.nom}</h2>
              </div>

              <Image
                src={produit.imageUrl}
                alt={produit.nom}
                width={400}
                height={160}
                className="rounded-xl object-cover w-full h-40 mb-4"
              />

              <p className="text-sm text-gray-500">Vendu par : <strong>{produit.commercantNom}</strong></p>
              <p className="text-lg font-bold text-green-700">{produit.prix} €</p>

              <button className="w-full mt-4 bg-[#0070C0] hover:bg-blue-800 text-white py-2 rounded-xl transition">
                Voir détails
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
