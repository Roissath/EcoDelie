'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProfilLivreurPage() {
  const [form, setForm] = useState({
    photo: '',
    type_permis: '',
    zones_livraison: '',
    type_transport: '',
    moyen_paiement: '',
    statut: '',
    appreciation: '',
    regions_livraison: '',
    villes_livraison: '',
    verifie: false,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/info-livreur/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setForm(data)
        setPhotoPreview(data.photo || null)
      })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const isCheckbox = type === 'checkbox'
    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox && e.target instanceof HTMLInputElement ? e.target.checked : value,
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setForm(prev => ({ ...prev, photo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3001/info-livreur/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    })
    if (res.ok) {
      alert('Profil mis à jour !')
    } else {
      alert("Erreur lors de la mise à jour")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#0070C0] mb-8">Mon profil livreur</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <div className="flex flex-col items-center gap-4">
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Photo de profil"
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              Aucun fichier
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="type_permis" placeholder="Type de permis" className="border p-2 rounded text-gray-800" value={form.type_permis} onChange={handleChange} />
          <input name="zones_livraison" placeholder="Zones générales de livraison" className="border p-2 rounded text-gray-800" value={form.zones_livraison} onChange={handleChange} />
          <input name="type_transport" placeholder="Type de transport (voiture, vélo...)" className="border p-2 rounded text-gray-800" value={form.type_transport} onChange={handleChange} />
          <input name="moyen_paiement" placeholder="Moyen de paiement" className="border p-2 rounded text-gray-800" value={form.moyen_paiement} onChange={handleChange} />
          <input name="statut" placeholder="Statut (en attente, validé...)" className="border p-2 rounded text-gray-800" value={form.statut} onChange={handleChange} disabled />
          <input name="regions_livraison" placeholder="Régions couvertes" className="border p-2 rounded text-gray-800" value={form.regions_livraison} onChange={handleChange} />
          <input name="villes_livraison" placeholder="Villes de livraison" className="border p-2 rounded text-gray-800" value={form.villes_livraison} onChange={handleChange} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Appréciation</label>
          <textarea name="appreciation" value={form.appreciation} onChange={handleChange} className="border p-2 rounded w-full text-gray-800" rows={3} />
        </div>

        <div className="bg-gray-50 p-3 rounded-md border text-sm">
          Statut de vérification :{' '}
          {form.verifie ? (
            <span className="text-green-600 font-semibold">✅ Validé</span>
          ) : (
            <span className="text-red-600 font-semibold">⏳ En attente</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#0070C0] text-white py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  )
}