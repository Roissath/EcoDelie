
'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <Hero />

      {/* SERVICES */}
      <Services />

      {/* PROCESS (Fonctionnement) */}
      <Process />

      {/* TESTIMONIALS (Témoignages) */}
      <Testimonials />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
