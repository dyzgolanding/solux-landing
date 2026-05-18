'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { DollarSign, UserCheck, Shield, Zap, Building2, Leaf, Clock } from 'lucide-react'
import { RevealText } from '@/components/ui/RevealText'

const cards = [
  {
    number: '01',
    tag: 'Ahorro real',
    title: 'Reduce hasta el 65% de tu boleta eléctrica',
    description: 'Nuestros clientes ahorran en promedio $65.000 al mes desde el primer mes de instalación.',
    stat: '$65.000',
    statLabel: 'ahorro promedio mensual',
    color: '#F5A623',
    Icon: DollarSign,
  },
  {
    number: '02',
    tag: 'Sin compromiso',
    title: 'Visita técnica gratuita y presupuesto exacto a medida',
    description: 'Un asesor visita tu hogar sin costo, evalúa tu techo y te entrega un presupuesto exacto. Sin presión ni letra chica.',
    stat: '$0',
    statLabel: 'costo de la visita técnica',
    color: '#22C55E',
    Icon: UserCheck,
  },
  {
    number: '03',
    tag: 'Respaldo garantizado',
    title: '1 año de garantía en equipos y mantención sin costo',
    description: 'Equipos instalados con 1 año de garantía y soporte técnico incluido. Sin costos adicionales de mantención durante el primer año.',
    stat: '1 año',
    statLabel: 'garantía + mantención incluida',
    color: '#0A6EBD',
    Icon: Shield,
  },
  {
    number: '04',
    tag: 'Experiencia comprobada',
    title: 'Trayectoria en proyectos industriales aplicada a tu hogar',
    description: 'Venimos del sector industrial: empresas, minería y bodegas. Ese rigor técnico lo aplicamos en cada instalación residencial.',
    stat: '2+ años',
    statLabel: 'en sector residencial',
    color: '#60B4F7',
    Icon: Building2,
  },
  {
    number: '05',
    tag: 'Retorno rápido',
    title: 'Recupera tu inversión en 4 a 6 años',
    description: 'Con el ahorro mensual acumulado, la instalación se paga sola. Los años siguientes son pura ganancia.',
    stat: '4-6 años',
    statLabel: 'retorno de inversión',
    color: '#FBBF24',
    Icon: Clock,
  },
  {
    number: '06',
    tag: 'Impacto real',
    title: 'Evita toneladas de CO₂ cada año',
    description: 'Un sistema típico SOLUX evita entre 1.5 y 3 toneladas de CO₂ anualmente. Energía limpia de verdad.',
    stat: '2 ton',
    statLabel: 'CO₂ evitado por año',
    color: '#22C55E',
    Icon: Leaf,
  },
]

const CARD_W = 320
const GAP = 24
// Total width of one set — animation moves exactly this far to loop seamlessly
const TRACK_UNIT = cards.length * (CARD_W + GAP)

export function ScrollCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section ref={ref} className="relative bg-[#0A1628] py-16 md:py-24 overflow-hidden">
      <style>{`
        @keyframes solux-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${TRACK_UNIT}px); }
        }
        .solux-track {
          animation: solux-marquee 32s linear infinite;
          will-change: transform;
        }
        .solux-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#F5A623]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#0A6EBD]/8 blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ y: 30 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center px-6 sm:px-12 lg:px-20 mb-12"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/15 text-xs font-semibold text-[#F5A623] mb-3">
          ¿Por qué SOLUX?
        </span>
        <RevealText className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {"Todo lo que necesitas,"}
          <br />
          <span className="gradient-text">sin complicaciones</span>
        </RevealText>
      </motion.div>

      {/* Marquee strip */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A1628, transparent)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A1628, transparent)' }}
        />

        {/* Scrolling track — duplicated for seamless loop */}
        <div
          className="solux-track flex"
          style={{ gap: GAP, width: TRACK_UNIT * 2, paddingLeft: GAP }}
        >
          {[...cards, ...cards].map((card, i) => {
            const Icon = card.Icon
            return (
              <div
                key={i}
                className="flex-shrink-0 relative bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden"
                style={{ width: CARD_W }}
              >
                {/* Top color line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ backgroundColor: card.color, opacity: 0.5 }}
                />

                {/* Background number */}
                <span className="absolute top-3 right-5 text-7xl font-black text-white/8 leading-none select-none pointer-events-none">
                  {card.number}
                </span>

                <div className="relative flex flex-col gap-5">
                  {/* Icon + tag */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${card.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} strokeWidth={2} />
                    </div>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${card.color}15`, color: card.color }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Stat */}
                  <div>
                    <p className="text-4xl font-black leading-none" style={{ color: card.color }}>
                      {card.stat}
                    </p>
                    <p className="text-white/35 text-xs mt-1">{card.statLabel}</p>
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-black text-white leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <a
          href="https://cotiza.soluxenergy.cl"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-black text-base hover:scale-105 transition-transform shadow-lg shadow-[#F5A623]/20"
        >
          Cotiza gratis ahora
        </a>
      </motion.div>
    </section>
  )
}
