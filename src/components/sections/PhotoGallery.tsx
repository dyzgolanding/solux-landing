'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

const photos = [
  {
    src: '/images/paneles-casa-ladera-aerea-1.jpeg',
    alt: 'Casa moderna con instalación solar, vista aérea',
    label: 'Las Condes, Santiago',
  },
  {
    src: '/images/paneles-techo-montana-panorama.jpeg',
    alt: 'Paneles solares con vista panorámica',
    label: 'Lo Barnechea',
  },
  {
    src: '/images/paneles-casa-montana-vista.jpeg',
    alt: 'Casa en altura con sistema solar instalado',
    label: 'Chicureo',
  },
  {
    src: '/images/estructura-metalica-1.jpeg',
    alt: 'Instalación de estructura metálica para paneles',
    label: 'Proceso de instalación',
  },
  {
    src: '/images/instalacion-inversor-exterior.jpeg',
    alt: 'Técnico certificado instalando equipo solar',
    label: 'Equipo técnico certificado',
  },
  {
    src: '/images/casa-montana-frontal.jpeg',
    alt: 'Vista frontal de casa con instalación solar completa',
    label: 'La Dehesa',
  },
]

export function PhotoGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ y: 30 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-sm font-semibold text-[#0A6EBD] mb-4">
            Proyectos reales
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0A1628] leading-tight">
            Instalaciones en{' '}
            <span className="gradient-text-blue">hogares chilenos</span>
          </h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto mt-4">
            Cada proyecto es único. Adaptamos la instalación a tu hogar para el máximo rendimiento.
          </p>
        </motion.div>

        {/* Mobile: 2-col uniform grid */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="relative h-36 rounded-2xl overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-2.5 left-3 text-[11px] text-white/80 font-medium leading-tight">{photo.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Desktop: bento grid — large photo top-left (2×2), 4 small on right + bottom */}
        <div
          className="hidden sm:grid grid-cols-3 gap-4"
          style={{ gridTemplateRows: 'repeat(3, 220px)' }}
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-3xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes={i === 0 ? '(max-width: 1280px) 66vw, 800px' : '(max-width: 1280px) 33vw, 400px'}
              />
              {/* Gradient + label on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-4 left-4 text-sm text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
