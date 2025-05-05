'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0070C0] text-white pt-16 pb-10 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* À propos */}
        <div>
          <h3 className="font-bold text-lg mb-4">À propos d’EcoDeli</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/a-propos" className="hover:underline">Qui sommes-nous ?</Link></li>
            <li><Link href="/recrutement" className="hover:underline">Recrutement</Link></li>
            <li><Link href="/partenaires" className="hover:underline">Devenir partenaire</Link></li>
            <li><Link href="/engagements" className="hover:underline">Engagements durables</Link></li>
          </ul>
        </div>

        {/* Aide & support */}
        <div>
          <h3 className="font-bold text-lg mb-4">Aide & Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:underline">Contactez-nous</Link></li>
            <li><Link href="/conditions" className="hover:underline">Conditions générales</Link></li>
            <li><Link href="/confidentialite" className="hover:underline">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Nos services */}
        <div>
          <h3 className="font-bold text-lg mb-4">Nos services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/livraisons" className="hover:underline">Livraison de courses</Link></li>
            <li><Link href="/services" className="hover:underline">Aide à la personne</Link></li>
            <li><Link href="/prestations" className="hover:underline">Prestations de proximité</Link></li>
            <li><Link href="/produits-locaux" className="hover:underline">Produits locaux</Link></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="font-bold text-lg mb-4">Rejoignez-nous</h3>
          <div className="flex gap-4 mb-4">
            <Link href="#"><Facebook className="w-5 h-5" /></Link>
            <Link href="#"><Instagram className="w-5 h-5" /></Link>
            <Link href="#"><Twitter className="w-5 h-5" /></Link>
            <Link href="#"><Linkedin className="w-5 h-5" /></Link>
            <Link href="#"><Youtube className="w-5 h-5" /></Link>
          </div>
          <p className="text-sm">© 2025 EcoDeli. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
