// app/prestataire/layout.tsx
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'

interface LivreurLayoutProps {
  children: ReactNode
}

export default function LivreurLayout({ children }: LivreurLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header commun à toutes les pages du livreur */}
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
