'use client'

import { useEffect, useState } from 'react'
import { Trash2, Truck, Clock } from 'lucide-react'

interface Annonce {
  id: number
  lieu_depart: string
  lieu_arrivee: string
  poids_estime: number
  prix_livraison: number
  colis_fragile: boolean
  type_annonce: string
  statut?: 'en_attente' | 'en_cours' | 'livree' // champ optionnel selon BDD
}

export default function ListeAnnoncesClient() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAnnonces = async () => {
    try {
      const res = await fetch('http://localhost:3001/annonces-client', {
        credentials: 'include'
      })
      const data = await res.json()
      setAnnonces(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const supprimerAnnonce = async (id: number) => {
    const confirm = window.confirm('Supprimer cette annonce ?')
    if (!confirm) return
    const res = await fetch(`http://localhost:3001/annonces-client/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (res.ok) {
      setAnnonces(prev => prev.filter(a => a.id !== id))
    } else {
      alert('Erreur lors de la suppression')
    }
  }

  useEffect(() => {
    fetchAnnonces()
  }, [])

  if (loading) return <p className="p-6">Chargement...</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#0070C0] mb-8">📋 Mes annonces</h1>
      {annonces.length === 0 ? (
        <p className="text-gray-600">Aucune annonce pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {annonces.map(annonce => (
            <div key={annonce.id} className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">{annonce.type_annonce === 'course' ? 'Course' : 'Livraison'} #{annonce.id}</h2>
                <p className="text-sm text-gray-600">De <strong>{annonce.lieu_depart}</strong> à <strong>{annonce.lieu_arrivee}</strong></p>
                <p className="text-sm text-gray-500">Prix : {annonce.prix_livraison} € | Poids : {annonce.poids_estime} kg</p>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                {/* Affichage du statut */}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  annonce.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-700' :
                  annonce.statut === 'livree' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {annonce.statut === 'en_cours' ? 'En cours' :
                  annonce.statut === 'livree' ? 'Livrée' : 'En attente'}
                </span>

                {/* Si l’annonce est en attente, permettre la suppression */}
                {annonce.statut === 'en_attente' && (
                  <button onClick={() => supprimerAnnonce(annonce.id)} className="text-red-500 hover:text-red-700" title="Supprimer">
                    <Trash2 />
                  </button>
                )}

                {/* Lien vers le suivi s’il est en cours */}
                {annonce.statut === 'en_cours' && (
                  <a
                    href={`/dashboard/client/livraisons/${annonce.id}`}
                    className="text-[#0070C0] hover:underline text-sm"
                  >
                    Suivre la livraison <Truck className="inline w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
