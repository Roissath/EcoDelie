'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, MapPin, Smartphone, Globe, ShieldCheck, Trash } from 'lucide-react'

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse: string
  age: number
  datdenaissance: string
  langue_utilise?: string
  type_abonnement?: string
  statut?: string
}

export default function ProfilClientPage() {
  const [user, setUser] = useState<Utilisateur | null>(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSave = () => {
    fetch(`http://localhost:3001/utilisateur/${user?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    }).then(() => alert('Informations mises à jour'))
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }
    const res = await fetch('http://localhost:3001/auth/change-password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ oldPassword, newPassword })
    })
    if (res.ok) {
      alert('Mot de passe mis à jour')
      setShowPasswordForm(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      alert('Erreur : vérifie l’ancien mot de passe')
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Es-tu sûr de vouloir supprimer ton compte ?')) return
    const res = await fetch('http://localhost:3001/utilisateur/me', {
      method: 'DELETE',
      credentials: 'include'
    })
    if (res.ok) {
      alert('Compte supprimé')
      router.push('/')
    } else {
      alert('Erreur lors de la suppression')
    }
  }

  if (!user) return <div className="flex justify-center items-center h-[50vh] text-gray-500">Chargement du profil...</div>

  return (
    <div className="bg-[#FAFAFA] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-[#0070C0] border-b pb-4">Mon espace personnel</h1>

          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField icon={<User />} label="Nom complet" value={`${user.prenom} ${user.nom}`} readOnly />
            <InputField icon={<Mail />} label="Email" value={user.email} readOnly />
            <InputField icon={<Smartphone />} label="Téléphone" name="telephone" value={user.telephone} onChange={handleInputChange} />
            <InputField icon={<MapPin />} label="Adresse" name="adresse" value={user.adresse} onChange={handleInputChange} />
            <InputField icon={<Globe />} label="Langue utilisée" name="langue_utilise" value={user.langue_utilise || ''} onChange={handleInputChange} />
            <InputField icon={<ShieldCheck />} label="Abonnement" value={user.type_abonnement || 'Standard'} readOnly />
          </div>

          <button onClick={handleSave} className="bg-[#0070C0] text-white py-2 px-6 rounded-xl hover:bg-blue-800 transition mt-4">
            Enregistrer les modifications
          </button>

          {/* Mot de passe */}
          <div className="pt-10 border-t">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Sécurité</h2>
            {showPasswordForm ? (
              <form onSubmit={handlePasswordChange} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Ancien mot de passe" className="w-full border p-2 rounded-lg" />
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nouveau mot de passe" className="w-full border p-2 rounded-lg" />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" className="w-full border p-2 rounded-lg" />
                <button type="submit" className="col-span-1 md:col-span-3 bg-green-600 text-white py-2 px-4 rounded-xl">Mettre à jour</button>
              </form>
            ) : (
              <button onClick={() => setShowPasswordForm(true)} className="text-blue-600 underline">
                Changer mon mot de passe
              </button>
            )}
          </div>

          {/* Suppression compte */}
          <div className="pt-10 border-t">
            <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-gray-600 text-sm mb-2">Supprimer définitivement mon compte utilisateur.</p>
            <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-xl">Supprimer mon compte</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InputField({ icon, label, value, name, onChange, readOnly = false }: {
  icon: React.ReactNode,
  label: string,
  value: string,
  name?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  readOnly?: boolean
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#0070C0] mt-1">{icon}</span>
      <div className="w-full">
        <p className="text-sm text-gray-500">{label}</p>
        <input
          readOnly={readOnly}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full border p-2 rounded-lg ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  )
}
