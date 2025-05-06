'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [mot_de_passe, setMotDePasse] = useState('')
  const [adresse, setAdresse] = useState('')
  const [telephone, setTelephone] = useState('')
  const [login, setLogin] = useState('')
  const [datdenaissance, setDatDeNaissance] = useState('')
  const [age, setAge] = useState<number | ''>('')
  const [langue_utilise, setLangueUtilise] = useState('fr')
  const [type, setType] = useState('')

  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          mot_de_passe,
          adresse,
          telephone,
          login,
          datdenaissance,
          age: age ? Number(age) : undefined,
          langue_utilise,
          type
        }),
      })

      const data = await res.json()

      if (res.ok) {
        switch (type) {
          case 'client':
            router.push('/dashboard/client')
            break
          case 'livreur':
            router.push('/dashboard/livreur')
            break
          case 'prestataire':
            router.push('/dashboard/prestataire')
            break
          case 'commercant':
            router.push('/dashboard/commercant')
            break
          default:
            router.push('/')
        }
        router.push('/login')
      } else {
        setError(data.message || 'Erreur lors de l’inscription.')
      }
    } catch (err) {
      console.error(err)
      setError("Une erreur est survenue lors de l'inscription.")
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={80} height={80} />
        </div>

        <h1 className="text-center text-2xl font-extrabold text-[#0070C0]">Inscription à EcoDeli</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="email" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="password" placeholder="Mot de passe" value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="text" placeholder="Adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="text" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="text" placeholder="Nom d'utilisateur (login)" value={login} onChange={(e) => setLogin(e.target.value)} required className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="date" placeholder="Date de naissance" value={datdenaissance} onChange={(e) => setDatDeNaissance(e.target.value)} className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} className="w-full p-3 bg-gray-100 rounded-xl text-black" />
          <input type="text" placeholder="Langue (ex: fr)" value={langue_utilise} onChange={(e) => setLangueUtilise(e.target.value)} className="w-full p-3 bg-gray-100 rounded-xl text-black" />

          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 bg-gray-100 rounded-xl text-black">
            <option value="client">Client</option>
            <option value="livreur">Livreur</option>
            <option value="prestataire">Prestataire</option>
            <option value="commercant">Commerçant</option>
          </select>

          <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  )
}
