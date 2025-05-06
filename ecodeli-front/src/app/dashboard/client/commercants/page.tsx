'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Produit {
  id: number
  nom: string
  prix: number
  quantite: number
  imageUrl?: string
}

interface Commande {
  id: number
  date: string
  statut: string
  total: number
  produits: Produit[]
}

export default function CommandeDetailClient() {
  const { id } = useParams()
  const [commande, setCommande] = useState<Commande | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/commandes/${id}`, {
      credentials: 'include',
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) setCommande(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="p-6">Chargement...</p>
  if (!commande) return <p className="p-6 text-red-600">Commande introuvable.</p>

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Détail de la commande #{commande.id}</h1>
      <p className="text-gray-600 mb-2">Date : {new Date(commande.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-6">Statut : {commande.statut}</p>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {commande.produits.map((produit) => (
          <div
            key={produit.id}
            className="flex items-center gap-4 border-b pb-4"
          >
            {produit.imageUrl && (
              <Image
                src={produit.imageUrl}
                alt={produit.nom}
                width={100}
                height={80}
                className="rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{produit.nom}</h2>
              <p className="text-gray-600 text-sm">Quantité : {produit.quantite}</p>
              <p className="text-gray-600 text-sm">Prix unitaire : {produit.prix.toFixed(2)} €</p>
              <p className="text-gray-800 font-medium mt-1">
                Sous-total : {(produit.prix * produit.quantite).toFixed(2)} €
              </p>
            </div>
          </div>
        ))}

        <div className="text-right mt-6">
          <p className="text-xl font-bold text-[#0070C0]">
            Total commande : {commande.total.toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  )
}
