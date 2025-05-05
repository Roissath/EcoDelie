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

  // Charger le panier depuis localStorage
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
      <h1 className="text-3xl font-bold text-[#0070C0] mb-6">Mon panier</h1>

      {panier.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          <div className="space-y-6">
            {panier.map((produit) => (
              <div key={produit.id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 justify-between">
                {/* Image produit */}
                <div className="flex items-center gap-4 flex-1">
                  {produit.imageUrl && (
                    <Image src={produit.imageUrl} alt={produit.nom} width={100} height={80} className="rounded-lg object-cover" />
                  )}
                  <div>
                    <h2 className="text-lg font-bold">{produit.nom}</h2>
                    <p className="text-sm text-gray-600">{produit.prix.toFixed(2)} €</p>
                  </div>
                </div>

                {/* Choix de quantité */}
                <div className="flex items-center gap-2">
                  <label htmlFor={`qte-${produit.id}`} className="text-sm text-gray-700">Quantité :</label>
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

                {/* Supprimer */}
                <button onClick={() => supprimerProduit(produit.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Récap */}
          <div className="mt-10 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            <p className="text-lg text-gray-800 font-bold">Total : {total} €</p>

            <Link href="/client/commande">
              <button className="mt-4 bg-[#0070C0] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition">
                Passer la commande
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
