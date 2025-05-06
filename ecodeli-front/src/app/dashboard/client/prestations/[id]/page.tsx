// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import { getUserFromCookie } from '@/lib/auth'
// import Image from 'next/image'

// interface Message {
//   id: number
//   contenu: string
//   date_envoi: string
//   lu: boolean
//   expediteur: { id: number; nom: string }
//   destinataire: { id: number; nom: string }
// }

// export default function ChatPrestation() {
//   const { id: prestataireId } = useParams()
//   const [userId, setUserId] = useState<number | null>(null)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [newMessage, setNewMessage] = useState('')

//   // Récupération de l'utilisateur connecté
//   useEffect(() => {
//     const fetchUser = async () => {
//       const user = await getUserFromCookie()
//       setUserId(user?.id || null)
//     }
//     fetchUser()
//   }, [])

//   // Récupération des messages
//   useEffect(() => {
//     if (!userId || !prestataireId) return

//     fetch(`http://localhost:3000/messages/conversation/${userId}/${prestataireId}`)
//       .then((res) => res.json())
//       .then(setMessages)
//   }, [userId, prestataireId])

//   // Envoi du message
//   const sendMessage = async () => {
//     if (!newMessage || !userId || !prestataireId) return

//     const messageToSend = {
//       contenu: newMessage,
//       date_envoi: new Date(),
//       lu: false,
//       expediteurId: userId,
//       destinataireId: Number(prestataireId),
//     }

//     const res = await fetch('http://localhost:3000/messages', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(messageToSend),
//     })

//     const saved = await res.json()
//     setMessages((prev) => [...prev, saved])
//     setNewMessage('')
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Discussion avec le prestataire</h1>

//       <div className="h-[400px] overflow-y-auto border p-4 rounded-xl bg-white shadow-sm">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`mb-3 p-2 rounded-md max-w-[70%] ${
//               msg.expediteur.id === userId
//                 ? 'bg-blue-100 self-end ml-auto text-right'
//                 : 'bg-gray-100 self-start'
//             }`}
//           >
//             <p className="text-sm text-gray-800">{msg.contenu}</p>
//             <p className="text-xs text-gray-500">{new Date(msg.date_envoi).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 flex gap-2">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border rounded-xl p-2"
//           placeholder="Écrire un message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
//         >
//           Envoyer
//         </button>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Utilisateur {
  id: number
  prenom: string
  nom: string
  email: string
}

interface Annonce {
  id: number
  titre: string
  description: string
  date_publication: string
  statut: string
  utilisateur: Utilisateur
}

export default function DetailPrestationPage() {
  const { id } = useParams()
  const router = useRouter()
  const [prestation, setPrestation] = useState<Annonce | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3001/annonces/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPrestation(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Erreur lors du chargement de la prestation :', err)
        setLoading(false)
      })
  }, [id])

  const handleAccepter = async () => {
    // Exemple d’action d’acceptation (à adapter à ton backend)
    alert('Fonction d’acceptation à implémenter ici.')
  }

  if (loading) return <div className="p-6">Chargement...</div>
  if (!prestation) return <div className="p-6 text-red-600">Aucune prestation trouvée.</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{prestation.titre}</h1>
      <p className="text-gray-700">{prestation.description}</p>
      <p className="text-sm text-gray-500">
        Publié le {new Date(prestation.date_publication).toLocaleDateString('fr-FR')} par {prestation.utilisateur.prenom} {prestation.utilisateur.nom}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleAccepter}
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Accepter la prestation
        </button>

        <Link
          href={`/dashboard/client/chat/${prestation.id}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition text-center"
        >
          Discuter avec le prestataire
        </Link>
      </div>
    </div>
  )
}
