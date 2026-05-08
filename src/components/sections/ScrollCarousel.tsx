'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { DollarSign, Shield, Zap, BarChart3, Leaf, Clock } from 'lucide-react'

const cards = [
  {
    number: '01',
    tag: 'Ahorro real',
    title: 'Reduce hasta el 65% de tu boleta eléctrica',
    description: 'Nuestros clientes ahorran en promedio $65.000 al mes desde el primer mes de instalación. Sin esperar, sin letra chica.',
    stat: '$65.000',
    statLabel: 'ahorro promedio mensual',
    color: '#F5A623',
    Icon: DollarSign,
  },
  {
    number: '02',
    tag: 'Sin inversión inicial',
    title: 'Cuotas que se pagan con el ahorro de tu boleta',
    description: 'Accede a financiamiento con cuotas que en muchos casos son menores al ahorro mensual en tu cuenta de luz.',
    stat: '$0',
    statLabel: 'inversión inicial requerida',
    color: '#22C55E',
    Icon: Zap,
  },
  {
    number: '03',
    tag: 'Garantía total',
    title: '25 años de garantía de rendimiento en tus paneles',
    description: 'Trabajamos con fabricantes líderes mundiales. Garantía de 25 años en rendimiento y 12 años en equipos.',
    stat: '25 años',
    statLabel: 'de garantía incluida',
    color: '#0A6EBD',
    Icon: Shield,
  },
  {
    number: '04',
    tag: 'Monitoreo 24/7',
    title: 'Controla tu producción de energía desde el celular',
    description: 'App incluida para ver en tiempo real cuánta energía produce tu techo, cuánto estás ahorrando y tu impacto ambiental.',
    stat: '24/7',
    statLabel: 'monitoreo en tiempo real',
    color: '#60B4F7',
    Icon: BarChart3,
  },
  {
    number: '05',
    tag: 'Retorno rápido',
    title: 'Recupera tu inversión en 4 a 6 años',
    description: 'Con el ahorro mensual acumulado, la instalación se paga sola. Los años siguientes son pura ganancia para ti.',
    stat: '4-6 años',
    statLabel: 'retorno de inversión',
    color: '#FBBF24',
    Icon: Clock,
  },
  {
    number: '06',
    tag: 'Impacto real',
    title: 'Evita toneladas de CO₂ cada año',
    description: 'Un sistema típico SOLUX evita entre 1.5 y 3 toneladas de CO₂ anualmente. Contribuye activamente al futuro del planeta.',
    stat: '2 ton',
    statLabel: 'CO₂ evitado por año',
    color: '#22C55E',
    Icon: Leaf,
  },
]

const CARD_WIDTH = 360
const CARD_GAP = 20

export function ScrollCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // scrollYProgress: 0 = section top at viewport bottom (entering), 1 = section bottom at viewport top (exiting)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Move enough to reveal ~3 extra cards beyond what's initially visible
  // Slow rate (~0.8px horizontal per 1px vertical) keeps the motion comfortable
  const totalMove = 3 * (CARD_WIDTH + CARD_GAP)

  // Start at x=0 as soon as section enters (card 01 visible), finish before section fully exits
  const rawX = useTransform(scrollYProgress, [0, 0.75], [0, -totalMove])
  const x = useSpring(rawX, { stiffness: 80, damping: 20, restDelta: 0.5 })
  const progressWidth = useTransform(scrollYProgress, [0, 0.75], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A1628] py-24"
      style={{ minHeight: '100vh' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#F5A623]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#0A6EBD]/8 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-6 sm:px-12 lg:px-20 mb-12 flex items-end justify-between">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/15 text-xs font-semibold text-[#F5A623] mb-3">
            ¿Por qué SOLUX?
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Todo lo que necesitas,<br />
            <span className="gradient-text">sin complicaciones</span>
          </h2>
        </div>

        {/* Progress bar */}
        <div className="hidden md:flex flex-col items-end gap-2">
          <span className="text-white/40 text-xs">{cards.length} razones</span>
          <div className="w-32 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#F5A623] to-[#0A6EBD]"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>

      {/* Scrolling cards */}
      <motion.div
        style={{ x, gap: CARD_GAP, paddingLeft: '5vw', paddingRight: '5vw' }}
        className="flex will-change-transform"
      >
        {cards.map((card) => {
          const Icon = card.Icon
          return (
            <div
              key={card.number}
              className="flex-shrink-0 relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden"
              style={{ width: CARD_WIDTH }}
            >
              {/* Background number */}
              <span className="absolute top-4 right-6 text-7xl font-black text-white/8 leading-none select-none pointer-events-none">
                {card.number}
              </span>

              {/* Color accent top bar */}
              <div className="absolute top-0 left-8 right-8 h-px" style={{ backgroundColor: card.color, opacity: 0.4 }} />

              <div className="relative flex flex-col h-full gap-5">
                {/* Icon + Tag */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${card.color}18` }}
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
                  <p className="text-5xl font-black leading-none" style={{ color: card.color }}>
                    {card.stat}
                  </p>
                  <p className="text-white/35 text-xs mt-1">{card.statLabel}</p>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-black text-white leading-snug mb-2">
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

        {/* CTA card */}
        <div
          className="flex-shrink-0 rounded-3xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-5 text-center p-8"
          style={{ width: 260 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#FBBF24] flex items-center justify-center shadow-2xl shadow-[#F5A623]/20">
            <Zap className="w-7 h-7 text-[#0A1628]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-black text-lg mb-1">¿Convencido?</p>
            <p className="text-white/40 text-sm">Tu propuesta en 2 minutos</p>
          </div>
          <a
            href="https://cotiza.soluxenergy.cl"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-black text-sm hover:scale-105 transition-transform shadow-lg"
          >
            Cotiza gratis →
          </a>
        </div>
      </motion.div>
    </section>
  )
}
