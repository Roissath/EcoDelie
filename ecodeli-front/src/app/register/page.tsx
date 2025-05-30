'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', mot_de_passe: '', adresse: '', telephone: '', login: '', datdenaissance: '', age: '', langue_utilise: 'fr', type: ''
  })
  const [docs, setDocs] = useState<FileList | null>(null)
  const [typeFields, setTypeFields] = useState<any>({})
  const [error, setError] = useState('')
  const router = useRouter()
  const [fileNames, setFileNames] = useState<string[]>([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    const today = new Date()
    const age = today.getFullYear() - date.getFullYear()
    setForm({ ...form, datdenaissance: e.target.value, age: age.toString() })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setDocs(files)
    if (files) {
      const names = Array.from(files).map(f => f.name)
      setFileNames(names)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const payload = {
        ...form,
        ...typeFields,
        age: Number(form.age),
        datdenaissance: new Date(form.datdenaissance).toISOString()
      }

      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (!res.ok) return setError(data.message || 'Erreur lors de l’inscription.')

      if (docs && data.user?.id) {
        for (const doc of Array.from(docs)) {
          const formData = new FormData()
          formData.append('file', doc)
          formData.append('utilisateurId', data.user.id)
          formData.append('type_document', 'justificatif')
          await fetch('http://localhost:3001/document/upload', {
            method: 'POST',
            body: formData
          })
        }
      }

      router.push('/confirmation')
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue.")
    }
  }

  const renderInput = (label: string, name: string, type = 'text', required = true) => (
    <div>
      <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={(form as any)[name]}
        onChange={handleInput}
        required={required}
        className="w-full p-3 bg-gray-100 rounded-xl text-black"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl space-y-6">
        <div className="flex justify-center">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={80} height={80} />
        </div>

        <h1 className="text-center text-2xl font-extrabold text-[#0070C0]">Inscription à EcoDeli</h1>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInput('Nom', 'nom')}
          {renderInput('Prénom', 'prenom')}
          {renderInput('Adresse email', 'email', 'email')}
          {renderInput('Mot de passe', 'mot_de_passe', 'password')}
          {renderInput('Adresse postale', 'adresse')}
          {renderInput('Téléphone', 'telephone')}
          {renderInput('Nom d’utilisateur (login)', 'login')}

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Date de naissance</label>
            <input
              type="date"
              name="datdenaissance"
              value={form.datdenaissance}
              onChange={handleDateChange}
              required
              className="w-full p-3 bg-gray-100 rounded-xl text-black"
            />
          </div>

          {renderInput('Langue utilisée', 'langue_utilise')}

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">Rôle</label>
            <select name="type" value={form.type} onChange={(e) => {
              handleInput(e)
              setTypeFields({})
            }} className="w-full p-3 bg-gray-100 rounded-xl text-black" required>
              <option value="">Choisir un rôle</option>
              <option value="client">Client</option>
              <option value="livreur">Livreur</option>
              <option value="prestataire">Prestataire</option>
              <option value="commercant">Commerçant</option>
            </select>
          </div>

          {form.type === 'livreur' && (
            <>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Type de permis</label>
                <select onChange={e => setTypeFields({ ...typeFields, type_permis: e.target.value })} className="w-full p-3 bg-gray-100 rounded-xl text-black">
                  <option value="">Choisir</option>
                  <option value="A">Permis A (moto)</option>
                  <option value="B">Permis B (voiture)</option>
                  <option value="C">Permis C (poids lourds)</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Type de transport</label>
                <select onChange={e => setTypeFields({ ...typeFields, type_transport: e.target.value })} className="w-full p-3 bg-gray-100 rounded-xl text-black">
                  <option value="">Choisir</option>
                  <option value="voiture">Voiture</option>
                  <option value="moto">Moto</option>
                  <option value="commun">Transport en commun</option>
                  <option value="pied">À pied</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Moyen de paiement</label>
                <select onChange={e => setTypeFields({ ...typeFields, moyen_paiement: e.target.value })} className="w-full p-3 bg-gray-100 rounded-xl text-black">
                  <option value="">Choisir</option>
                  <option value="carte">Carte bancaire</option>
                  <option value="espece">Espèces</option>
                </select>
                <label className="block mb-1 text-sm font-semibold text-gray-700">Zone de livraison</label>

                <select onChange={e => setTypeFields({ ...typeFields, zones_livraison: e.target.value })} className="w-full p-3 bg-gray-100 rounded-xl text-black">
                  <option value="">Choisir</option>
                  <option value="Paris">Paris</option>
                  <option value="Île-de-France">Île-de-France</option>
                  <option value="National">Toute la France</option>
                </select>

              </div>
              <input type="file" multiple onChange={handleFileUpload} />
              <ul className="text-xs text-gray-600 mt-1">
                {fileNames.map(name => <li key={name}>📄 {name}</li>)}
              </ul>
            </>
          )}

          {form.type === 'prestataire' && (
            <>
              {renderInput('Types de services', 'types_services')}
              <input type="file" multiple onChange={handleFileUpload} />
              <ul className="text-xs text-gray-600 mt-1">
                {fileNames.map(name => <li key={name}>📄 {name}</li>)}
              </ul>
            </>
          )}

          {form.type === 'commercant' && (
            <>
              <input type="file" multiple onChange={handleFileUpload} />
              <ul className="text-xs text-gray-600 mt-1">
                {fileNames.map(name => <li key={name}>📄 {name}</li>)}
              </ul>
            </>
          )}

          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  )
}