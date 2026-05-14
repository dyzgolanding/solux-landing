'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const stats = [
  { value: 5, suffix: ' años', label: 'De experiencia', color: '#F5A623', description: 'En el mercado solar chileno' },
  { value: 10, suffix: '+', label: 'Hogares instalados', color: '#22C55E', description: 'Clientes satisfechos' },
  { value: 100, suffix: '%', label: 'Trámites SEC', color: '#60B4F7', description: 'Gestionados por nosotros' },
  { value: 6, suffix: ' días', label: 'Instalación completa', color: '#FBBF24', description: 'Desde que das el sí' },
]

function CountUp({
  target,
  suffix,
  started,
}: {
  target: number
  suffix: string
  started: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target])

  return (
    <span>
      {Math.round(count)}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <section ref={ref} className="relative py-12 sm:py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A6EBD]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0A6EBD]/20 to-transparent" />

      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                opacity: { duration: 0.5, delay: i * 0.1 },
                y: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                scale: { type: 'spring', stiffness: 280, damping: 18, delay: i * 0.1 },
              }}
              className="relative group flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-400"
            >
              <div className="w-10 h-1 rounded-full mb-4" style={{ backgroundColor: stat.color }} />
              <div className="text-3xl sm:text-5xl font-black mb-2 tabular-nums" style={{ color: stat.color }}>
                <CountUp target={stat.value} suffix={stat.suffix} started={isInView} />
              </div>
              <div className="text-[#0A1628] font-bold text-sm sm:text-base mb-1">{stat.label}</div>
              <div className="text-[#94A3B8] text-xs sm:text-sm">{stat.description}</div>
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-xs text-[#94A3B8] mt-8"
        >
          * Garantías según fabricantes líderes con los que trabajamos. Ahorro estimado según consumo promedio del hogar.
        </motion.p>
      </Container>
    </section>
  )
}
