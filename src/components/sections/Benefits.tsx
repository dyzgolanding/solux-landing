'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, Shield, Zap, BarChart3, Clock, Leaf } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { TiltCard } from '@/components/ui/TiltCard'

const benefits = [
  {
    icon: DollarSign,
    title: 'Sin inversión inicial',
    description: 'Accede a financiamiento con cuotas que en muchos casos son menores al ahorro mensual en tu cuenta de luz.',
    color: '#22C55E',
    tag: 'Financiamiento disponible',
  },
  {
    icon: Shield,
    title: 'Garantía total 25 años',
    description: 'Paneles con garantía de 25 años de rendimiento y 12 años en equipos. Tu inversión protegida por décadas.',
    color: '#0A6EBD',
    tag: 'Máxima protección',
  },
  {
    icon: Zap,
    title: 'Tecnología premium',
    description: 'Trabajamos con los mejores fabricantes del mundo. Paneles de última generación con la mayor eficiencia del mercado.',
    color: '#F5A623',
    tag: 'Top mundial',
  },
  {
    icon: BarChart3,
    title: 'Monitoreo en tiempo real',
    description: 'Sigue tu producción de energía, consumo y ahorro desde tu celular. Acceso 24/7 a tus datos solares.',
    color: '#60B4F7',
    tag: 'App incluida',
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
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="beneficios" ref={ref} className="py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#22C55E] mb-4">
            ¿Por qué SOLUX?
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            Todo lo que necesitas,{' '}
            <span className="gradient-text-blue">sin complicaciones</span>
          </h2>
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
                  className="group relative bg-white rounded-3xl p-7 border border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-400 overflow-hidden h-full"
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
