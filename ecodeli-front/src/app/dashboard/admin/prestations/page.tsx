"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ClipboardCheck,
  User,
  Calendar,
  Eye,
  CheckCircle,
  Trash2,
  Filter,
  AlertCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  UserX,
  Server,
} from "lucide-react"

interface Utilisateur {
  nom: string
  prenom: string
  email: string
}

interface PrestationAnnonce {
  id: number
  titre: string
  description: string
  statut: string
  date_publication: string
  utilisateur: Utilisateur | null
}

// Données de démonstration en cas d'échec de l'API
const demoPrestations: PrestationAnnonce[] = [
  {
    id: 1,
    titre: "Réparation électroménager",
    description: "Service de réparation pour tous types d'électroménager à domicile. Intervention rapide et garantie.",
    statut: "validee",
    date_publication: "2024-01-15T10:30:00Z",
    utilisateur: { nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com" },
  },
  {
    id: 2,
    titre: "Cours de cuisine à domicile",
    description: "Cours particuliers de cuisine française et internationale. Tous niveaux acceptés.",
    statut: "en_attente",
    date_publication: "2024-01-14T14:20:00Z",
    utilisateur: { nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.com" },
  },
  {
    id: 3,
    titre: "Jardinage et entretien espaces verts",
    description: "Entretien de jardins, taille de haies, plantation. Service professionnel et écologique.",
    statut: "validee",
    date_publication: "2024-01-13T09:15:00Z",
    utilisateur: { nom: "Dubois", prenom: "Pierre", email: "pierre.dubois@email.com" },
  },
  {
    id: 4,
    titre: "Aide informatique seniors",
    description: "Assistance informatique spécialisée pour les personnes âgées. Patience et pédagogie garanties.",
    statut: "en_attente",
    date_publication: "2024-01-12T16:45:00Z",
    utilisateur: { nom: "Leroy", prenom: "Marie", email: "marie.leroy@email.com" },
  },
  {
    id: 5,
    titre: "Ménage à domicile",
    description: "Service de ménage professionnel pour particuliers et entreprises. Produits écologiques.",
    statut: "validee",
    date_publication: "2024-01-10T09:00:00Z",
    utilisateur: { nom: "Garnier", prenom: "Céline", email: "celine.garnier@email.com" },
  },
]

export default function PrestationsAdminPage() {
  const [prestations, setPrestations] = useState<PrestationAnnonce[]>(demoPrestations)
  const [prestationsRaw, setPrestationsRaw] = useState<PrestationAnnonce[]>(demoPrestations) // Données brutes de l'API
  const [filterStatus, setFilterStatus] = useState("")
  const [showWithoutUser, setShowWithoutUser] = useState(true) // Afficher les prestations sans utilisateur
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [apiAvailable, setApiAvailable] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "failed">("checking")
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [backendUrl, setBackendUrl] = useState("http://localhost:3001")
  const router = useRouter()

  const checkBackendConnection = async () => {
    // Liste des endpoints à tester
    const endpoints = [
      `${backendUrl}/annonces/type/prestation`,
      `${backendUrl}/annonces`,
      `${backendUrl}/prestations`,
      `${backendUrl}/health`,
    ]

    // Tester chaque endpoint
    for (const endpoint of endpoints) {
      try {
        // Essai sans credentials
        const responseNoCredentials = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // Sans credentials pour voir si c'est un problème d'authentification
        })

        if (responseNoCredentials.ok) {
          return { success: true, endpoint, withCredentials: false }
        }

        // Essai avec credentials
        const responseWithCredentials = await fetch(endpoint, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        if (responseWithCredentials.ok) {
          return { success: true, endpoint, withCredentials: true }
        }
      } catch (err) {}
    }

    // Essayer avec un autre port (3000) au cas où
    try {
      const altUrl = backendUrl.replace("3001", "3000")
      const altResponse = await fetch(`${altUrl}/health`, {
        method: "GET",
      })

      if (altResponse.ok) {
        setBackendUrl(altUrl)
        return { success: true, endpoint: `${altUrl}/health`, withCredentials: false }
      }
    } catch (err) {}

    return { success: false, endpoint: null, withCredentials: false }
  }

  const fetchPrestations = async () => {
    try {
      setLoading(true)
      setError("")
      setConnectionStatus("checking")

      // Essayer de récupérer les prestations depuis l'API
      const response = await fetch(`${backendUrl}/annonces/type/prestation`, {
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        const validPrestations: PrestationAnnonce[] = Array.isArray(data)
          ? data
              .filter((p: any) => p && p.id)
              .map((p: any) => ({
                id: p.id,
                titre: p.titre || `Prestation #${p.id}`,
                description: p.description || "Aucune description disponible",
                statut: p.statut || "en_attente",
                date_publication: p.date_publication || p.datePublication || new Date().toISOString(),
                utilisateur: p.utilisateur || null,
              }))
          : []

        setPrestationsRaw(validPrestations)
        setPrestations(validPrestations)
        setApiAvailable(true)
        setConnectionStatus("connected")
        setError("")
      } else {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue")
      setApiAvailable(false)
      setConnectionStatus("failed")
      // Garder les données de démo en cas d'erreur
      setPrestationsRaw(demoPrestations)
      setPrestations(demoPrestations)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrestations()
  }, [])

  const validerPrestation = async (id: number) => {
    try {
      const response = await fetch(`${backendUrl}/annonces/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ statut: "validee" }),
      })

      if (response.ok) {
        setPrestations((prev) => prev.map((p) => (p.id === id ? { ...p, statut: "validee" } : p)))
        setPrestationsRaw((prev) => prev.map((p) => (p.id === id ? { ...p, statut: "validee" } : p)))
      }
    } catch (error) {
      // Gestion d'erreur silencieuse
    }
  }

  const supprimerPrestation = async (id: number) => {
    if (!confirm("Supprimer cette prestation ?")) return

    try {
      const response = await fetch(`${backendUrl}/annonces/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        setPrestations(prestations.filter((p) => p.id !== id))
        setPrestationsRaw(prestationsRaw.filter((p) => p.id !== id))
      }
    } catch (error) {
      // Gestion d'erreur silencieuse
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "validee":
        return "bg-green-100 text-green-800 border-green-200"
      case "refusee":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  // Filtrage intelligent des prestations
  const prestationsFiltrees = prestations.filter((p) => {
    // Filtre par statut
    if (filterStatus && p.statut !== filterStatus) return false

    // Filtre par présence d'utilisateur
    if (!showWithoutUser && !p.utilisateur) return false

    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Header />
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des prestations...</p>
          <p className="text-gray-500 text-sm mt-2">
            {connectionStatus === "checking" && "Vérification de la connexion au backend..."}
            {connectionStatus === "connected" && "Récupération des données..."}
            {connectionStatus === "failed" && "Tentative de connexion..."}
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <ClipboardCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Annonces de Prestations
          </h1>
          <p className="text-gray-600">Supervisez toutes les prestations de service</p>
        </div>

        {/* Status Banner */}
        <div
          className={`rounded-xl p-4 mb-6 border ${
            apiAvailable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {apiAvailable ? (
                <>
                  <Wifi className="w-5 h-5 text-green-600" />
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-green-800 font-medium">
                      ✅ Données chargées depuis la base de données - {prestationsRaw.length} prestations trouvées
                    </p>
                    <p className="text-green-700 text-sm">
                      {prestationsRaw.filter((p) => p.utilisateur).length} avec utilisateur,{" "}
                      {prestationsRaw.filter((p) => !p.utilisateur).length} sans utilisateur
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-600" />
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-red-800 font-medium">
                      ❌ Backend non accessible - Affichage des données de démonstration
                    </p>
                    {error && <p className="text-red-700 text-sm mt-1">Erreur: {error}</p>}
                    <p className="text-red-700 text-sm mt-1">
                      💡 Vérifiez que votre serveur NestJS est démarré sur {backendUrl}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Dernière mise à jour: {lastUpdate.toLocaleTimeString("fr-FR")}
              </span>
              <button
                onClick={fetchPrestations}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-white text-sm flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Actualiser
              </button>
            </div>
          </div>
        </div>

        {/* Diagnostic et aide au dépannage */}
        {!apiAvailable && (
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
            <h3 className="flex items-center gap-2 text-blue-800 font-semibold mb-3">
              <Server className="w-5 h-5" />
              Diagnostic de connexion au backend
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Vérifiez que votre serveur NestJS est démarré</p>
                  <p className="text-blue-700 text-sm">
                    Exécutez <code className="bg-blue-100 px-1 rounded">npm run start:dev</code> dans le dossier du
                    backend
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Vérifiez le port utilisé par votre backend</p>
                  <p className="text-blue-700 text-sm">
                    Le port par défaut est 3001. Vérifiez dans la console du backend quel port est utilisé.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Vérifiez la configuration CORS</p>
                  <p className="text-blue-700 text-sm">
                    Assurez-vous que votre backend autorise les requêtes depuis votre frontend (origine:{" "}
                    {window.location.origin})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Testez manuellement les endpoints</p>
                  <p className="text-blue-700 text-sm">
                    Essayez d'accéder à{" "}
                    <a href={`${backendUrl}/health`} target="_blank" className="underline" rel="noreferrer">
                      {backendUrl}/health
                    </a>{" "}
                    dans votre navigateur
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-blue-800 text-xs font-bold">5</span>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Vérifiez les logs du backend</p>
                  <p className="text-blue-700 text-sm">
                    Consultez la console où votre backend est exécuté pour voir les erreurs éventuelles
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-blue-800 font-medium">Changer l'URL du backend:</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  className="flex-1 border border-blue-300 rounded-lg px-3 py-2 text-sm"
                  placeholder="http://localhost:3001"
                />
                <button
                  onClick={fetchPrestations}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
                >
                  Tester
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
            >
              <option value="">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="validee">Validée</option>
              <option value="refusee">Refusée</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showWithoutUser}
                onChange={(e) => setShowWithoutUser(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Afficher les prestations sans utilisateur</span>
            </label>

            <span className="text-sm text-gray-500 ml-auto">
              {prestationsFiltrees.length} prestation{prestationsFiltrees.length > 1 ? "s" : ""} trouvée
              {prestationsFiltrees.length > 1 ? "s" : ""} sur {prestationsRaw.length}
            </span>
          </div>
        </div>

        {/* Prestations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prestationsFiltrees.map((p) => (
            <div
              key={p.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => router.push(`/dashboard/admin/prestations/${p.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.titre}</h3>
                    <p className="text-sm text-gray-500">Prestation #{p.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(p.statut)}`}>
                  {p.statut}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  {p.utilisateur ? (
                    <>
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Prestataire:</span>
                      <span className="font-medium">
                        {p.utilisateur.nom} {p.utilisateur.prenom}
                      </span>
                    </>
                  ) : (
                    <>
                      <UserX className="w-4 h-4 text-red-400" />
                      <span className="text-red-600">Aucun prestataire associé</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Publié le:</span>
                  <span className="font-medium">{new Date(p.date_publication).toLocaleDateString("fr-FR")}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{p.description}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                <Link href={`/dashboard/admin/prestations/${p.id}`} className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    Détail
                  </button>
                </Link>

                {p.statut !== "validee" && (
                  <button
                    onClick={() => validerPrestation(p.id)}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valider
                  </button>
                )}

                <button
                  onClick={() => supprimerPrestation(p.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {prestationsFiltrees.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardCheck className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune prestation trouvée</h3>
            <p className="text-gray-500">
              {filterStatus ? `Aucune prestation avec le statut "${filterStatus}"` : "Aucune prestation disponible"}
            </p>
            {prestationsRaw.length > 0 && prestationsFiltrees.length === 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  💡 <strong>{prestationsRaw.length} prestations</strong> sont disponibles mais filtrées.
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Vérifiez vos filtres ou activez "Afficher les prestations sans utilisateur"
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
