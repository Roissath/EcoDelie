'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-green-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Texte d'accroche */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            EcoDeli, la livraison humaine et durable 🌍
          </h1>
          <p className="text-gray-700 text-lg max-w-xl">
            Une nouvelle façon d'envoyer, recevoir et aider, en connectant voyageurs, commerçants et particuliers dans un esprit d'entraide et d'écologie.
          </p>
          <div className="flex gap-4">
            <Link href="/register">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Créer un compte
              </button>
            </Link>
            <Link href="/livreur/devenir">
              <button className="border border-green-600 text-green-700 hover:bg-green-100 px-6 py-3 rounded-xl font-semibold transition">
                Devenir livreur
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Illustration immersive */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src="/hero-ecodeli-immersive.png"
            alt="Illustration EcoDeli"
            width={550}
            height={400}
            className="rounded-xl object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}