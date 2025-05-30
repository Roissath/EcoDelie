// 'use client'

// import { useEffect, useState } from 'react'
// import { Trash2, Truck, Clock } from 'lucide-react'

// interface Annonce {
//   id: number
//   lieu_depart: string
//   lieu_arrivee: string
//   poids_estime: number
//   prix_livraison: number
//   colis_fragile: boolean
//   type_annonce: string
//   statut?: 'en_attente' | 'en_cours' | 'livree' // champ optionnel selon BDD
// }

// export default function ListeAnnoncesClient() {
//   const [annonces, setAnnonces] = useState<Annonce[]>([])
//   const [loading, setLoading] = useState(true)

//   const fetchAnnonces = async () => {
//     try {
//       const res = await fetch('http://localhost:3001/annonces-client', {
//         credentials: 'include'
//       })
//       const data = await res.json()
//       setAnnonces(data)
//     } catch (err) {
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const supprimerAnnonce = async (id: number) => {
//     const confirm = window.confirm('Supprimer cette annonce ?')
//     if (!confirm) return
//     const res = await fetch(`http://localhost:3001/annonces-client/${id}`, {
//       method: 'DELETE',
//       credentials: 'include'
//     })
//     if (res.ok) {
//       setAnnonces(prev => prev.filter(a => a.id !== id))
//     } else {
//       alert('Erreur lors de la suppression')
//     }
//   }

//   useEffect(() => {
//     fetchAnnonces()
//   }, [])

//   if (loading) return <p className="p-6">Chargement...</p>

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold text-[#0070C0] mb-8">📋 Mes annonces</h1>
//       {annonces.length === 0 ? (
//         <p className="text-gray-600">Aucune annonce pour le moment.</p>
//       ) : (
//         <div className="space-y-4">
//           {annonces.map(annonce => (
//             <div key={annonce.id} className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
//               <div>
//                 <h2 className="text-lg font-semibold">{annonce.type_annonce === 'course' ? 'Course' : 'Livraison'} #{annonce.id}</h2>
//                 <p className="text-sm text-gray-600">De <strong>{annonce.lieu_depart}</strong> à <strong>{annonce.lieu_arrivee}</strong></p>
//                 <p className="text-sm text-gray-500">Prix : {annonce.prix_livraison} € | Poids : {annonce.poids_estime} kg</p>
//               </div>
//               <div className="flex items-center gap-4 mt-2 sm:mt-0">
//                 {/* Affichage du statut */}
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   annonce.statut === 'en_cours' ? 'bg-yellow-100 text-yellow-700' :
//                   annonce.statut === 'livree' ? 'bg-green-100 text-green-700' :
//                   'bg-gray-100 text-gray-700'
//                 }`}>
//                   {annonce.statut === 'en_cours' ? 'En cours' :
//                   annonce.statut === 'livree' ? 'Livrée' : 'En attente'}
//                 </span>

//                 {/* Si l’annonce est en attente, permettre la suppression */}
//                 {annonce.statut === 'en_attente' && (
//                   <button onClick={() => supprimerAnnonce(annonce.id)} className="text-red-500 hover:text-red-700" title="Supprimer">
//                     <Trash2 />
//                   </button>
//                 )}

//                 {/* Lien vers le suivi s’il est en cours */}
//                 {annonce.statut === 'en_cours' && (
//                   <a
//                     href={`/dashboard/client/livraisons/${annonce.id}`}
//                     className="text-[#0070C0] hover:underline text-sm"
//                   >
//                     Suivre la livraison <Truck className="inline w-4 h-4 ml-1" />
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2, Edit, Eye, Plus, Clock, CheckCircle, XCircle } from "lucide-react"

interface Annonce {
  id: number
  lieu_depart: string
  lieu_arrivee: string
  poids_estime: number
  prix_livraison: number
  colis_fragile: boolean
  type_annonce: string
  statut: "en_attente" | "en_cours" | "livree" | "annulee"
  date_creation: string
  magasin?: string
  liste_courses?: string
  date_course?: string
}

export default function ListeAnnoncesClient() {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAnnonces = async () => {
    try {
      const res = await fetch("http://localhost:3001/annonces-client", {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setAnnonces(data)
      }
    } catch (err) {
      console.error("Erreur lors du chargement des annonces:", err)
      // Données fictives pour le développement
      setAnnonces([
        {
          id: 1,
          lieu_depart: "Paris 15ème",
          lieu_arrivee: "Boulogne-Billancourt",
          poids_estime: 2.5,
          prix_livraison: 15.0,
          colis_fragile: true,
          type_annonce: "livraison",
          statut: "en_attente",
          date_creation: "2024-01-15",
        },
        {
          id: 2,
          lieu_depart: "Carrefour Issy",
          lieu_arrivee: "Paris 7ème",
          poids_estime: 0,
          prix_livraison: 25.0,
          colis_fragile: false,
          type_annonce: "course",
          statut: "en_cours",
          date_creation: "2024-01-14",
          magasin: "Carrefour",
          liste_courses: "Lait, pain, fruits",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const supprimerAnnonce = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) return

    try {
      const res = await fetch(`http://localhost:3001/annonces-client/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        setAnnonces((prev) => prev.filter((a) => a.id !== id))
        alert("Annonce supprimée avec succès")
      } else {
        throw new Error("Erreur lors de la suppression")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de la suppression")
    }
  }

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "en_cours":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "livree":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "annulee":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "En attente"
      case "en_cours":
        return "En cours"
      case "livree":
        return "Livrée"
      case "annulee":
        return "Annulée"
      default:
        return statut
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "bg-yellow-100 text-yellow-800"
      case "en_cours":
        return "bg-blue-100 text-blue-800"
      case "livree":
        return "bg-green-100 text-green-800"
      case "annulee":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    fetchAnnonces()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mes annonces</h1>
          <p className="text-gray-600">Gérez vos demandes de livraison et de courses</p>
        </div>
        <Link href="/dashboard/client/annonces/creer">
          <button className="bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nouvelle annonce
          </button>
        </Link>
      </div>

      {/* Liste des annonces */}
      {annonces.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune annonce</h3>
            <p className="text-gray-600 mb-6">Vous n'avez pas encore créé d'annonce</p>
            <Link href="/dashboard/client/annonces/creer">
              <button className="bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Créer ma première annonce
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {annonces.map((annonce) => (
            <div key={annonce.id} className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {annonce.type_annonce === "course" ? "Course" : "Livraison"} #{annonce.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatutColor(annonce.statut)}`}
                    >
                      {getStatutIcon(annonce.statut)}
                      {getStatutLabel(annonce.statut)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Trajet :</strong> {annonce.lieu_depart} → {annonce.lieu_arrivee}
                    </p>
                    <p>
                      <strong>Prix :</strong> {annonce.prix_livraison.toFixed(2)} €
                      {annonce.poids_estime > 0 && (
                        <span className="ml-4">
                          <strong>Poids :</strong> {annonce.poids_estime} kg
                        </span>
                      )}
                    </p>
                    {annonce.colis_fragile && <p className="text-orange-600 font-medium">⚠️ Colis fragile</p>}
                    {annonce.type_annonce === "course" && annonce.magasin && (
                      <p>
                        <strong>Magasin :</strong> {annonce.magasin}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Créée le {new Date(annonce.date_creation).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/client/annonces/${annonce.id}`}>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Voir les détails"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>

                  {annonce.statut === "en_attente" && (
                    <>
                      <Link href={`/dashboard/client/annonces/modifier/${annonce.id}`}>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Modifier">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        onClick={() => supprimerAnnonce(annonce.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {annonce.statut === "en_cours" && (
                    <Link href={`/dashboard/client/livraisons/${annonce.id}`}>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                        Suivre
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
