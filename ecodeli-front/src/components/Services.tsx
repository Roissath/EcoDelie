'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Services() {
  const services = [
    {
      title: 'Livraison de courses',
      description: 'Faites livrer vos courses locales par des particuliers responsables.',
      icon: '/icons/livraison-courses.png'
    },
    {
      title: 'Produits locaux',
      description: 'Accédez facilement à des produits rares ou introuvables chez vous.',
      icon: '/icons/produits-locaux.png'
    },
    {
      title: 'Aide à la personne',
      description: 'Transport, garde d’animaux, petits travaux : nos prestataires sont là.',
      icon: '/icons/aide-personne.png'
    },
    {
      title: 'Transport de colis',
      description: 'Faites acheminer vos colis de manière rapide et éco-responsable.',
      icon: '/icons/colis.png'
    },
    {
      title: 'Service de courses personnalisées',
      description: 'Vos listes de courses réalisées et livrées en main propre.',
      icon: '/icons/courses-personnalisees.png'
    },
    {
      title: 'Livraison express',
      description: 'Bénéficiez d’une livraison rapide pour vos urgences.',
      icon: '/icons/livraison-express.png'
    },
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0070C0] mb-12">Nos services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-[#F0F9F4] rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="w-full h-44 relative bg-white flex items-center justify-center">
              <Image
                src={service.icon}
                alt={service.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </motion.div>
          
          ))}
        </div>
      </div>
    </section>
  )
}
