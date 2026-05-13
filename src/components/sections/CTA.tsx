'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-[#0A1628]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A6EBD]/30 via-[#0A1628] to-[#F5A623]/10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A6EBD]/60 to-transparent" />

      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0A6EBD]/15 blur-[100px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F5A623]/10 blur-[100px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Container size="md" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-sm font-medium text-white/70 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Cotización 100% gratuita, sin compromisos
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Empieza a ahorrar
            <br />
            <span className="gradient-text">desde hoy</span>
          </h2>

          <p className="text-base sm:text-xl text-white/50 mb-10 max-w-lg mx-auto">
            Miles de hogares en Chile ya se benefician de la energía solar.
            <br />
            <span className="text-white/70">¿Por qué esperar?</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="https://cotiza.soluxenergy.cl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-7 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-black text-lg sm:text-xl shadow-2xl hover:shadow-[0_0_50px_rgba(245,166,35,0.5)] transition-shadow duration-300"
            >
              <Zap className="w-6 h-6" strokeWidth={2.5} />
              Cotiza gratis ahora
            </motion.a>

            <a
              href="https://wa.me/56934015468?text=Hola%20SOLUX%20Energy%2C%20quiero%20información%20sobre%20paneles%20solares"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl border border-white/20 text-white font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              Habla con un asesor
            </a>
          </div>

          {/* Trust tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/40"
          >
            {[
              '✓ Sin inversión inicial',
              '✓ Garantía 25 años',
              '✓ Certificación SEC incluida',
              '✓ Sin letra chica',
            ].map((item) => (
              <span key={item} className="hover:text-white/70 transition-colors duration-200">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
