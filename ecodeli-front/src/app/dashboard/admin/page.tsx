'use client'

import Header from '@/components/Header'
import Link from 'next/link'
import { Users, PackageSearch, ClipboardCheck, CreditCard, BarChart, Warehouse, FileText, ShieldCheck, Settings2 } from 'lucide-react'
import Footer from '@/components/Footer'

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />

      <main className="max-w-7xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-[#0070C0] mb-10 text-center">Back-Office EcoDeli</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Utilisateurs */}
          <AdminCard
        href="admin/utilisateurs"
        icon={<Users className="text-green-600 w-8 h-8" />}
        title="Utilisateurs"
        description="Gérer comptes clients, livreurs, commerçants, prestataires"
/>


          {/* Annonces */}
          <AdminCard
            href="admin/annonces"
            icon={<PackageSearch className="text-green-600 w-8 h-8" />}
            title="Annonces"
            description="Voir et modérer les annonces de livraison"
          />

          {/* Prestations */}
          <AdminCard
            href="admin/prestations"
            icon={<ClipboardCheck className="text-green-600 w-8 h-8" />}
            title="Prestations"
            description="Superviser les prestations et interventions"
          />

          {/* Paiements */}
          <AdminCard
            href="admin/paiements"
            icon={<CreditCard className="text-green-600 w-8 h-8" />}
            title="Paiements"
            description="Vérifier paiements, litiges, virements"
          />

          {/* Statistiques */}
          <AdminCard
            href="admin/stats"
            icon={<BarChart className="text-green-600 w-8 h-8" />}
            title="Statistiques"
            description="Suivre l'activité générale de la plateforme"
          />

          {/* Stockages */}
          <AdminCard
            href="admin/stokage"
            icon={<Warehouse className="text-green-600 w-8 h-8" />}
            title="Stockages"
            description="Gérer les box et espaces d'entreposage"
          />

          {/* Documents utilisateurs */}
          <AdminCard
            href="admin/documents"
            icon={<FileText className="text-green-600 w-8 h-8" />}
            title="Documents"
            description="Valider les pièces justificatives des utilisateurs"
          />

          {/* Sécurité & rôles */}
          <AdminCard
            href="admin/securite"
            icon={<ShieldCheck className="text-green-600 w-8 h-8" />}
            title="Sécurité"
            description="Gérer les rôles, accès et statuts utilisateurs"
          />

          {/* Paramètres du système */}
          <AdminCard
            href="admin/systeme"
            icon={<Settings2 className="text-green-600 w-8 h-8" />}
            title="Paramètres"
            description="Configurer l'infrastructure et le système"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function AdminCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href={href} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg border hover:-translate-y-1 transition">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  )
}
