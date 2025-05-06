'use client'

import Link from 'next/link'
import {
  ShoppingCart,
  Briefcase,
  ClipboardList,
  Truck,
  CreditCard,
  User,
  LogOut,
} from 'lucide-react'

const links = [
  { href: '/dashboard/client/commercants', label: 'Produits', icon: <ShoppingCart size={18} /> },
  { href: '/dashboard/client/prestations', label: 'Prestations', icon: <Briefcase size={18} /> },
  { href: '/dashboard/client/commandes', label: 'Commandes', icon: <ClipboardList size={18} /> },
  { href: '/dashboard/client/livraisons', label: 'Livraisons', icon: <Truck size={18} /> },
  { href: '/dashboard/client/paiements', label: 'Paiements', icon: <CreditCard size={18} /> },
  { href: '/dashboard/client/profil', label: 'Mon Profil', icon: <User size={18} /> },
  { href: '/logout', label: 'Déconnexion', icon: <LogOut size={18} />, red: true },
]

export default function SidebarClient() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-[#0070C0]">Mon espace client</h2>
      <nav className="space-y-4">
        {links.map(({ href, label, icon, red }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 font-medium transition ${
              red ? 'text-red-600 hover:text-red-800' : 'text-gray-700 hover:text-[#0070C0]'
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
