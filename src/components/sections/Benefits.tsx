'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UserCheck, Shield, Zap, Building2, Clock, Leaf } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { TiltCard } from '@/components/ui/TiltCard'
import { RevealText } from '@/components/ui/RevealText'

const benefits = [
  {
    icon: UserCheck,
    title: 'Visita técnica gratuita',
    description: 'Un asesor visita tu hogar sin costo para evaluar tu techo y entregarte un presupuesto exacto a medida. Sin compromiso, sin letra chica.',
    color: '#22C55E',
    tag: 'Sin compromiso',
  },
  {
    icon: Shield,
    title: 'Garantía y soporte 1 año',
    description: '1 año de garantía en equipos instalados y mantención técnica sin costo incluida. Tu instalación respaldada desde el primer día.',
    color: '#0A6EBD',
    tag: 'Respaldo total',
  },
  {
    icon: Zap,
    title: 'Tecnología premium',
    description: 'Trabajamos con los mejores fabricantes del mundo. Paneles de última generación con la mayor eficiencia del mercado.',
    color: '#F5A623',
    tag: 'Top mundial',
  },
  {
    icon: Building2,
    title: 'Trayectoria en proyectos exigentes',
    description: 'Venimos del sector industrial: empresas, minería y bodegas. Esa experiencia técnica y de rigor la aplicamos en cada hogar.',
    color: '#60B4F7',
    tag: 'Experiencia comprobada',
  },
  {
    icon: Clock,
    title: 'Instalación rápida',
    description: 'Proceso ágil de principio a fin. Desde la cotización hasta los paneles funcionando en tu techo en semanas.',
    color: '#FBBF24',
    tag: 'Sin demoras',
  },
  {
    icon: Leaf,
    title: 'Impacto ambiental real',
    description: 'Cada hogar solar evita toneladas de CO₂ al año. Contribuye activamente al futuro del planeta.',
    color: '#22C55E',
    tag: 'Energía limpia',
  },
]

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section id="beneficios" ref={ref} className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ y: 30 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#22C55E] mb-4">
            ¿Por qué SOLUX?
          </span>
          <RevealText className="text-3xl sm:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            {"Todo lo que necesitas, "}
            <span className="gradient-text-blue">sin complicaciones</span>
          </RevealText>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Nos encargamos de absolutamente todo. Tú solo disfrutas los ahorros.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard
                  intensity={8}
                  className="group relative bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-400 overflow-hidden h-full"
                >
                  {/* Hover gradient background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-400 rounded-3xl"
                    style={{ backgroundColor: benefit.color }}
                  />

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-5 group-hover:opacity-10 transition-opacity duration-400"
                    style={{ backgroundColor: benefit.color }}
                  />

                  {/* Tag */}
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold mb-5"
                    style={{
                      backgroundColor: `${benefit.color}15`,
                      color: benefit.color,
                    }}
                  >
                    {benefit.tag}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${benefit.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: benefit.color }} strokeWidth={2} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0A1628] mb-2">{benefit.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{benefit.description}</p>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
