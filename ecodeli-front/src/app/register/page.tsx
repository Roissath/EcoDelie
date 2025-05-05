'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('❌ Les mots de passe ne correspondent pas.')
      return
    }

    try {
      const { confirmPassword, ...dataToSend } = formData // on enlève confirmPassword pour l'API

      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        alert('✅ Inscription réussie, bienvenue chez EcoDeli !')
      } else {
        alert(`Erreur ❌ : ${data.message}`)
      }
    } catch (err) {
      alert('Erreur serveur')
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl space-y-8">

        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/Logo_v2.png" alt="EcoDeli Logo" width={100} height={100} />
        </div>

        {/* Titre */}
        <h1 className="text-center text-3xl font-extrabold text-[#0070C0]">Créer votre compte EcoDeli</h1>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Infos personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
                className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Âge</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Votre âge"
              required
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Adresse email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@ecodeli.com"
              required
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 caractères"
              required
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Utilisez au moins 8 caractères, une majuscule et un chiffre.</p>
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirmer mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              required
              className="w-full p-3 bg-gray-100 rounded-xl placeholder-gray-500"
            />
          </div>

          {/* Sélection du type d'utilisateur */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Vous êtes :</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-xl text-gray-700"
              required
            >
              <option value="client">Client</option>
              <option value="livreur">Livreur</option>
              <option value="commercant">Commerçant</option>
              <option value="prestataire">Prestataire</option>
            </select>
          </div>

          {/* Bouton inscription */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
          >
            S'inscrire
          </button>

        </form>

      </div>
    </div>
  )
}
