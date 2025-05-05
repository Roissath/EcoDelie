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

export default function SidebarClient() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-[#0070C0] mb-6">Mon espace client</h2>
      <nav className="space-y-4">
        <NavLink href="/dashboard/client/commercants" icon={<ShoppingCart />}>Produits</NavLink>
        <NavLink href="/dashboard/client/prestations" icon={<Briefcase />}>Prestations</NavLink>
        <NavLink href="/dashboard/client/commandes" icon={<ClipboardList />}>Commandes</NavLink>
        <NavLink href="/dashboard/client/livraisons" icon={<Truck />}>Livraisons</NavLink>
        <NavLink href="/dashboard/client/paiements" icon={<CreditCard />}>Paiements</NavLink>
        <NavLink href="/dashboard/client/profil" icon={<User />}>Mon Profil</NavLink>
        <NavLink href="/logout" icon={<LogOut />}>Déconnexion</NavLink>
      </nav>
    </div>
  )
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-gray-700 hover:text-[#0070C0] font-medium transition"
    >
      <span className="w-5 h-5">{icon}</span>
      {children}
    </Link>
  )
}
