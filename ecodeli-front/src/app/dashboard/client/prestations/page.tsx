"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Filter, Clock, Star } from "lucide-react"

interface Prestation {
  id: number
  titre: string
  description: string
  type_service: string
  tarif: number
  duree_estimee: string
  note_moyenne: number
  prestataire: {
    id: number
    nom: string
    prenom: string
    photo_profil?: string
  }
  disponibilites?: {
    date: string
    heure_debut: string
    heure_fin: string
  }[]
}

export default function PrestationsPage() {
  const [prestations, setPrestations] = useState<Prestation[]>([])
  const [filteredPrestations, setFilteredPrestations] = useState<Prestation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("tous")
  const [error, setError] = useState<string | null>(null)

  const typeServices = [
    "tous",
    "transport",
    "courses",
    "aide_domicile",
    "garde_animaux",
    "jardinage",
    "bricolage",
    "autre",
  ]

  const typeLabels: Record<string, string> = {
    tous: "Tous les services",
    transport: "Transport de personnes",
    courses: "Courses et achats",
    aide_domicile: "Aide à domicile",
    garde_animaux: "Garde d'animaux",
    jardinage: "Jardinage",
    bricolage: "Bricolage",
    autre: "Autres services",
  }

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/prestations", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error(`Erreur lors du chargement des prestations: ${response.status}`)
        }

        const data = await response.json()
        setPrestations(data)
        setFilteredPrestations(data)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de charger les prestations")

        // Données de test pour le développement
        const mockPrestations = [
          {
            id: 1,
            titre: "Transport vers l'aéroport",
            description: "Transport de personnes vers l'aéroport Charles de Gaulle avec prise en charge des bagages",
            type_service: "transport",
            tarif: 45,
            duree_estimee: "1h30",
            note_moyenne: 4.8,
            prestataire: {
              id: 101,
              nom: "Dupont",
              prenom: "Jean",
              photo_profil: "/default-avatar.png",
            },
            disponibilites: [
              { date: "2025-06-10", heure_debut: "08:00", heure_fin: "18:00" },
              { date: "2025-06-11", heure_debut: "08:00", heure_fin: "18:00" },
            ],
          },
          {
            id: 2,
            titre: "Courses hebdomadaires",
            description: "Réalisation de vos courses hebdomadaires selon votre liste",
            type_service: "courses",
            tarif: 25,
            duree_estimee: "2h",
            note_moyenne: 4.5,
            prestataire: {
              id: 102,
              nom: "Martin",
              prenom: "Sophie",
              photo_profil: "/default-avatar.png",
            },
          },
          {
            id: 3,
            titre: "Garde de chat à domicile",
            description: "Visite quotidienne pour nourrir et s'occuper de votre chat pendant votre absence",
            type_service: "garde_animaux",
            tarif: 20,
            duree_estimee: "30min",
            note_moyenne: 4.9,
            prestataire: {
              id: 103,
              nom: "Petit",
              prenom: "Marie",
              photo_profil: "/default-avatar.png",
            },
          },
          {
            id: 4,
            titre: "Tonte de pelouse",
            description: "Tonte de pelouse et entretien de jardin",
            type_service: "jardinage",
            tarif: 35,
            duree_estimee: "2h",
            note_moyenne: 4.2,
            prestataire: {
              id: 104,
              nom: "Dubois",
              prenom: "Pierre",
              photo_profil: "/default-avatar.png",
            },
          },
        ]
        setPrestations(mockPrestations)
        setFilteredPrestations(mockPrestations)
      } finally {
        setLoading(false)
      }
    }

    fetchPrestations()
  }, [])

  useEffect(() => {
    // Filtrer les prestations selon le terme de recherche et le type sélectionné
    let filtered = prestations

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.prestataire.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.prestataire.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "tous") {
      filtered = filtered.filter((p) => p.type_service === selectedType)
    }

    setFilteredPrestations(filtered)
  }, [searchTerm, selectedType, prestations])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Services disponibles</h1>
        <p className="text-gray-600">Découvrez et réservez des services à la personne</p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher un service..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {typeServices.map((type) => (
                <option key={type} value={type}>
                  {typeLabels[type]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des prestations */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>
      ) : filteredPrestations.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-600">Aucun service ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrestations.map((prestation) => (
            <Link href={`/dashboard/client/prestations/${prestation.id}`} key={prestation.id}>
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {typeLabels[prestation.type_service] || prestation.type_service}
                  </span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium ml-1">{prestation.note_moyenne.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{prestation.titre}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{prestation.description}</p>

                <div className="border-t pt-3 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Durée: {prestation.duree_estimee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={`http://localhost:3001${prestation.prestataire.photo_profil || "/default-avatar.png"}`}
                        alt={`${prestation.prestataire.prenom} ${prestation.prestataire.nom}`}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">
                        {prestation.prestataire.prenom} {prestation.prestataire.nom}
                      </span>
                    </div>
                    <span className="font-bold text-[#0070C0]">{prestation.tarif} €</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
