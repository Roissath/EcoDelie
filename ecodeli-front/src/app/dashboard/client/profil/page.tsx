"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import {
  User,
  Mail,
  MapPin,
  Smartphone,
  Globe,
  ShieldCheck,
  Upload,
  CreditCard,
  Package,
  Star,
  Bell,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"

interface Utilisateur {
  id: number
  nom: string
  prenom: string
  email: string
  telephone: string
  adresse: string
  langue_utilise?: string
  photo_profil?: string
  date_creation?: string
  abonnement?: string
  statut?: string
  type: string
  preferences_notifications?: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

interface Statistiques {
  totalCommandes: number
  totalDepense: number
  annoncesActives: number
  evaluationMoyenne: number
}

export default function ProfilClientPage() {
  const [user, setUser] = useState<Utilisateur | null>(null)
  const [stats, setStats] = useState<Statistiques | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profil")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Récupération des données utilisateur...")

        // Récupérer les données utilisateur via /auth/me
        const userRes = await fetch("http://localhost:3001/auth/me", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("Réponse API:", userRes.status)

        if (!userRes.ok) {
          console.error("Erreur API:", userRes.status, userRes.statusText)
          throw new Error("Non autorisé")
        }

        const userData = await userRes.json()
        console.log("Données utilisateur reçues:", userData)

        setUser(userData)

        // Récupérer les statistiques (optionnel)
        try {
          const statsRes = await fetch(`http://localhost:3001/stats/client/${userData.id}`, {
            credentials: "include",
          })
          if (statsRes.ok) {
            const statsData = await statsRes.json()
            setStats(statsData)
          } else {
            // Fallback si l'API stats n'existe pas encore
            setStats({
              totalCommandes: 0,
              totalDepense: 0,
              annoncesActives: 0,
              evaluationMoyenne: 0,
            })
          }
        } catch (statsError) {
          console.error("Erreur stats:", statsError)
          setStats({
            totalCommandes: 0,
            totalDepense: 0,
            annoncesActives: 0,
            evaluationMoyenne: 0,
          })
        }
      } catch (error) {
        console.error("Erreur connexion:", error)
        toast.error("Erreur de connexion. Redirection...")
        setTimeout(() => router.push("/login"), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleNotificationChange = (type: "email" | "sms" | "push") => {
    if (!user) return
    setUser({
      ...user,
      preferences_notifications: {
        ...user.preferences_notifications,
        [type]: !user.preferences_notifications?.[type],
      },
    })
  }

  const handleSave = async () => {
    if (!user) return
    try {
      console.log("Sauvegarde des données:", {
        telephone: user.telephone,
        adresse: user.adresse,
        langue_utilise: user.langue_utilise,
      })

      const res = await fetch(`http://localhost:3001/utilisateurs/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          telephone: user.telephone,
          adresse: user.adresse,
          langue_utilise: user.langue_utilise,
          preferences_notifications: user.preferences_notifications,
        }),
      })

      if (res.ok) {
        toast.success("Profil mis à jour avec succès")
      } else {
        const errorData = await res.json()
        console.error("Erreur API:", errorData)
        toast.error(errorData.message || "Erreur lors de la mise à jour")
      }
    } catch (error) {
      console.error("Erreur:", error)
      toast.error("Erreur de connexion")
    }
  }

  const handleUploadPhoto = async () => {
    if (!user || !file) {
      toast.error("Veuillez sélectionner un fichier")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      console.log("Upload de la photo pour l'utilisateur:", user.id)

      const res = await fetch(`http://localhost:3001/utilisateurs/${user.id}/photo`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        console.log("Réponse upload:", data)

        setUser({ ...user, photo_profil: data.photo_profil || data.photo_url })
        toast.success("Photo mise à jour avec succès")
        setFile(null)

        // Reset le input file
        const fileInput = document.getElementById("photo-upload") as HTMLInputElement
        if (fileInput) fileInput.value = ""
      } else {
        const errorData = await res.json()
        console.error("Erreur upload:", errorData)
        toast.error("Erreur lors de l'envoi de la photo")
      }
    } catch (error) {
      console.error("Erreur photo:", error)
      toast.error("Erreur de connexion")
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas")
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (res.ok) {
        toast.success("Mot de passe modifié avec succès")
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || "Erreur lors de la modification du mot de passe")
      }
    } catch (error) {
      console.error("Erreur mot de passe:", error)
      toast.error("Erreur de connexion")
    }
  }

  if (loading)
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0070C0]"></div>
      </div>
    )

  if (!user) return null

  return (
    <div className="bg-[#FAFAFA] min-h-screen px-6 py-10">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec statistiques */}
        <div className="bg-gradient-to-r from-[#0070C0] to-blue-600 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={
                user.photo_profil ? `http://localhost:3001${user.photo_profil}` : "/placeholder.svg?height=80&width=80"
              }
              alt="Photo de profil"
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold">
                {user.prenom} {user.nom}
              </h1>
              <p className="text-blue-100">
                Membre depuis {user.date_creation ? new Date(user.date_creation).getFullYear() : "2024"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.abonnement === "Premium"
                      ? "bg-yellow-500"
                      : user.abonnement === "Starter"
                        ? "bg-green-500"
                        : "bg-white/20"
                  }`}
                >
                  {user.abonnement || "Free"}
                </span>
              </div>
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalCommandes}</p>
                    <p className="text-sm opacity-80">Commandes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">{stats.totalDepense.toFixed(0)}€</p>
                    <p className="text-sm opacity-80">Dépensé</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">{stats.annoncesActives}</p>
                    <p className="text-sm opacity-80">Annonces actives</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">{stats.evaluationMoyenne.toFixed(1)}</p>
                    <p className="text-sm opacity-80">Note moyenne</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation par onglets */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex border-b">
            {[
              { id: "profil", label: "Profil", icon: User },
              { id: "securite", label: "Sécurité", icon: Lock },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "abonnement", label: "Abonnement", icon: ShieldCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === tab.id ? "bg-[#0070C0] text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Onglet Profil */}
            {activeTab === "profil" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations personnelles</h2>

                {/* Upload photo */}
                <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                  <img
                    src={
                      user.photo_profil
                        ? `http://localhost:3001${user.photo_profil}`
                        : "/placeholder.svg?height=80&width=80"
                    }
                    alt="Photo de profil"
                    className="w-20 h-20 rounded-full border object-cover"
                  />
                  <div className="flex-1">
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="mb-2 text-black"
                    />
                    {file && (
                      <button
                        onClick={handleUploadPhoto}
                        className="bg-[#0070C0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                      >
                        <Upload size={16} />
                        Mettre à jour la photo
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField icon={<User />} label="Prénom" value={user.prenom || ""} readOnly />
                  <InputField icon={<User />} label="Nom" value={user.nom || ""} readOnly />
                  <InputField icon={<Mail />} label="Email" value={user.email || ""} readOnly />
                  <InputField
                    icon={<Smartphone />}
                    label="Téléphone"
                    name="telephone"
                    value={user.telephone || ""}
                    onChange={handleChange}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      icon={<MapPin />}
                      label="Adresse"
                      name="adresse"
                      value={user.adresse || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <InputField
                    icon={<Globe />}
                    label="Langue préférée"
                    name="langue_utilise"
                    value={user.langue_utilise || ""}
                    onChange={handleChange}
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="bg-[#0070C0] text-white py-3 px-8 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Enregistrer les modifications
                </button>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === "securite" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Sécurité du compte</h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-yellow-800">Changer le mot de passe</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-black"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                      />
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-700 transition"
                    >
                      Modifier le mot de passe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Préférences de notifications</h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "email",
                      label: "Notifications par email",
                      description: "Recevoir les notifications importantes par email",
                    },
                    {
                      key: "sms",
                      label: "Notifications par SMS",
                      description: "Recevoir les alertes urgentes par SMS",
                    },
                    {
                      key: "push",
                      label: "Notifications push",
                      description: "Recevoir les notifications sur votre navigateur",
                    },
                  ].map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between p-4 border rounded-xl">
                      <div>
                        <h3 className="font-medium text-gray-800">{notif.label}</h3>
                        <p className="text-sm text-gray-600">{notif.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            user.preferences_notifications?.[
                              notif.key as keyof typeof user.preferences_notifications
                            ] || false
                          }
                          onChange={() => handleNotificationChange(notif.key as "email" | "sms" | "push")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSave}
                  className="bg-[#0070C0] text-white py-3 px-8 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Sauvegarder les préférences
                </button>
              </div>
            )}

            {/* Onglet Abonnement */}
            {activeTab === "abonnement" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestion de l'abonnement</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Free",
                      price: "0€/mois",
                      features: ["Annonces limitées", "Support par email", "Assurance de base"],
                      current: user.abonnement === "Free" || !user.abonnement,
                    },
                    {
                      name: "Starter",
                      price: "9,90€/mois",
                      features: [
                        "Annonces illimitées",
                        "Support prioritaire",
                        "Assurance jusqu'à 115€",
                        "Réduction 5%",
                      ],
                      current: user.abonnement === "Starter",
                    },
                    {
                      name: "Premium",
                      price: "19,99€/mois",
                      features: [
                        "Tous les avantages Starter",
                        "Assurance jusqu'à 3000€",
                        "Réduction 9%",
                        "Premier envoi offert",
                      ],
                      current: user.abonnement === "Premium",
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`border-2 rounded-xl p-6 ${
                        plan.current ? "border-[#0070C0] bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                        <p className="text-2xl font-bold text-[#0070C0] mt-2">{plan.price}</p>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {plan.current ? (
                        <div className="bg-[#0070C0] text-white py-2 px-4 rounded-lg text-center font-medium">
                          Abonnement actuel
                        </div>
                      ) : (
                        <button className="w-full border border-[#0070C0] text-[#0070C0] py-2 px-4 rounded-lg hover:bg-[#0070C0] hover:text-white transition font-medium">
                          Choisir ce plan
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function InputField({
  icon,
  label,
  value,
  name,
  onChange,
  readOnly = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-[#0070C0]">{icon}</span>
        {label}
      </label>
      <input
        readOnly={readOnly}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border border-gray-300 rounded-lg px-4 py-2 text-black ${
          readOnly ? "bg-gray-100 cursor-not-allowed" : "focus:ring-2 focus:ring-[#0070C0] focus:border-transparent"
        }`}
      />
    </div>
  )
}
