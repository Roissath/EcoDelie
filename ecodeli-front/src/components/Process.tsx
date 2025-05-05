'use client'

import { motion } from 'framer-motion'
import { Search, PackageCheck, Smile } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      title: 'Déposez votre annonce',
      description: 'Indiquez ce que vous souhaitez faire livrer ou le service dont vous avez besoin.',
      icon: <Search className="w-12 h-12 text-green-600" />
    },
    {
      title: 'Livraison ou service',
      description: 'Un livreur ou un prestataire valide votre demande et intervient rapidement.',
      icon: <PackageCheck className="w-12 h-12 text-green-600" />
    },
    {
      title: 'Recevez & évaluez',
      description: 'Recevez votre colis ou votre prestation et laissez un avis pour aider la communauté.',
      icon: <Smile className="w-12 h-12 text-green-600" />
    },
  ];

  return (
    <section className="py-20 px-6 bg-green-50 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0070C0] mb-12">Comment fonctionne EcoDeli ?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center gap-4">
                {step.icon}
                <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
