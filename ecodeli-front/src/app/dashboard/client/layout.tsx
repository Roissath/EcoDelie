'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import SidebarClient from '@/components/SidebarClient'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const showSidebar = !pathname.endsWith('/client') && pathname.includes('/client')

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header pleine largeur */}
      <Header />

      {/* Corps : sidebar + contenu */}
      <div className="flex flex-1">
        {showSidebar && (
          <aside className="w-64 bg-white shadow-md border-r">
            <SidebarClient />
          </aside>
        )}

        {/* Zone centrale sans margin */}
        <main className="flex-1 bg-[#FAFAFA] p-6">
          {children}
        </main>
      </div>

      {/* Footer pleine largeur */}
      <Footer />
    </div>
  )
}
  