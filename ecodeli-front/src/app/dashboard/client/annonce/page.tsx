'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreerAnnonceClientPage() {
  const router = useRouter()

  const [type, setType] = useState<'livraison' | 'course'>('livraison')
  const [form, setForm] = useState({
    lieu_depart: '',
    lieu_arrivee: '',
    poids_estime: 0,
    prix_livraison: 0,
    colis_fragile: false,
    type_annonce: 'livraison',
    magasin: '',
    liste_courses: '',
    date_course: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
  
    setForm(prev => ({
      ...prev,
      [name]: isCheckbox && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value,
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dataToSend = {
      ...form,
      type_annonce: type,
      poids_estime: parseFloat(form.poids_estime.toString()),
      prix_livraison: parseFloat(form.prix_livraison.toString()),
      utilisateurId: 1 // à remplacer dynamiquement avec le vrai ID
    }

    const res = await fetch('http://localhost:3001/annonces-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dataToSend)
    })

    if (res.ok) {
      alert('Annonce créée avec succès !')
      router.push('/dashboard/client') // ou redirection vers la liste des annonces
    } else {
      alert('Erreur lors de la création de l’annonce.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0070C0] mb-6 text-center">Créer une annonce</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Type d'annonce */}
        <div>
          <label className="font-semibold">Type d'annonce :</label>
          <select
            name="type_annonce"
            value={type}
            onChange={(e) => setType(e.target.value as 'livraison' | 'course')}
            className="block mt-1 p-2 border rounded w-full"
          >
            <option value="livraison">Livraison</option>
            <option value="course">Course</option>
          </select>
        </div>

        {/* Champs communs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block">Lieu de départ</label>
            <input
              name="lieu_depart"
              type="text"
              required
              value={form.lieu_depart}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block">Lieu d’arrivée</label>
            <input
              name="lieu_arrivee"
              type="text"
              required
              value={form.lieu_arrivee}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block">Poids estimé (kg)</label>
            <input
              name="poids_estime"
              type="number"
              min={0}
              required
              value={form.poids_estime}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block">Prix souhaité (€)</label>
            <input
              name="prix_livraison"
              type="number"
              min={0}
              required
              value={form.prix_livraison}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="flex items-center gap-2 col-span-full mt-2">
            <input
              type="checkbox"
              name="colis_fragile"
              checked={form.colis_fragile}
              onChange={handleChange}
            />
            <label>Colis fragile</label>
          </div>
        </div>

        {/* Si type = course */}
        {type === 'course' && (
          <div className="space-y-4">
            <div>
              <label className="block">Magasin (ex : Carrefour, Auchan...)</label>
              <input
                name="magasin"
                type="text"
                value={form.magasin}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block">Liste des courses</label>
              <textarea
                name="liste_courses"
                value={form.liste_courses}
                onChange={handleChange}
                rows={3}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block">Date souhaitée</label>
              <input
                name="date_course"
                type="date"
                value={form.date_course}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        )}

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-[#0070C0] text-white py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Publier l’annonce
        </button>
      </form>
    </div>
  )
}
