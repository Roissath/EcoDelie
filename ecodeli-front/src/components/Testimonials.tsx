'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sophie M.',
      role: 'Cliente à Paris',
      comment: 'EcoDeli m’a permis de recevoir des produits locaux que je ne trouvais pas ailleurs. Rapide et humain, je recommande à 100% !',
      photo: '/avatars/client1.webp'
    },
    {
      name: 'Jean D.',
      role: 'Livreur occasionnel',
      comment: 'Grâce à EcoDeli, j’ai pu arrondir mes fins de mois facilement tout en aidant des voisins. Très belle expérience.',
      photo: '/avatars/livreur1.webp'
    },
    {
      name: 'Amina B.',
      role: 'Prestataire de services',
      comment: 'En tant qu’auto-entrepreneure, EcoDeli m’a permis de trouver plus de missions locales et de rencontrer des personnes formidables.',
      photo: '/avatars/prestataire.webp'
    }
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0070C0] mb-12">Ils parlent d’EcoDeli</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#F0F9F4] p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center text-gray-800"
            >
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
              <p className="text-sm text-green-700 mb-2">{testimonial.role}</p>
              <p className="text-sm text-gray-600">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
