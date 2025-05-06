'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Produit {
  id: number
  nom: string
  descriptif: string
  prix: number
  stock: number
  imageUrl?: string
  categorie?: string
}

export default function DetailProduitPage() {
  const { id } = useParams()
  const [produit, setProduit] = useState<Produit | null>(null)
  const [quantite, setQuantite] = useState(1)
  const [similaires, setSimilaires] = useState<Produit[]>([])

  useEffect(() => {
    fetch(`http://localhost:3001/produits/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduit(data)
        fetch(`http://localhost:3001/produits/categorie/${data.categorie}`)
          .then(res => res.json())
          .then(setSimilaires)
      })
  }, [id])

  const ajouterAuPanier = () => {
    const saved = localStorage.getItem('panier')
    let panier = saved ? JSON.parse(saved) : []
    const existe = panier.find((p: Produit) => p.id === produit?.id)

    if (existe) {
      existe.quantite += quantite
    } else {
      panier.push({ ...produit, quantite })
    }

    localStorage.setItem('panier', JSON.stringify(panier))
    alert('Produit ajouté au panier !')
  }

  if (!produit) return <div className="p-6">Chargement...</div>

  return (
    <div className="p-6 space-y-10">
      <div className="flex flex-col md:flex-row gap-10">
        {produit.imageUrl && (
          <Image src={produit.imageUrl} alt={produit.nom} width={400} height={300} className="rounded-xl object-cover" />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-2">{produit.nom}</h1>
          <p className="text-gray-600 mb-4">{produit.descriptif}</p>
          <p className="text-lg font-semibold mb-4">Prix : {produit.prix} €</p>

          {produit.stock === 0 ? (
            <p className="text-red-600 font-semibold">Indisponible</p>
          ) : produit.stock <= 10 ? (
            <p className="text-orange-500 font-semibold">Il ne reste que {produit.stock} exemplaires !</p>
          ) : null}

          <div className="mt-4 flex items-center gap-4">
            <label htmlFor="quantite">Quantité :</label>
            <input
              type="number"
              id="quantite"
              value={quantite}
              onChange={(e) => setQuantite(Math.max(1, Math.min(produit.stock, parseInt(e.target.value))))}
              min={1}
              max={produit.stock}
              className="w-20 border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={ajouterAuPanier}
            className="mt-4 bg-[#0070C0] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Produits similaires */}
      {similaires.length > 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similaires.filter(p => p.id !== produit.id).slice(0, 6).map(p => (
              <Link key={p.id} href={`/dashboard/client/produits/${p.id}`} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
                {p.imageUrl && (
                  <Image src={p.imageUrl} alt={p.nom} width={200} height={150} className="rounded-lg mb-2 object-cover" />
                )}
                <h3 className="text-lg font-semibold">{p.nom}</h3>
                <p className="text-sm text-gray-600">{p.prix.toFixed(2)} €</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
