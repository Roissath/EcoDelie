"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  MapPin,
  User,
  MessageCircle,
  ChevronRight,
  Check,
  AlertCircle,
  CalendarClock,
} from "lucide-react"

interface Prestation {
  id: number
  titre: string
  description: string
  type_service: string
  tarif: number
  duree_estimee: string
  note_moyenne: number
  adresse?: string
  prestataire: {
    id: number
    nom: string
    prenom: string
    photo_profil?: string
    bio?: string
    competences?: string[]
    certifications?: string[]
  }
  disponibilites: {
    id: number
    date: string
    heure_debut: string
    heure_fin: string
  }[]
  avis?: {
    id: number
    note: number
    commentaire: string
    date: string
    utilisateur: {
      nom: string
      prenom: string
    }
  }[]
}

export default function DetailPrestationPage() {
  const params = useParams()
  const router = useRouter()
  const [prestation, setPrestation] = useState<Prestation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedHeure, setSelectedHeure] = useState<string | null>(null)
  const [reservationSuccess, setReservationSuccess] = useState(false)

  const typeLabels: Record<string, string> = {
    transport: "Transport de personnes",
    courses: "Courses et achats",
    aide_domicile: "Aide à domicile",
    garde_animaux: "Garde d'animaux",
    jardinage: "Jardinage",
    bricolage: "Bricolage",
    autre: "Autres services",
  }

  useEffect(() => {
    const fetchPrestation = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3001/prestations/${params.id}`, {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error(`Erreur lors du chargement de la prestation: ${response.status}`)
        }

        const data = await response.json()
        setPrestation(data)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de charger les détails de la prestation")

        // Données de test pour le développement
        setPrestation({
          id: Number.parseInt(params.id as string),
          titre: "Transport vers l'aéroport",
          description:
            "Transport de personnes vers l'aéroport Charles de Gaulle avec prise en charge des bagages. Service ponctuel et fiable, véhicule confortable et spacieux pour vos bagages. Possibilité de prise en charge à domicile.",
          type_service: "transport",
          tarif: 45,
          duree_estimee: "1h30",
          note_moyenne: 4.8,
          adresse: "Paris et région parisienne",
          prestataire: {
            id: 101,
            nom: "Dupont",
            prenom: "Jean",
            photo_profil: "/default-avatar.png",
            bio: "Chauffeur professionnel depuis 10 ans, je propose mes services pour tous vos déplacements. Ponctuel et courtois, je m'adapte à vos besoins.",
            competences: ["Transport de personnes", "Connaissance de Paris", "Anglais courant"],
            certifications: ["VTC", "Premiers secours"],
          },
          disponibilites: [
            { id: 1, date: "2025-06-10", heure_debut: "08:00", heure_fin: "10:00" },
            { id: 2, date: "2025-06-10", heure_debut: "14:00", heure_fin: "16:00" },
            { id: 3, date: "2025-06-11", heure_debut: "09:00", heure_fin: "11:00" },
            { id: 4, date: "2025-06-11", heure_debut: "15:00", heure_fin: "17:00" },
          ],
          avis: [
            {
              id: 1,
              note: 5,
              commentaire: "Excellent service, très ponctuel et agréable",
              date: "2025-05-15",
              utilisateur: { nom: "Martin", prenom: "Sophie" },
            },
            {
              id: 2,
              note: 4,
              commentaire: "Bon service, je recommande",
              date: "2025-05-10",
              utilisateur: { nom: "Dubois", prenom: "Pierre" },
            },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPrestation()
  }, [params.id])

  const handleReservation = async () => {
    if (!selectedDate || !selectedHeure) {
      alert("Veuillez sélectionner une date et une heure")
      return
    }

    try {
      const response = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          prestationId: prestation?.id,
          date: selectedDate,
          heure: selectedHeure,
          prestataireId: prestation?.prestataire.id,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la réservation")
      }

      setReservationSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/client/reservations")
      }, 2000)
    } catch (err) {
      console.error("Erreur:", err)
      // Simulation de réservation réussie pour le développement
      setReservationSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/client")
      }, 2000)
    }
  }

  // Organiser les disponibilités par date
  const disponibilitesByDate =
    prestation?.disponibilites.reduce(
      (acc, dispo) => {
        if (!acc[dispo.date]) {
          acc[dispo.date] = []
        }
        acc[dispo.date].push(dispo)
        return acc
      },
      {} as Record<string, typeof prestation.disponibilites>,
    ) || {}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
      </div>
    )
  }

  if (error || !prestation) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        {error || "Prestation non trouvée"}
        <div className="mt-4">
          <Link href="/dashboard/client/prestations" className="text-blue-600 hover:underline">
            Retour aux prestations
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton retour */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/client/prestations">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{prestation.titre}</h1>
      </div>

      {/* Message de succès */}
      {reservationSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-2">
          <Check className="h-5 w-5" />
          Réservation effectuée avec succès ! Redirection...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informations principales */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {typeLabels[prestation.type_service] || prestation.type_service}
              </span>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg font-medium ml-1">{prestation.note_moyenne.toFixed(1)}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{prestation.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Durée estimée</p>
                  <p className="font-medium">{prestation.duree_estimee}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Zone de service</p>
                  <p className="font-medium">{prestation.adresse || "Non spécifié"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prestataire */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">À propos du prestataire</h2>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`http://localhost:3001${prestation.prestataire.photo_profil || "/default-avatar.png"}`}
                alt={`${prestation.prestataire.prenom} ${prestation.prestataire.nom}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {prestation.prestataire.prenom} {prestation.prestataire.nom}
                </h3>
                <Link
                  href={`/dashboard/client/profil-prestataire/${prestation.prestataire.id}`}
                  className="text-blue-600 hover:underline text-sm flex items-center"
                >
                  Voir le profil <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {prestation.prestataire.bio && (
              <div className="mb-4">
                <p className="text-gray-700">{prestation.prestataire.bio}</p>
              </div>
            )}

            {prestation.prestataire.competences && prestation.prestataire.competences.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Compétences</h4>
                <div className="flex flex-wrap gap-2">
                  {prestation.prestataire.competences.map((comp, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {prestation.prestataire.certifications && prestation.prestataire.certifications.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {prestation.prestataire.certifications.map((cert, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avis */}
          {prestation.avis && prestation.avis.length > 0 && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Avis clients</h2>
              <div className="space-y-4">
                {prestation.avis.map((avis) => (
                  <div key={avis.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-gray-500" />
                        <span className="font-medium">
                          {avis.utilisateur.prenom} {avis.utilisateur.nom}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < avis.note ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{avis.commentaire}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(avis.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Colonne de réservation */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Réserver cette prestation</h2>
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#0070C0]">{prestation.tarif} €</p>
              <p className="text-gray-500 text-sm">Prix pour {prestation.duree_estimee}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" /> Sélectionnez une date
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(disponibilitesByDate).map((date) => (
                  <button
                    key={date}
                    className={`p-2 border rounded-lg text-center ${
                      selectedDate === date ? "bg-blue-100 border-blue-500 text-blue-800" : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedHeure(null) // Réinitialiser l'heure sélectionnée
                    }}
                  >
                    {new Date(date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" /> Sélectionnez une heure
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {disponibilitesByDate[selectedDate].map((dispo) => (
                    <button
                      key={dispo.id}
                      className={`p-2 border rounded-lg text-center ${
                        selectedHeure === `${dispo.heure_debut}-${dispo.heure_fin}`
                          ? "bg-blue-100 border-blue-500 text-blue-800"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedHeure(`${dispo.heure_debut}-${dispo.heure_fin}`)}
                    >
                      {dispo.heure_debut} - {dispo.heure_fin}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleReservation}
              disabled={!selectedDate || !selectedHeure || reservationSuccess}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                !selectedDate || !selectedHeure || reservationSuccess
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#0070C0] text-white hover:bg-blue-700"
              }`}
            >
              {reservationSuccess ? (
                <>
                  <Check className="w-5 h-5" /> Réservé
                </>
              ) : (
                <>
                  <CalendarClock className="w-5 h-5" /> Réserver
                </>
              )}
            </button>

            <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Annulation gratuite jusqu'à 24h avant la prestation
            </div>

            <div className="mt-4 border-t pt-4">
              <Link
                href={`/dashboard/client/chat/${prestation.prestataire.id}`}
                className="text-blue-600 hover:underline flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Contacter le prestataire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
