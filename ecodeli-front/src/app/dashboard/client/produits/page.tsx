'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Produit {
  id: number
  nom: string
  descriptif: string
  prix: number
  stock: number
  categorie: string
  utilisateur: {
    prenom: string
    nom: string
  }
}

export default function ProduitsPage() {
  const [produits, setProduits] = useState<Produit[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/produit/public')
      .then(res => res.json())
      .then(setProduits)
      .catch(err => console.error('Erreur chargement produits :', err))
  }, [])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Produits disponibles</h1>

      {produits.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {produits.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{p.nom}</h2>

                <p className="text-gray-700 text-sm line-clamp-3 mb-2">
                  {p.descriptif}
                </p>

                <p className="text-blue-600 font-bold text-lg mb-2">{p.prix.toFixed(2)} €</p>

                <p className="text-sm text-gray-500">
                  Vendu par <span className="font-medium">{p.utilisateur.prenom} {p.utilisateur.nom}</span>
                </p>
              </div>

              <Link
                href={`/dashboard/client/produits/${p.id}`}
                className="mt-4 inline-block bg-[#0070C0] text-white px-4 py-2 rounded-xl text-sm text-center hover:bg-blue-800 transition"
              >
                Voir le produit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
