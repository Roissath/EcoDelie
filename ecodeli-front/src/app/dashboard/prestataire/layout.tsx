// app/prestataire/layout.tsx
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

interface PrestataireLayoutProps {
  children: ReactNode
}

export default function PrestataireLayout({ children }: PrestataireLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header commun à toutes les pages du prestataire */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1 max-w-6xl mx-auto py-16 px-6">
        {children}
      </main>

      {/* Footer commun */}
      <Footer />
    </div>
  )
}
