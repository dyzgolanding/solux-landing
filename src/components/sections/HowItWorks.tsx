'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquare, Hammer, TrendingUp } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Cotiza en minutos',
    description:
      'Responde unas pocas preguntas sobre tu hogar y consumo eléctrico. En menos de 2 minutos te mostramos una propuesta personalizada con tu ahorro estimado.',
    color: '#F5A623',
    bg: 'rgba(245,166,35,0.08)',
    border: 'rgba(245,166,35,0.2)',
  },
  {
    number: '02',
    icon: Hammer,
    title: 'Instalación profesional',
    description:
      'Nuestro equipo certificado instala los paneles en tu hogar. Nos encargamos de todos los trámites técnicos y la certificación con la SEC.',
    color: '#0A6EBD',
    bg: 'rgba(10,110,189,0.08)',
    border: 'rgba(10,110,189,0.2)',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Ahorra desde el mes 1',
    description:
      'Desde el primer mes verás la diferencia en tu cuenta de luz. Monitorea tu producción de energía en tiempo real y ve crecer tus ahorros.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.2)',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como-funciona" ref={ref} className="py-24 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-sm font-semibold text-[#0A6EBD] mb-4">
            Así de simple
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            Tres pasos para{' '}
            <span className="gradient-text">empezar a ahorrar</span>
          </h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Sin burocracia, sin sorpresas. Te acompañamos en cada etapa del proceso.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting line */}
          <motion.div
            className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#F5A623]/40 via-[#0A6EBD]/40 to-[#22C55E]/40"
            style={{ transformOrigin: '0%' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ backgroundColor: step.bg, border: `2px solid ${step.border}` }}
                  >
                    <Icon className="w-9 h-9" style={{ color: step.color }} strokeWidth={1.5} />
                  </div>
                  {/* Step number bubble */}
                  <div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Number label */}
                <span
                  className="text-xs font-black tracking-widest mb-2 uppercase"
                  style={{ color: step.color }}
                >
                  Paso {step.number}
                </span>

                <h3 className="text-xl font-bold text-[#0A1628] mb-3">{step.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm sm:text-base">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a
            href="https://cotiza.soluxenergy.cl"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0A1628] text-white font-bold text-lg hover:bg-[#0F2040] hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Quiero cotizar ahora
            <span className="text-[#F5A623]">→</span>
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
