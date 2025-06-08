"use client"

import type React from "react"

import Header from "@/components/Header"
import Link from "next/link"
import {
  Users,
  PackageSearch,
  ClipboardCheck,
  CreditCard,
  BarChart,
  Warehouse,
  FileText,
  ShieldCheck,
  Settings2,
} from "lucide-react"
import Footer from "@/components/Footer"

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="max-w-7xl mx-auto py-16 px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <Settings2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Back-Office EcoDeli
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez votre plateforme de livraison écologique avec des outils puissants et intuitifs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard title="Utilisateurs Actifs" value="1,234" change="+12%" color="blue" />
          <StatsCard title="Livraisons" value="856" change="+8%" color="green" />
          <StatsCard title="Revenus" value="€45,678" change="+15%" color="purple" />
          <StatsCard title="Satisfaction" value="98%" change="+2%" color="orange" />
        </div>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AdminCard
            href="admin/utilisateurs"
            icon={<Users className="w-8 h-8" />}
            title="Utilisateurs"
            description="Gérer comptes clients, livreurs, commerçants, prestataires"
            color="from-blue-500 to-blue-600"
            stats="1,234 utilisateurs"
          />

          <AdminCard
            href="admin/annonces"
            icon={<PackageSearch className="w-8 h-8" />}
            title="Annonces"
            description="Voir et modérer les annonces de livraison"
            color="from-green-500 to-green-600"
            stats="456 annonces"
          />

          <AdminCard
            href="admin/prestations"
            icon={<ClipboardCheck className="w-8 h-8" />}
            title="Prestations"
            description="Superviser les prestations et interventions"
            color="from-purple-500 to-purple-600"
            stats="89 prestations"
          />

          <AdminCard
            href="admin/paiements"
            icon={<CreditCard className="w-8 h-8" />}
            title="Paiements"
            description="Vérifier paiements, litiges, virements"
            color="from-orange-500 to-orange-600"
            stats="€45,678 ce mois"
          />

          <AdminCard
            href="admin/stats"
            icon={<BarChart className="w-8 h-8" />}
            title="Statistiques"
            description="Suivre l'activité générale de la plateforme"
            color="from-indigo-500 to-indigo-600"
            stats="Rapports détaillés"
          />

          <AdminCard
            href="admin/stokage"
            icon={<Warehouse className="w-8 h-8" />}
            title="Stockages"
            description="Gérer les box et espaces d'entreposage"
            color="from-teal-500 to-teal-600"
            stats="12 entrepôts"
          />

          <AdminCard
            href="admin/documents"
            icon={<FileText className="w-8 h-8" />}
            title="Documents"
            description="Valider les pièces justificatives des utilisateurs"
            color="from-rose-500 to-rose-600"
            stats="234 en attente"
          />

          <AdminCard
            href="admin/securite"
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Sécurité"
            description="Gérer les rôles, accès et statuts utilisateurs"
            color="from-red-500 to-red-600"
            stats="Système sécurisé"
          />

          <AdminCard
            href="admin/systeme"
            icon={<Settings2 className="w-8 h-8" />}
            title="Paramètres"
            description="Configurer l'infrastructure et le système"
            color="from-gray-500 to-gray-600"
            stats="Configuration"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function StatsCard({
  title,
  value,
  change,
  color,
}: {
  title: string
  value: string
  change: string
  color: string
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center`}
        >
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className="text-green-600 text-sm font-medium">{change}</span>
        <span className="text-gray-500 text-sm ml-2">vs mois dernier</span>
      </div>
    </div>
  )
}

function AdminCard({
  href,
  icon,
  title,
  description,
  color,
  stats,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  stats: string
}) {
  return (
    <Link href={href} className="group">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
        <div className="flex flex-col h-full">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${color} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>

          <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{description}</p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-500">{stats}</span>
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
