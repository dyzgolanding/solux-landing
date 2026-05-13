'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ClipboardList, FileSearch, Wrench, BadgeCheck, Wallet } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const steps = [
  {
    icon: ClipboardList,
    title: 'Cotización online',
    description: 'Respondes unas preguntas básicas sobre tu vivienda en 2 minutos. Gratis, sin compromisos.',
    time: '2 minutos',
    color: '#F5A623',
  },
  {
    icon: FileSearch,
    title: 'Propuesta personalizada',
    description: 'Usamos tecnología satelital e información de tu consumo para generarte una propuesta exacta y a medida.',
    time: '24-48 horas',
    color: '#60B4F7',
  },
  {
    icon: Wrench,
    title: 'Instalación profesional',
    description: 'Nuestro equipo certificado instala todo en tu hogar. Nos encargamos de los permisos y la coordinación.',
    time: '1-2 días',
    color: '#0A6EBD',
  },
  {
    icon: BadgeCheck,
    title: 'Certificación SEC',
    description: 'Gestionamos todos los trámites con la Superintendencia de Electricidad y Combustibles por ti.',
    time: '2-4 semanas',
    color: '#22C55E',
  },
  {
    icon: Wallet,
    title: 'Comienza a ahorrar',
    description: 'Tu sistema queda activo y conectado a la red. Desde el primer mes verás el impacto en tu boleta.',
    time: 'Para siempre',
    color: '#FBBF24',
  },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" ref={ref} className="py-16 md:py-24 bg-[#0A1628] overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-[#F5A623]/5 blur-[80px]" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-[#0A6EBD]/10 blur-[80px]" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm font-semibold text-[#F5A623] mb-4">
            El proceso completo
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            De cero a{' '}
            <span className="gradient-text">energía solar</span>
            <br />
            paso a paso
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Transparencia total en cada etapa. Sabes exactamente qué pasa y cuándo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F5A623]/50 via-[#0A6EBD]/50 to-[#22C55E]/50 lg:-translate-x-px" />

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isRight = i % 2 !== 0

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 pb-8 md:pb-12 ${
                    isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } flex-row`}
                >
                  {/* Mobile: dot on left line */}
                  <div className="flex-shrink-0 flex flex-col items-center lg:hidden">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/10 relative z-10"
                      style={{ backgroundColor: `${step.color}20`, borderColor: `${step.color}40` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Desktop: left content */}
                  <div className={`hidden lg:flex flex-1 ${isRight ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
                    {!isRight ? (
                      <div className="text-right max-w-xs">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                          style={{ backgroundColor: `${step.color}20`, color: step.color }}
                        >
                          {step.time}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    ) : (
                      <div className="text-left max-w-xs">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                          style={{ backgroundColor: `${step.color}20`, color: step.color }}
                        >
                          {step.time}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Desktop: center icon */}
                  <div className="hidden lg:flex flex-shrink-0 flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl relative z-10 -translate-x-px"
                      style={{
                        backgroundColor: `${step.color}20`,
                        border: `2px solid ${step.color}60`,
                        boxShadow: `0 0 30px ${step.color}20`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.8} />
                    </div>
                    {/* Step number */}
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-[#0A1628] mt-2"
                      style={{ backgroundColor: step.color }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Desktop: right content placeholder */}
                  <div className="hidden lg:flex flex-1" />

                  {/* Mobile content */}
                  <div className="lg:hidden flex-1">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
                      style={{ backgroundColor: `${step.color}20`, color: step.color }}
                    >
                      {step.time}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
