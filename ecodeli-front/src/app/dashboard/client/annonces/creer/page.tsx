"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreerAnnonceClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<"livraison" | "course">("livraison")
  const [form, setForm] = useState({
    lieu_depart: "",
    lieu_arrivee: "",
    poids_estime: "",
    prix_livraison: "",
    colis_fragile: false,
    type_annonce: "livraison",
    magasin: "",
    liste_courses: "",
    date_course: "",
    description: "",
  })

  const handleChange = (name: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...form,
        type_annonce: type,
        poids_estime: Number.parseFloat(form.poids_estime) || 0,
        prix_livraison: Number.parseFloat(form.prix_livraison) || 0,
      }

      // Simuler l'appel API si le backend n'est pas disponible
      if (process.env.NODE_ENV === "development") {
        // Simuler un délai
        await new Promise((resolve) => setTimeout(resolve, 1000))

        alert("✅ Votre annonce a été créée avec succès !")
        router.push("/dashboard/client/annonces")
        return
      }

      const res = await fetch("http://localhost:3001/annonces-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataToSend),
      })

      if (res.ok) {
        alert("✅ Votre annonce a été créée avec succès !")
        router.push("/dashboard/client/annonces")
      } else {
        throw new Error("Erreur lors de la création")
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("❌ Une erreur est survenue lors de la création de l'annonce.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0070C0]">Créer une annonce</h1>
        <p className="text-gray-600">Publiez votre demande de livraison ou de course</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type d'annonce */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Type d'annonce</h3>
          <p className="text-gray-600 mb-4">Choisissez le type de service dont vous avez besoin</p>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "livraison" | "course")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
          >
            <option value="livraison">Livraison de colis</option>
            <option value="course">Course à faire</option>
          </select>
        </div>

        {/* Informations générales */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Informations générales</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de départ *</label>
                <input
                  type="text"
                  value={form.lieu_depart}
                  onChange={(e) => handleChange("lieu_depart", e.target.value)}
                  placeholder="Adresse de départ"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu d'arrivée *</label>
                <input
                  type="text"
                  value={form.lieu_arrivee}
                  onChange={(e) => handleChange("lieu_arrivee", e.target.value)}
                  placeholder="Adresse d'arrivée"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids estimé (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.poids_estime}
                  onChange={(e) => handleChange("poids_estime", e.target.value)}
                  placeholder="0.0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prix proposé (€) *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.prix_livraison}
                  onChange={(e) => handleChange("prix_livraison", e.target.value)}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="colis_fragile"
                checked={form.colis_fragile}
                onChange={(e) => handleChange("colis_fragile", e.target.checked)}
                className="rounded border-gray-300 text-[#0070C0] focus:ring-[#0070C0]"
              />
              <label htmlFor="colis_fragile" className="text-sm font-medium text-gray-700">
                Colis fragile
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Décrivez votre demande en détail..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
              />
            </div>
          </div>
        </div>

        {/* Informations pour la course */}
        {type === "course" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Informations pour la course</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Magasin</label>
                <input
                  type="text"
                  value={form.magasin}
                  onChange={(e) => handleChange("magasin", e.target.value)}
                  placeholder="Ex: Carrefour, Auchan..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Liste des courses</label>
                <textarea
                  value={form.liste_courses}
                  onChange={(e) => handleChange("liste_courses", e.target.value)}
                  placeholder="Listez les articles à acheter..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date souhaitée</label>
                <input
                  type="date"
                  value={form.date_course}
                  onChange={(e) => handleChange("date_course", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070C0]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#0070C0] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Publication..." : "Publier l'annonce"}
          </button>
        </div>
      </form>
    </div>
  )
}
