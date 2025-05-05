'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PlusCircle, CalendarCheck, FileText, MapPin, CreditCard, FileBarChart2 } from 'lucide-react'

const cards = [
  {
    title: 'Mes livraisons',
    description: 'Suivez vos livraisons en cours, à venir ou terminées.',
    icon: <MapPin className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/livraison',
  },
  {
    title: 'Mon planning',
    description: 'Gérez vos disponibilités de trajet et horaires de livraison.',
    icon: <CalendarCheck className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/planning',
  },
  {
    title: 'Mes documents',
    description: 'Déposez vos justificatifs (pièce d’identité, etc).',
    icon: <FileText className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/documents',
  },
  {
    title: 'Annonces proches',
    description: 'Consultez les annonces de livraison.',
    icon: <PlusCircle className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/annonces',
  },
  {
    title: 'Mes paiements',
    description: 'Historique de vos paiements et virements.',
    icon: <CreditCard className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/paiement',
  },
  {
    title: 'Mes factures',
    description: 'Consultez et téléchargez vos factures.',
    icon: <FileBarChart2 className="w-6 h-6 text-[#19A463]" />,
    href: '/dashboard/livreur/factures',
  },
]

export default function DashboardLivreur() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      
      <div className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-extrabold text-[#0070C0] mb-12 text-center">Espace Livreur</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              href={card.href}
              key={index}
              className="rounded-xl bg-white shadow hover:shadow-md p-6 flex gap-4 items-start transition-all hover:-translate-y-1 hover:scale-[1.01]"
            >
              <div>{card.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-[#0070C0]">{card.title}</h2>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
