'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function ModifierAnnonceClientPage() {
  const { id } = useParams()
  const router = useRouter()
  const [form, setForm] = useState({
    lieu_depart: '',
    lieu_arrivee: '',
    poids_estime: 0,
    prix_livraison: 0,
    colis_fragile: false,
    magasin: '',
    liste_courses: '',
    date_course: '',
    type_annonce: 'livraison'
  })

  useEffect(() => {
    if (!id) return
    fetch(`http://localhost:3001/annonces-client/${id}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setForm(data))
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    setForm(prev => ({
      ...prev,
      [name]: isCheckbox && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3001/annonces-client/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    })
    if (res.ok) {
      alert('Annonce modifiée avec succès.')
      router.push('/dashboard/client/annonces')
    } else {
      alert("Erreur lors de la modification")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0070C0] mb-6 text-center">Modifier une annonce</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="font-semibold">Type d'annonce :</label>
          <select
            name="type_annonce"
            value={form.type_annonce}
            onChange={(e) => setForm({ ...form, type_annonce: e.target.value })}
            className="block mt-1 p-2 border rounded w-full"
          >
            <option value="livraison">Livraison</option>
            <option value="course">Course</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <input className="border p-2 rounded" name="lieu_depart" value={form.lieu_depart} onChange={handleChange} placeholder="Lieu de départ" required />
          <input className="border p-2 rounded" name="lieu_arrivee" value={form.lieu_arrivee} onChange={handleChange} placeholder="Lieu d'arrivée" required />
          <input className="border p-2 rounded" name="poids_estime" type="number" value={form.poids_estime} onChange={handleChange} placeholder="Poids estimé (kg)" required />
          <input className="border p-2 rounded" name="prix_livraison" type="number" value={form.prix_livraison} onChange={handleChange} placeholder="Prix (€)" required />

          <div className="flex items-center gap-2 col-span-full">
            <input type="checkbox" name="colis_fragile" checked={form.colis_fragile} onChange={handleChange} />
            <label>Colis fragile</label>
          </div>
        </div>

        {form.type_annonce === 'course' && (
          <div className="space-y-4">
            <input name="magasin" className="border p-2 w-full rounded" placeholder="Magasin" value={form.magasin} onChange={handleChange} />
            <textarea name="liste_courses" className="border p-2 w-full rounded" placeholder="Liste des courses" rows={3} value={form.liste_courses} onChange={handleChange} />
            <input name="date_course" type="date" className="border p-2 w-full rounded" value={form.date_course} onChange={handleChange} />
          </div>
        )}

        <button type="submit" className="w-full bg-[#0070C0] text-white py-2 rounded-xl hover:bg-blue-800 transition">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}
