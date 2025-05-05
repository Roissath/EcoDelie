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
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const clientId = 1 // 🔒 à remplacer par user connecté
  const [prestataireId, setPrestataireId] = useState<number | null>(null)

  useEffect(() => {
    // Étape 1 : récupérer les infos prestataire associées à la prestation
    fetch(`http://localhost:3001/annonces/client/prestations/${prestationId}`)
      .then(res => res.json())
      .then(data => {
        const id = data?.infoPrestataire?.utilisateur?.id
        setPrestataireId(id)
      })
  }, [prestationId])

  useEffect(() => {
    if (!prestataireId) return

    fetch(`http://localhost:3001/messages/conversation/${clientId}/${prestataireId}`)
      .then(res => res.json())
      .then(setMessages)
  }, [prestataireId])

  const sendMessage = async () => {
    if (!newMessage.trim() || !prestataireId) return

    const res = await fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
