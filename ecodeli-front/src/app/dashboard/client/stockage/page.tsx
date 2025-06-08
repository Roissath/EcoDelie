"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Plus, CheckCircle, Package, LucideBox } from "lucide-react"

interface IBox {
  id: number
  reference: string
  taille: string
  prix_mensuel: number
  statut: "disponible" | "reserve" | "occupe"
  entrepot: {
    id: number
    nom: string
    adresse: string
    ville: string
  }
}

interface Location {
  id: number
  date_debut: string
  date_fin: string
  montant_total: number
  statut: "active" | "terminee" | "annulee"
  box: IBox
  colis?: {
    id: number
    descriptif: string
    dimension: string
    photo?: string
  }[]
}

export default function StockagePage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [boxDisponibles, setBoxDisponibles] = useState<IBox[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Récupérer les locations de l'utilisateur
        const locationsResponse = await fetch("http://localhost:3001/stockage/locations", {
          credentials: "include",
        })

        // Récupérer les box disponibles
        const boxResponse = await fetch("http://localhost:3001/stockage/box-disponibles", {
          credentials: "include",
        })

        if (!locationsResponse.ok || !boxResponse.ok) {
          throw new Error("Erreur lors du chargement des données")
        }

        const locationsData = await locationsResponse.json()
        const boxData = await boxResponse.json()

        setLocations(locationsData)
        setBoxDisponibles(boxData)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de charger les données de stockage")

        // Données de test pour le développement
        setLocations([
          {
            id: 1,
            date_debut: "2025-05-01",
            date_fin: "2025-06-01",
            montant_total: 75,
            statut: "active",
            box: {
              id: 101,
              reference: "BOX-P-101",
              taille: "Petit (1m²)",
              prix_mensuel: 75,
              statut: "occupe",
              entrepot: {
                id: 1,
                nom: "Entrepôt Paris Centre",
                adresse: "110 rue de Flandre",
                ville: "Paris",
              },
            },
            colis: [
              {
                id: 201,
                descriptif: "Cartons de livres",
                dimension: "50x40x30cm",
              },
              {
                id: 202,
                descriptif: "Vêtements d'hiver",
                dimension: "60x40x30cm",
              },
            ],
          },
          {
            id: 2,
            date_debut: "2025-04-15",
            date_fin: "2025-05-15",
            montant_total: 120,
            statut: "terminee",
            box: {
              id: 102,
              reference: "BOX-M-102",
              taille: "Moyen (2m²)",
              prix_mensuel: 120,
              statut: "disponible",
              entrepot: {
                id: 2,
                nom: "Entrepôt Lyon",
                adresse: "15 rue de la République",
                ville: "Lyon",
              },
            },
          },
        ])

        setBoxDisponibles([
          {
            id: 103,
            reference: "BOX-P-103",
            taille: "Petit (1m²)",
            prix_mensuel: 75,
            statut: "disponible",
            entrepot: {
              id: 1,
              nom: "Entrepôt Paris Centre",
              adresse: "110 rue de Flandre",
              ville: "Paris",
            },
          },
          {
            id: 104,
            reference: "BOX-M-104",
            taille: "Moyen (2m²)",
            prix_mensuel: 120,
            statut: "disponible",
            entrepot: {
              id: 1,
              nom: "Entrepôt Paris Centre",
              adresse: "110 rue de Flandre",
              ville: "Paris",
            },
          },
          {
            id: 105,
            reference: "BOX-G-105",
            taille: "Grand (4m²)",
            prix_mensuel: 200,
            statut: "disponible",
            entrepot: {
              id: 3,
              nom: "Entrepôt Marseille",
              adresse: "25 avenue du Prado",
              ville: "Marseille",
            },
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrer les locations actives et terminées
  const locationsActives = locations.filter((loc) => loc.statut === "active")
  const locationsTerminees = locations.filter((loc) => loc.statut !== "active")

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Stockage temporaire</h1>
        <p className="text-gray-600">Gérez vos box de stockage pour vos colis</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>}

      {/* Locations actives */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Mes box actives</h2>
          <Link href="/dashboard/client/stockage/reserver">
            <button className="bg-[#0070C0] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              Réserver une box
            </button>
          </Link>
        </div>

        {locationsActives.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <LucideBox className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Aucune box active</h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas de box de stockage active actuellement. Réservez une box pour stocker vos colis.
            </p>
            <Link href="/dashboard/client/stockage/reserver">
              <button className="bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Réserver une box
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {locationsActives.map((location) => (
              <div key={location.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Box {location.box.reference} - {location.box.taille}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-sm text-gray-500">Période</span>
                            <p className="text-gray-700">
                              {new Date(location.date_debut).toLocaleDateString()} au{" "}
                              {new Date(location.date_fin).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <div>
                            <span className="text-sm text-gray-500">Entrepôt</span>
                            <p className="text-gray-700">
                              {location.box.entrepot.nom}, {location.box.entrepot.ville}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="font-medium text-[#0070C0]">{location.box.prix_mensuel} € / mois</p>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/dashboard/client/stockage/${location.id}`}>
                        <button className="px-4 py-2 bg-[#0070C0] text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                          Détails
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Liste des colis si disponible */}
                {location.colis && location.colis.length > 0 && (
                  <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Colis stockés ({location.colis.length})
                    </h4>
                    <div className="space-y-2">
                      {location.colis.map((colis) => (
                        <div key={colis.id} className="flex items-center justify-between bg-white p-2 rounded border">
                          <div>
                            <p className="font-medium text-sm">{colis.descriptif}</p>
                            <p className="text-xs text-gray-500">Dimensions: {colis.dimension}</p>
                          </div>
                          <Link href={`/dashboard/client/stockage/colis/${colis.id}`}>
                            <button className="text-xs text-blue-600 hover:underline">Détails</button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Box disponibles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Box disponibles</h2>
        {boxDisponibles.length === 0 ? (
          <p className="text-gray-600 bg-white p-4 rounded-lg">Aucune box disponible actuellement.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {boxDisponibles.map((box) => (
              <div key={box.id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{box.taille}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Disponible</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  {box.entrepot.nom}, {box.entrepot.ville}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#0070C0]">{box.prix_mensuel} €/mois</span>
                  <Link href={`/dashboard/client/stockage/reserver?box=${box.id}`}>
                    <button className="px-3 py-2 bg-[#0070C0] text-white rounded-lg text-sm hover:bg-blue-700 transition">
                      Réserver
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historique des locations */}
      {locationsTerminees.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique</h2>
          <div className="space-y-4">
            {locationsTerminees.map((location) => (
              <div key={location.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Box {location.box.reference} - {location.box.taille}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(location.date_debut).toLocaleDateString()} au{" "}
                      {new Date(location.date_fin).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {location.box.entrepot.nom}, {location.box.entrepot.ville}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        location.statut === "terminee" ? "bg-gray-100 text-gray-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {location.statut === "terminee" ? "Terminée" : "Annulée"}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">Total: {location.montant_total} €</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
