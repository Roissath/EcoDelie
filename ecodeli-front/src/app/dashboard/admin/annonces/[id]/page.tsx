'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Utilisateur {
  nom: string
  prenom: string
  email?: string
  telephone?: string
}

interface InfoLivreur {
  utilisateur: Utilisateur
  type_transport: string
  statut: string
}

interface AnnonceClient {
  id: number
  type_annonce: string
  description?: string
  liste_courses?: string
  statut: string
  lieu_depart: string
  lieu_arrivee: string
  poids_estime: number
  prix_livraison: number
  colis_fragile: boolean
  datePublication: string
  datePriseEnCharge?: string
  dateLivraison?: string
  utilisateur: Utilisateur
  livreurs: InfoLivreur[]
}

export default function AnnonceAdminDetailPage() {
  const { id } = useParams()
  const [annonce, setAnnonce] = useState<AnnonceClient | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/annonces-client/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAnnonce(data))
  }, [id])

  if (!annonce) return <div className="p-10 text-center">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-bold text-center text-[#0070C0] mb-8">
          Détail de l'annonce #{annonce.id}
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Informations Générales</h2>
          <p className="text-gray-800"><strong>Type :</strong> {annonce.type_annonce}</p>
          <p className="text-gray-800"><strong>Description :</strong> {annonce.description || annonce.liste_courses || '-'}</p>
          <p className="text-gray-800"><strong>Statut :</strong> {annonce.statut}</p>
          <p className="text-gray-800"><strong>Poids estimé :</strong> {annonce.poids_estime} kg</p>
          <p className="text-gray-800"><strong>Prix livraison :</strong> {annonce.prix_livraison} €</p>
          <p className="text-gray-800"><strong>Colis fragile :</strong> {annonce.colis_fragile ? 'Oui' : 'Non'}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Trajet</h2>
          <p className="text-gray-800"><strong>Départ :</strong> {annonce.lieu_depart}</p>
          <p className="text-gray-800"><strong>Arrivée :</strong> {annonce.lieu_arrivee}</p>
          <p className="text-gray-800"><strong>Date publication :</strong> {new Date(annonce.datePublication).toLocaleString()}</p>
          <p className="text-gray-800"><strong>Date prise en charge :</strong> {annonce.datePriseEnCharge ? new Date(annonce.datePriseEnCharge).toLocaleString() : '-'}</p>
          <p className="text-gray-800"><strong>Date livraison :</strong> {annonce.dateLivraison ? new Date(annonce.dateLivraison).toLocaleString() : '-'}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Client</h2>
          <p className="text-gray-800">{annonce.utilisateur.nom} {annonce.utilisateur.prenom}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-900">Livreurs</h2>
          {annonce.livreurs.length > 0 ? (
            <ul className="list-disc ml-6">
              {annonce.livreurs.map((livreur, i) => (
                <li className="text-gray-800"key={i}>
                  {livreur.utilisateur.nom} {livreur.utilisateur.prenom} - {livreur.type_transport} [{livreur.statut}]
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-800">Aucun livreur n'a pris en charge cette annonce pour le moment.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
