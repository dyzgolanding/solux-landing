'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const testimonials = [
  {
    name: 'Rodrigo Fuentes',
    location: 'Las Condes, Santiago',
    initials: 'RF',
    rating: 5,
    text: 'El proceso fue increíblemente fácil. Cotice en línea, en dos días me contactaron con la propuesta, y en tres semanas ya tenía los paneles funcionando. Mi cuenta de luz bajó un 70%.',
    saving: '-70% cuenta de luz',
    color: '#F5A623',
  },
  {
    name: 'Juan Cortéz', 
    location: 'Chile, Kennedy',
    initials: 'ES',
    rating: 5,
    text: 'Tenia miedo de que me metieran el pico por que es lo que me hacen normalmente y ya estaba harto pero esta vez no fue asi, gracias SOLUX',
    saving: '-58% cuenta de luz',
    color: '#0A6EBD',
  },
  {
    name: 'Carlos Espinoza',
    location: 'Viña del Mar',
    initials: 'CE',
    rating: 5,
    text: 'Inversión recuperada en 5 años según me dijeron, y los números van perfectos. La app para monitorear la producción es increíble, me encanta ver cuánta energía genero cada día.',
    saving: '-62% cuenta de luz',
    color: '#22C55E',
  },
  {
    name: 'Patricia Lagos',
    location: 'La Florida, Santiago',
    initials: 'PL',
    rating: 5,
    text: 'El equipo de instalación fue muy profesional y ordenado. Dejaron todo limpio y el sistema funcionó perfectamente desde el primer día. Los recomiendo 100%.',
    saving: '-65% cuenta de luz',
    color: '#FBBF24',
  },
  {
    name: 'Martín Sepúlveda',
    location: 'Temuco',
    initials: 'MS',
    rating: 5,
    text: 'Pensé que en Temuco no llegaría la cobertura, pero SOLUX llegó sin problema. La propuesta fue exacta, el ahorro real se está cumpliendo mes a mes.',
    saving: '-55% cuenta de luz',
    color: '#60B4F7',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < rating ? '#F5A623' : 'none'}
          stroke={i < rating ? '#F5A623' : '#94A3B8'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  return (
    <section id="testimonios" ref={ref} className="py-24 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-sm font-semibold text-[#F5A623] mb-4">
            Clientes felices
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            Lo que dicen nuestros{' '}
            <span className="gradient-text">clientes</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-sm text-[#64748B]">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="#F5A623" stroke="#F5A623" />
              ))}
            </div>
            <span className="font-bold text-[#0A1628]">4.9</span>
            <span>— +500 reseñas verificadas</span>
          </div>
        </motion.div>

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-100 overflow-hidden">
            {/* Quote icon */}
            <Quote
              className="absolute top-6 right-8 w-16 h-16 opacity-5"
              style={{ color: testimonials[active].color }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <div className="flex items-start gap-5 mb-6">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: testimonials[active].color }}
                  >
                    {testimonials[active].initials}
                  </div>

                  <div>
                    <StarRating rating={testimonials[active].rating} />
                    <div className="font-bold text-[#0A1628] mt-1">{testimonials[active].name}</div>
                    <div className="text-sm text-[#94A3B8]">{testimonials[active].location}</div>
                  </div>

                  <div className="ml-auto">
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold"
                      style={{
                        backgroundColor: `${testimonials[active].color}15`,
                        color: testimonials[active].color,
                      }}
                    >
                      {testimonials[active].saving}
                    </span>
                  </div>
                </div>

                <blockquote className="text-[#374151] text-lg leading-relaxed italic">
                  "{testimonials[active].text}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#64748B] hover:bg-[#0A1628] hover:text-white hover:border-transparent transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 8,
                    height: 8,
                    backgroundColor: i === active ? testimonials[active].color : '#E2E8F0',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[#64748B] hover:bg-[#0A1628] hover:text-white hover:border-transparent transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Mini cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10"
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group relative p-4 rounded-2xl border transition-all duration-300 text-left ${i === active
                ? 'bg-[#0A1628] border-transparent'
                : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-200 hover:bg-white'
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <StarRating rating={t.rating} />
              </div>
              <div className={`text-xs font-semibold ${i === active ? 'text-white' : 'text-[#0A1628]'}`}>
                {t.name}
              </div>
              <div className={`text-xs ${i === active ? 'text-white/50' : 'text-[#94A3B8]'}`}>
                {t.location}
              </div>
            </button>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
