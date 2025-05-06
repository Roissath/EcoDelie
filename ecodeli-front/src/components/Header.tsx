'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { getUserFromCookie } from '@/lib/auth'

interface Contact {
  id: number
  nom: string
  prenom: string
  lastMessage: string
  date: string
}

export default function Header() {
  const [language, setLanguage] = useState('fr')
  const [isConnected, setIsConnected] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserFromCookie()
      if (user) {
        setIsConnected(true)
        setUserId(user.id)

        // Récupération des conversations liées à l'utilisateur
        fetch(`http://localhost:3001/messages/conversations/utilisateur/${user.id}`)
          .then((res) => res.json())
          .then(setContacts)
          .catch(() => setContacts([]))
      }
    }
    fetchUser()
  }, [])

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  return (
    <header className="w-full bg-white shadow-sm p-4 flex justify-between items-center relative z-50">
      {/* Logo + Nom */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/Logo_v2.png" alt="Logo EcoDeli" width={50} height={50} className="cursor-pointer" />
        </Link>
        <span className="font-bold text-[#0070C0] text-xl">EcoDeli</span>
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-8 relative">
        <Link href="/" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">Accueil</Link>

        {isConnected ? (
          <>
            {/* Icône Message */}
            <div className="relative">
              <button onClick={() => setShowMessages(!showMessages)} className="relative">
                <MessageCircle className="w-6 h-6 text-gray-700 hover:text-[#0070C0]" />
                {contacts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">●</span>
                )}
              </button>

              {/* Dropdown messages */}
              {showMessages && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl z-40 border p-4 max-h-96 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Messages</h3>
                  {contacts.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucune conversation</p>
                  ) : (
                    <ul className="space-y-2">
                      {contacts.map(contact => (
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

            <Link
              href="/logout"
              onClick={() => {
                fetch('http://localhost:3001/auth/logout', { method: 'POST', credentials: 'include' })
                  .then(() => window.location.href = '/')
              }}
              className="text-red-600 font-semibold hover:underline transition"
            >
              Déconnexion
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">Connexion</Link>
            <Link href="/register" className="text-gray-700 font-semibold hover:text-[#0070C0] transition">Inscription</Link>
          </>
        )}

        {/* Sélecteur de langue */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border bg-gray-100 rounded-xl p-2 text-gray-700 font-semibold"
        >
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </nav>
    </header>
  )
}
