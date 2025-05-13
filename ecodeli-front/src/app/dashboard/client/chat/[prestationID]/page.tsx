'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Message {
  id: number
  contenu: string
  date_envoi: string
  expediteurId: number
}

export default function ChatPage() {
  const { prestationId } = useParams()
  const [clientId, setClientId] = useState<number | null>(null)
  const [prestataireId, setPrestataireId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  // ✅ Récupération utilisateur connecté
  useEffect(() => {
    fetch('http://localhost:3001/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.id) setClientId(data.id)
      })
  }, [])

  // ✅ Récupération de l'ID du prestataire à partir de la prestation
  useEffect(() => {
    if (!prestationId) return

    fetch(`http://localhost:3001/annonces/${prestationId}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        const id = data?.infoPrestataire?.utilisateur?.id
        if (id) setPrestataireId(id)
      })
  }, [prestationId])

  // ✅ Charger les messages
  useEffect(() => {
    if (!clientId || !prestataireId) return

    fetch(`http://localhost:3001/messages/conversation/${clientId}/${prestataireId}`)
      .then(res => res.ok ? res.json() : [])
      .then(setMessages)
  }, [clientId, prestataireId])

  const sendMessage = async () => {
    if (!newMessage.trim() || !clientId || !prestataireId) return

    const res = await fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        expediteurId: clientId,
        destinataireId: prestataireId,
        contenu: newMessage,
      }),
    })

    if (res.ok) {
      setNewMessage('')
      const updated = await fetch(`http://localhost:3001/messages/conversation/${clientId}/${prestataireId}`)
        .then(res => res.json())
      setMessages(updated)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col p-6">
      <h1 className="text-2xl font-bold text-[#0070C0] mb-4">Discussion avec le prestataire</h1>

      {/* Liste messages */}
      <div className="flex-1 space-y-4 overflow-y-auto border p-4 rounded-xl bg-white max-h-[500px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-3 rounded-xl ${
              msg.expediteurId === clientId ? 'bg-green-100 ml-auto' : 'bg-gray-200 mr-auto'
            }`}
          >
            <p className="text-sm">{msg.contenu}</p>
            <p className="text-xs text-right text-gray-500 mt-1">
              {new Date(msg.date_envoi).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>

      {/* Saisie message */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-xl p-3"
          placeholder="Écrire un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-[#0070C0] text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}
