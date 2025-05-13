'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Produit {
  id: number
  nom: string
  descriptif: string
  prix: number
  stock: number
  image?: string
  categorie: string
}

export default function ProduitsPublicsPage() {
  const [produits, setProduits] = useState<Produit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/produit/public')
      .then(res => res.json())
      .then(data => setProduits(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-6 text-center text-gray-500">Chargement des produits...</p>

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center">Tous les produits disponibles</h1>

      {produits.length === 0 ? (
        <p className="text-center text-gray-600 italic">Aucun produit en stock pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produits.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.nom}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover w-full h-[180px]"
                />
              )}
              <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-lg text-gray-800">{p.nom}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{p.descriptif}</p>
                <p className="text-green-700 font-bold">{p.prix.toFixed(2)} €</p>
                {/* Stock intelligent */}
                {p.stock <= 10 && (
                  <p className={`text-sm font-medium ${p.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                    {p.stock === 0
                      ? 'Indisponible'
                      : `Il ne reste que ${p.stock} exemplaires`}
                  </p>
                )}

                {/* Boutons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      const panier = JSON.parse(localStorage.getItem('panier') || '[]')
                      const existant = panier.find((prod: any) => prod.id === p.id)
                      if (existant) {
                        existant.quantite += 1
                      } else {
                        panier.push({ ...p, quantite: 1 })
                      }
                      localStorage.setItem('panier', JSON.stringify(panier))
                      alert('Produit ajouté au panier')
                    }}
                    disabled={p.stock === 0}
                    className={`flex-1 py-1 px-2 text-white rounded-md text-sm font-medium transition ${
                      p.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0070C0] hover:bg-blue-800'
                    }`}
                  >
                    Ajouter
                  </button>

                  <Link
                    href={`/dashboard/client/produits/${p.id}`}
                    className="flex-1 py-1 px-2 text-sm text-center border border-[#0070C0] text-[#0070C0] rounded-md hover:bg-blue-50"
                  >
                    Voir
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
