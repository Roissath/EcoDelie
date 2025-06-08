"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import {
  Settings,
  Server,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Globe,
  Shield,
  Mail,
  Palette,
  Monitor,
  RefreshCw,
  Save,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react"

interface SystemConfig {
  nom_application: string
  version: string
  environnement: string
  url_base: string
  port_backend: number
  port_frontend: number
  database_url: string
  redis_url: string
  email_smtp_host: string
  email_smtp_port: number
  email_from: string
  notifications_enabled: boolean
  maintenance_mode: boolean
  debug_mode: boolean
  max_upload_size: number
  session_timeout: number
  cors_origins: string[]
  theme_couleur_primaire: string
  theme_couleur_secondaire: string
  logo_url: string
}

interface SystemStats {
  uptime: string
  cpu_usage: number
  memory_usage: number
  disk_usage: number
  active_users: number
  total_requests: number
  database_connections: number
  cache_hit_rate: number
}

// Configuration par défaut
const defaultConfig: SystemConfig = {
  nom_application: "EcoDeli Admin",
  version: "1.0.0",
  environnement: "development",
  url_base: "http://localhost:3000",
  port_backend: 3001,
  port_frontend: 3000,
  database_url: "postgresql://localhost:5432/ecodeli",
  redis_url: "redis://localhost:6379",
  email_smtp_host: "smtp.gmail.com",
  email_smtp_port: 587,
  email_from: "noreply@ecodeli.com",
  notifications_enabled: true,
  maintenance_mode: false,
  debug_mode: true,
  max_upload_size: 10,
  session_timeout: 3600,
  cors_origins: ["http://localhost:3000", "http://localhost:3001"],
  theme_couleur_primaire: "#0070C0",
  theme_couleur_secondaire: "#10B981",
  logo_url: "/logo.png",
}

// Statistiques système simulées
const demoStats: SystemStats = {
  uptime: "2 jours 14h 32m",
  cpu_usage: 45,
  memory_usage: 68,
  disk_usage: 32,
  active_users: 127,
  total_requests: 15420,
  database_connections: 8,
  cache_hit_rate: 94,
}

export default function SystemePage() {
  const [config, setConfig] = useState<SystemConfig>(defaultConfig)
  const [stats, setStats] = useState<SystemStats>(demoStats)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<"general" | "database" | "email" | "security" | "theme">("general")

  const fetchConfig = async () => {
    setLoading(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // En réalité : const response = await fetch('http://localhost:3001/config')
      setConfig(defaultConfig)
      setStats(demoStats)
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors du chargement de la configuration" })
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    setSaving(true)
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // En réalité : await fetch('http://localhost:3001/config', { method: 'PUT', body: JSON.stringify(config) })
      setMessage({ type: "success", text: "Configuration sauvegardée avec succès" })
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de la sauvegarde" })
    } finally {
      setSaving(false)
    }
  }

  const restartSystem = async () => {
    if (!confirm("Êtes-vous sûr de vouloir redémarrer le système ?")) return

    try {
      setMessage({ type: "info", text: "Redémarrage du système en cours..." })
      // Simuler un redémarrage
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setMessage({ type: "success", text: "Système redémarré avec succès" })
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors du redémarrage" })
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleConfigChange = (key: keyof SystemConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return "text-green-600"
    if (percentage < 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getUsageBarColor = (percentage: number) => {
    if (percentage < 50) return "bg-green-500"
    if (percentage < 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-100">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Paramètres Système
          </h1>
          <p className="text-gray-600">Configurer l'infrastructure et le système</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`rounded-xl p-4 mb-6 border flex items-center gap-3 ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : message.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            {message.type === "success" && <CheckCircle className="w-5 h-5" />}
            {message.type === "error" && <AlertCircle className="w-5 h-5" />}
            {message.type === "info" && <Info className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Temps de fonctionnement"
            value={stats.uptime}
            icon={<Server />}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Utilisateurs actifs"
            value={stats.active_users.toString()}
            icon={<Monitor />}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Requêtes totales"
            value={stats.total_requests.toLocaleString()}
            icon={<Globe />}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Taux de cache"
            value={`${stats.cache_hit_rate}%`}
            icon={<Database />}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Resource Usage */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-blue-600" />
            Utilisation des ressources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResourceBar
              title="CPU"
              percentage={stats.cpu_usage}
              icon={<Cpu className="w-5 h-5" />}
              color={getUsageBarColor(stats.cpu_usage)}
              textColor={getUsageColor(stats.cpu_usage)}
            />
            <ResourceBar
              title="Mémoire"
              percentage={stats.memory_usage}
              icon={<MemoryStick className="w-5 h-5" />}
              color={getUsageBarColor(stats.memory_usage)}
              textColor={getUsageColor(stats.memory_usage)}
            />
            <ResourceBar
              title="Disque"
              percentage={stats.disk_usage}
              icon={<HardDrive className="w-5 h-5" />}
              color={getUsageBarColor(stats.disk_usage)}
              textColor={getUsageColor(stats.disk_usage)}
            />
          </div>
        </div>

        {/* Configuration Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "general", label: "Général", icon: <Settings className="w-4 h-4" /> },
                { id: "database", label: "Base de données", icon: <Database className="w-4 h-4" /> },
                { id: "email", label: "Email", icon: <Mail className="w-4 h-4" /> },
                { id: "security", label: "Sécurité", icon: <Shield className="w-4 h-4" /> },
                { id: "theme", label: "Thème", icon: <Palette className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <ConfigField
                  label="Nom de l'application"
                  value={config.nom_application}
                  onChange={(value) => handleConfigChange("nom_application", value)}
                />
                <ConfigField
                  label="Version"
                  value={config.version}
                  onChange={(value) => handleConfigChange("version", value)}
                />
                <ConfigField
                  label="Environnement"
                  value={config.environnement}
                  onChange={(value) => handleConfigChange("environnement", value)}
                  type="select"
                  options={["development", "staging", "production"]}
                />
                <ConfigField
                  label="URL de base"
                  value={config.url_base}
                  onChange={(value) => handleConfigChange("url_base", value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ConfigField
                    label="Port Backend"
                    value={config.port_backend.toString()}
                    onChange={(value) => handleConfigChange("port_backend", Number.parseInt(value))}
                    type="number"
                  />
                  <ConfigField
                    label="Port Frontend"
                    value={config.port_frontend.toString()}
                    onChange={(value) => handleConfigChange("port_frontend", Number.parseInt(value))}
                    type="number"
                  />
                </div>
              </div>
            )}

            {activeTab === "database" && (
              <div className="space-y-6">
                <ConfigField
                  label="URL de la base de données"
                  value={config.database_url}
                  onChange={(value) => handleConfigChange("database_url", value)}
                />
                <ConfigField
                  label="URL Redis"
                  value={config.redis_url}
                  onChange={(value) => handleConfigChange("redis_url", value)}
                />
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Statistiques de la base de données</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-700">Connexions actives:</span>
                      <span className="font-medium ml-2">{stats.database_connections}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Taux de cache:</span>
                      <span className="font-medium ml-2">{stats.cache_hit_rate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "email" && (
              <div className="space-y-6">
                <ConfigField
                  label="Serveur SMTP"
                  value={config.email_smtp_host}
                  onChange={(value) => handleConfigChange("email_smtp_host", value)}
                />
                <ConfigField
                  label="Port SMTP"
                  value={config.email_smtp_port.toString()}
                  onChange={(value) => handleConfigChange("email_smtp_port", Number.parseInt(value))}
                  type="number"
                />
                <ConfigField
                  label="Email expéditeur"
                  value={config.email_from}
                  onChange={(value) => handleConfigChange("email_from", value)}
                  type="email"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={config.notifications_enabled}
                    onChange={(e) => handleConfigChange("notifications_enabled", e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="notifications" className="text-sm font-medium text-gray-700">
                    Activer les notifications par email
                  </label>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <ConfigField
                  label="Timeout de session (secondes)"
                  value={config.session_timeout.toString()}
                  onChange={(value) => handleConfigChange("session_timeout", Number.parseInt(value))}
                  type="number"
                />
                <ConfigField
                  label="Taille max upload (MB)"
                  value={config.max_upload_size.toString()}
                  onChange={(value) => handleConfigChange("max_upload_size", Number.parseInt(value))}
                  type="number"
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="maintenance"
                      checked={config.maintenance_mode}
                      onChange={(e) => handleConfigChange("maintenance_mode", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="maintenance" className="text-sm font-medium text-gray-700">
                      Mode maintenance
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="debug"
                      checked={config.debug_mode}
                      onChange={(e) => handleConfigChange("debug_mode", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="debug" className="text-sm font-medium text-gray-700">
                      Mode debug
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "theme" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur primaire</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme_couleur_primaire}
                        onChange={(e) => handleConfigChange("theme_couleur_primaire", e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300"
                      />
                      <input
                        type="text"
                        value={config.theme_couleur_primaire}
                        onChange={(e) => handleConfigChange("theme_couleur_primaire", e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.theme_couleur_secondaire}
                        onChange={(e) => handleConfigChange("theme_couleur_secondaire", e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gray-300"
                      />
                      <input
                        type="text"
                        value={config.theme_couleur_secondaire}
                        onChange={(e) => handleConfigChange("theme_couleur_secondaire", e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
                <ConfigField
                  label="URL du logo"
                  value={config.logo_url}
                  onChange={(value) => handleConfigChange("logo_url", value)}
                />
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Aperçu du thème</h3>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-lg"
                      style={{ backgroundColor: config.theme_couleur_primaire }}
                    ></div>
                    <div
                      className="w-16 h-16 rounded-lg"
                      style={{ backgroundColor: config.theme_couleur_secondaire }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={restartSystem}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Redémarrer le système
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchConfig}
              disabled={loading}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              Actualiser
            </button>

            <button
              onClick={saveConfig}
              disabled={saving}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2"
            >
              <Save className={`w-5 h-5 ${saving ? "animate-pulse" : ""}`} />
              {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function ResourceBar({
  title,
  percentage,
  icon,
  color,
  textColor,
}: {
  title: string
  percentage: number
  icon: React.ReactNode
  color: string
  textColor: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={textColor}>{icon}</span>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <span className={`text-sm font-bold ${textColor}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${color} transition-all duration-300`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function ConfigField({
  label,
  value,
  onChange,
  type = "text",
  options = [],
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "number" | "email" | "select"
  options?: string[]
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  )
}
