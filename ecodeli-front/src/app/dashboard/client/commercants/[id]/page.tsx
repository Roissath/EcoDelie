'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { ShoppingCart, Star } from 'lucide-react'

interface Produit {
  id: number
  nom: string
  descriptif: string
  prix: number
  stock: number
  imageUrl?: string
  categorie: string
  utilisateur: { nom: string }
}

interface Commentaire {
  id: number
  contenu: string
  utilisateur: { prenom: string }
  createdAt: string
}

interface Similaire {
  id: number
  nom: string
  prix: number
  imageUrl?: string
}

export default function ProduitDetail() {
  const { id } = useParams()
  const [produit, setProduit] = useState<Produit | null>(null)
  const [commentaires, setCommentaires] = useState<Commentaire[]>([])
  const [similaires, setSimilaires] = useState<Similaire[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3001/produit/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduit(data.produit)
        setCommentaires(data.commentaires)
        setSimilaires(data.similaires)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="p-6 text-gray-600">Chargement en cours...</p>
  if (!produit) return <p className="p-6 text-red-600">Produit introuvable.</p>
  
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 space-y-12">
      {/* Bloc haut : fiche produit */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image produit */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow p-4">
          {produit.imageUrl && (
            <Image
              src={produit.imageUrl}
              alt={produit.nom}
              width={600}
              height={400}
              className="rounded-xl object-cover w-full h-[300px]"
            />
          )}
        </div>

        {/* Infos produit */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-2">{produit.nom}</h1>
          <p className="text-gray-600 text-sm mb-2">Vendu par : <span className="font-semibold">{produit.utilisateur.nom}</span></p>
          <p className="text-gray-800 mb-4">{produit.descriptif}</p>

          {/* Stock intelligent */}
          {produit.stock === 0 && (
            <p className="text-red-600 font-semibold mb-2">Indisponible</p>
          )}
          {produit.stock > 0 && produit.stock <= 10 && (
            <p className="text-orange-600 font-medium mb-2">Il ne reste que {produit.stock} exemplaires</p>
          )}

          <p className="text-2xl font-bold text-green-700 mb-6">{produit.prix.toFixed(2)} €</p>

          <button
  onClick={() => {
    if (!produit) return;
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');

    const existant = panier.find((p: any) => p.id === produit.id);
    if (existant) {
      existant.quantite += 1;
    } else {
      panier.push({ ...produit, quantite: 1 });
    }

    localStorage.setItem('panier', JSON.stringify(panier));
    alert('Produit ajouté au panier');
  }}
  className={`w-full py-2 px-4 text-white rounded-xl font-semibold transition ${
    produit.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0070C0] hover:bg-blue-800'
  }`}
  disabled={produit.stock === 0}
>
  Ajouter au panier
</button>

        </div>
      </div>

      {/* Bloc commentaires */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Commentaires des clients</h2>
        {commentaires.length === 0 ? (
          <p className="text-gray-500 italic">Aucun commentaire pour ce produit.</p>
        ) : (
          <ul className="space-y-4">
            {commentaires.map(com => (
              <li key={com.id} className="border-b pb-2">
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {com.utilisateur.prenom} • {new Date(com.createdAt).toLocaleDateString()}
                </div>
                <p className="text-gray-800">{com.contenu}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bloc suggestions similaires */}
      {similaires.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similaires.map(prod => (
              <a
                key={prod.id}
                href={`/client/commercants/${prod.id}`}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                {prod.imageUrl && (
                  <Image
                    src={prod.imageUrl}
                    alt={prod.nom}
                    width={300}
                    height={200}
                    className="rounded-md object-cover w-full h-[150px]"
                  />
                )}
                <h3 className="mt-3 font-semibold">{prod.nom}</h3>
                <p className="text-green-700 font-bold">{prod.prix.toFixed(2)} €</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
