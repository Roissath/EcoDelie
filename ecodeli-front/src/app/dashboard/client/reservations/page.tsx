"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Package, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"

interface Box {
  id: number
  reference: string
  taille: string
  prix_mensuel: number
  description: string
  dimensions: string
  entrepot: {
    id: number
    nom: string
    adresse: string
    ville: string
    code_postal: string
  }
}

export default function ReserverBoxPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const boxId = searchParams.get("box")

  const [boxes, setBoxes] = useState<Box[]>([])
  const [selectedBox, setSelectedBox] = useState<Box | null>(null)
  const [dateDebut, setDateDebut] = useState("")
  const [dateFin, setDateFin] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await fetch("http://localhost:3001/stockage/box-disponibles", {
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Erreur lors du chargement")
        }

        const data = await response.json()
        setBoxes(data)

        // Si un ID de box est spécifié, la sélectionner
        if (boxId) {
          const box = data.find((b: Box) => b.id === Number.parseInt(boxId))
          if (box) setSelectedBox(box)
        }
      } catch (error) {
        console.error("Erreur:", error)
        // Données de test
        const testBoxes = [
          {
            id: 103,
            reference: "BOX-P-103",
            taille: "Petit (1m²)",
            prix_mensuel: 75,
            description: "Parfait pour quelques cartons ou objets personnels",
            dimensions: "1m x 1m x 2.5m",
            entrepot: {
              id: 1,
              nom: "Entrepôt Paris Centre",
              adresse: "110 rue de Flandre",
              ville: "Paris",
              code_postal: "75019",
            },
          },
          {
            id: 104,
            reference: "BOX-M-104",
            taille: "Moyen (2m²)",
            prix_mensuel: 120,
            description: "Idéal pour du mobilier ou plusieurs cartons",
            dimensions: "2m x 1m x 2.5m",
            entrepot: {
              id: 1,
              nom: "Entrepôt Paris Centre",
              adresse: "110 rue de Flandre",
              ville: "Paris",
              code_postal: "75019",
            },
          },
          {
            id: 105,
            reference: "BOX-G-105",
            taille: "Grand (4m²)",
            prix_mensuel: 200,
            description: "Pour de gros volumes ou du mobilier encombrant",
            dimensions: "2m x 2m x 2.5m",
            entrepot: {
              id: 3,
              nom: "Entrepôt Marseille",
              adresse: "25 avenue du Prado",
              ville: "Marseille",
              code_postal: "13008",
            },
          },
        ]
        setBoxes(testBoxes)

        if (boxId) {
          const box = testBoxes.find((b) => b.id === Number.parseInt(boxId))
          if (box) setSelectedBox(box)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBoxes()
  }, [boxId])

  const calculateTotal = () => {
    if (!selectedBox || !dateDebut || !dateFin) return 0

    const debut = new Date(dateDebut)
    const fin = new Date(dateFin)
    const diffTime = Math.abs(fin.getTime() - debut.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const months = Math.ceil(diffDays / 30)

    return selectedBox.prix_mensuel * months
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBox || !dateDebut || !dateFin) return

    setSubmitting(true)
    try {
      const response = await fetch("http://localhost:3001/stockage/reserver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          box_id: selectedBox.id,
          date_debut: dateDebut,
          date_fin: dateFin,
          montant_total: calculateTotal(),
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la réservation")
      }

      // Rediriger vers la page de paiement ou de confirmation
      router.push("/dashboard/client/stockage?success=reservation")
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de la réservation. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/client/stockage">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Réserver une box</h1>
          <p className="text-gray-600">Choisissez votre box de stockage temporaire</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sélection de la box */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Choisir une box</h2>
          <div className="space-y-4">
            {boxes.map((box) => (
              <div
                key={box.id}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  selectedBox?.id === box.id ? "border-[#0070C0] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedBox(box)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{box.taille}</h3>
                    <p className="text-sm text-gray-600">{box.description}</p>
                  </div>
                  <span className="text-lg font-bold text-[#0070C0]">{box.prix_mensuel} €/mois</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>{box.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{box.entrepot.ville}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {box.entrepot.nom} - {box.entrepot.adresse}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire de réservation */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Détails de la réservation</h2>

          {selectedBox ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Box sélectionnée</h3>
                <p className="text-sm text-gray-600">{selectedBox.taille}</p>
                <p className="text-sm text-gray-500">{selectedBox.entrepot.nom}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
                  <input
                    type="date"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070C0] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                  <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    min={dateDebut || new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070C0] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {dateDebut && dateFin && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Total à payer</span>
                    <span className="text-xl font-bold text-[#0070C0]">{calculateTotal()} €</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Durée estimée:{" "}
                    {Math.ceil(
                      Math.abs(new Date(dateFin).getTime() - new Date(dateDebut).getTime()) / (1000 * 60 * 60 * 24),
                    )}{" "}
                    jours
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!dateDebut || !dateFin || submitting}
                className="w-full bg-[#0070C0] text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Réservation en cours...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Réserver et payer
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Sélectionnez une box pour continuer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
