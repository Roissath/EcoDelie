"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  type: "client" | "commercant" | "livreur" | "prestataire" | "admin"
  nom?: string
  prenom?: string
}

interface Contact {
  id: number
  nom: string
  prenom: string
  lastMessage: string
  date: string
}

export default function Header() {
  const router = useRouter()
  const [language, setLanguage] = useState("fr")
  const [isConnected, setIsConnected] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showMessages, setShowMessages] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3001/auth/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
          setIsConnected(true)

          // Si c'est un client, récupérer ses conversations
          if (userData.type === "client") {
            try {
              const conversationsResponse = await fetch(
                `http://localhost:3001/message/conversations/utilisateur/${userData.id}`,
                {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                },
              )

              if (conversationsResponse.ok) {
                const conversationsData = await conversationsResponse.json()
                setContacts(conversationsData)
              }
            } catch (error) {
              console.error("Erreur lors du chargement des conversations:", error)
              setContacts([])
            }
          }
        } else {
          setIsConnected(false)
          setUser(null)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur:", error)
        setIsConnected(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      setIsConnected(false)
      setUser(null)
      setContacts([])
      router.push("/login")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  const getDashboardUrl = () => {
    if (!user) return "/login"

    switch (user.type) {
      case "admin":
        return "/dashboard/admin"
      case "client":
        return "/dashboard/client"
      case "commercant":
        return "/dashboard/commercant"
      case "livreur":
        return "/dashboard/livreur"
      case "prestataire":
        return "/dashboard/prestataire"
      default:
        return "/dashboard/client"
    }
  }

  if (loading) {
    return (
      <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={50} height={50} className="cursor-pointer" />
          </Link>
          <span className="font-bold text-[#0070C0] text-xl">EcoDeli</span>
        </div>
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
      </header>
    )
  }

  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center relative z-50">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={50} height={50} className="cursor-pointer" />
        </Link>
        <span className="font-bold text-[#0070C0] text-xl">EcoDeli</span>
      </div>

      <nav className="flex items-center gap-8 relative">
        <Link href="/" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">
          Accueil
        </Link>

        {isConnected && user ? (
          <>
            <Link href={getDashboardUrl()} className="text-green-700 font-semibold hover:underline transition">
              Mon espace
            </Link>

            {user.type === "client" && (
              <div className="relative">
                <button onClick={() => setShowMessages(!showMessages)} className="relative" aria-label="Messages">
                  <MessageCircle className="w-6 h-6 text-gray-700 hover:text-[#0070C0]" />
                  {contacts.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                      {contacts.length}
                    </span>
                  )}
                </button>

                {showMessages && (
                  <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl z-40 border p-4 max-h-96 overflow-y-auto">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">Messages</h3>
                    {contacts.length === 0 ? (
                      <p className="text-gray-500 text-sm">Aucune conversation</p>
                    ) : (
                      <ul className="space-y-2">
                        {contacts.map((contact) => (
                          <li key={contact.id}>
                            <Link
                              href={`/dashboard/client/chat/${contact.id}`}
                              className="block p-2 rounded-lg hover:bg-gray-100"
                              onClick={() => setShowMessages(false)}
                            >
                              <p className="text-sm font-semibold">
                                {contact.prenom} {contact.nom}
                              </p>
                              <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}

            <button onClick={handleLogout} className="text-red-600 font-semibold hover:underline transition">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">
              Connexion
            </Link>
            <Link href="/register" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">
              Inscription
            </Link>
          </>
        )}

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border bg-gray-100 rounded-xl p-2 text-gray-700 font-semibold"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </nav>
    </header>
  )
}
