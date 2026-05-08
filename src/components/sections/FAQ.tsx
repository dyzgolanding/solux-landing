'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const faqs = [
  {
    question: '¿Cuánto puedo ahorrar con paneles solares?',
    answer:
      'El ahorro promedio de nuestros clientes es de un 65% en su cuenta de luz. Dependiendo de tu consumo y las características de tu hogar, puedes ahorrar entre un 40% y un 90%. En tu cotización personalizada verás tu ahorro estimado exacto.',
  },
  {
    question: '¿Cuánto tiempo dura la instalación?',
    answer:
      'La instalación física en tu hogar toma 1-2 días. Sin embargo, el proceso completo (cotización, diseño, instalación y certificación SEC) toma entre 4-8 semanas. Todo depende de la complejidad de tu proyecto y los tiempos de la SEC.',
  },
  {
    question: '¿Necesito salir de casa durante la instalación?',
    answer:
      'No necesariamente. Nuestros equipos de instalación son completamente autónomos. Solo necesitamos acceso al techo y al tablero eléctrico. Te coordinamos el horario con anticipación.',
  },
  {
    question: '¿Qué pasa en los días nublados o de lluvia?',
    answer:
      'Los paneles solares funcionan con luz, no con sol directo. En días nublados producen entre un 10% y 25% de su capacidad máxima. Chile tiene una excelente irradiación solar en la mayoría de sus regiones, incluyendo zonas del sur.',
  },
  {
    question: '¿Hay opciones de financiamiento?',
    answer:
      'Sí. Trabajamos con múltiples opciones de financiamiento, incluyendo cuotas mensuales que en muchos casos son inferiores al ahorro que generan los paneles. La inversión muchas veces se "autopaga" desde el primer mes.',
  },
  {
    question: '¿Qué pasa si genero más energía de la que consumo?',
    answer:
      'En Chile, la Ley 20.936 (Net Billing) te permite inyectar el excedente de energía a la red y que la distribuidora te lo descuente de tu próxima boleta. Básicamente, tu medidor gira al revés.',
  },
  {
    question: '¿Qué garantías incluye el sistema?',
    answer:
      'Los paneles tienen garantía de rendimiento de 25 años (mínimo 80% de eficiencia) y garantía de producto de 12 años. Los inversores tienen garantía de 5-10 años. SOLUX te da además garantía de instalación de 5 años.',
  },
  {
    question: '¿Funciona en departamentos?',
    answer:
      'Actualmente nos especializamos en casas con techo propio. Para departamentos el proceso es más complejo ya que requiere autorización de la administración del edificio y la cotización en copropiedad. Contáctanos y evaluamos tu caso.',
  },
]

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'bg-[#0A1628] border-[#0A6EBD]/40 shadow-xl'
          : 'bg-white border-slate-100 hover:border-slate-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`font-semibold text-base transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-[#0A1628]'
          }`}
        >
          {question}
        </span>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-[#F5A623] text-[#0A1628]' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" strokeWidth={2.5} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" ref={ref} className="py-24 bg-[#F8FAFC] overflow-hidden">
      <Container size="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold text-[#0A6EBD] mb-4">
            Preguntas frecuentes
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            ¿Tienes dudas?{' '}
            <span className="gradient-text">Las respondemos</span>
          </h2>
          <p className="text-lg text-[#64748B]">
            Todo lo que necesitas saber antes de dar el paso.
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Still questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-[#64748B] mb-4">¿Tu pregunta no está aquí?</p>
          <a
            href="https://wa.me/56934015468?text=Hola%20SOLUX%20Energy%2C%20tengo%20una%20consulta%20sobre%20paneles%20solares"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#22C55E] text-white font-semibold hover:bg-[#16A34A] transition-colors duration-200 shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
