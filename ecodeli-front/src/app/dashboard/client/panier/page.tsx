'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'

interface Produit {
  id: number
  nom: string
  prix: number
  imageUrl?: string
  stock: number
  quantite: number
}

export default function PanierClient() {
  const [panier, setPanier] = useState<Produit[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('panier')
    if (saved) {
      const parsed: Produit[] = JSON.parse(saved)
      setPanier(parsed)
      calculerTotal(parsed)
    }
  }, [])

  const calculerTotal = (items: Produit[]) => {
    const t = items.reduce((acc, prod) => acc + prod.prix * prod.quantite, 0)
    setTotal(parseFloat(t.toFixed(2)))
  }

  const supprimerProduit = (id: number) => {
    const maj = panier.filter(p => p.id !== id)
    setPanier(maj)
    localStorage.setItem('panier', JSON.stringify(maj))
    calculerTotal(maj)
  }

  const modifierQuantite = (id: number, quantite: number) => {
    const maj = panier.map(p => p.id === id ? { ...p, quantite } : p)
    setPanier(maj)
    localStorage.setItem('panier', JSON.stringify(maj))
    calculerTotal(maj)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">🛒 Mon Panier</h1>

      {panier.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne des produits */}
          <div className="lg:col-span-2 space-y-6">
            {panier.map((produit) => (
              <div key={produit.id} className="bg-white rounded-xl shadow flex flex-col md:flex-row items-center p-4 gap-4">
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  {produit.imageUrl && (
                    <Image src={produit.imageUrl} alt={produit.nom} width={100} height={80} className="rounded-lg object-cover" />
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{produit.nom}</h2>
                    <p className="text-sm text-gray-500">Prix unitaire : {produit.prix.toFixed(2)} €</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`qte-${produit.id}`} className="text-sm">Quantité :</label>
                  <input
                    id={`qte-${produit.id}`}
                    type="number"
                    value={produit.quantite}
                    onChange={(e) => modifierQuantite(produit.id, Math.max(1, parseInt(e.target.value)))}
                    min={1}
                    max={produit.stock}
                    className="w-16 border rounded-lg p-1"
                  />
                </div>

                <button
                  onClick={() => supprimerProduit(produit.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Supprimer du panier"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Colonne récapitulatif */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            <div className="space-y-2">
              {panier.map(p => (
                <div key={p.id} className="flex justify-between text-sm text-gray-700">
                  <span>{p.nom} x {p.quantite}</span>
                  <span>{(p.prix * p.quantite).toFixed(2)} €</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <p className="text-lg font-bold text-gray-800">Total : {total} €</p>

            <Link href="/dashboard/client/commande">
              <button className="mt-4 w-full bg-[#0070C0] text-white py-2 rounded-xl hover:bg-blue-800 transition">
                Valider la commande
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
