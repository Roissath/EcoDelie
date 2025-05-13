'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MapPin, Truck, Clock, Trash2, Pencil } from 'lucide-react'

interface Livraison {
  id: number
  statut: string
  date_debut: string
  date_fin?: string
  livreur: { nom: string; prenom: string }
  annonceClient: {
    id: number
    lieu_depart: string
    lieu_arrivee: string
    prix_livraison: number
    colis_fragile: boolean
    type_annonce: string
  }
}

export default function DetailLivraisonClient() {
  const { id } = useParams()
  const router = useRouter()
  const [livraison, setLivraison] = useState<Livraison | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:3001/livraison/${id}`, {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setLivraison(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="p-6">Chargement...</p>
  if (!livraison) return <p className="p-6 text-red-600">Livraison introuvable.</p>

  const { annonceClient, livreur, statut, date_debut, date_fin } = livraison

  const handleSupprimer = async () => {
    const confirm = window.confirm('Annuler cette annonce ?')
    if (!confirm) return
    const res = await fetch(`http://localhost:3001/annonces-client/${annonceClient.id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (res.ok) {
      alert('Annonce annulée.')
      router.push('/dashboard/client/annonces')
    } else {
      alert('Erreur lors de la suppression.')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-4">Suivi de livraison #{livraison.id}</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Truck className="text-[#0070C0]" />
          <span>Statut : <strong className="capitalize">{statut}</strong></span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock className="text-[#0070C0]" />
          <span>Début : {new Date(date_debut).toLocaleString()}</span>
        </div>

        {date_fin && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="text-[#0070C0]" />
            <span>Livrée le : {new Date(date_fin).toLocaleString()}</span>
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="text-[#0070C0]" />
          <span>Départ : {annonceClient.lieu_depart}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MapPin className="text-[#0070C0]" />
          <span>Arrivée : {annonceClient.lieu_arrivee}</span>
        </div>

        <p className="text-sm text-gray-700">Colis fragile : {annonceClient.colis_fragile ? 'Oui' : 'Non'}</p>
        <p className="text-sm text-gray-700">Type d’annonce : {annonceClient.type_annonce}</p>
        <p className="text-sm text-gray-700">Montant payé : {annonceClient.prix_livraison.toFixed(2)} €</p>

        <hr className="my-4" />

        <p className="text-sm text-gray-600">Livreur : <strong>{livreur.prenom} {livreur.nom}</strong></p>

        {/* Boutons d’action */}
        {statut === 'en_attente' && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSupprimer}
              className="flex items-center gap-2 text-red-600 hover:underline"
            >
              <Trash2 className="w-4 h-4" /> Annuler l’annonce
            </button>
            <a
              href={`/dashboard/client/annonces/modifier/${annonceClient.id}`}
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Pencil className="w-4 h-4" /> Modifier
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
