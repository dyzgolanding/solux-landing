'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
// Left column uses CSS animations (globals.css) to show content before JS loads
import { useRef } from 'react'
import { Zap, ChevronDown, Shield, Star, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315].map((angle) => ({
  x1: +(430 + Math.cos((angle * Math.PI) / 180) * 42).toFixed(4),
  y1: +(55 + Math.sin((angle * Math.PI) / 180) * 42).toFixed(4),
  x2: +(430 + Math.cos((angle * Math.PI) / 180) * 55).toFixed(4),
  y2: +(55 + Math.sin((angle * Math.PI) / 180) * 55).toFixed(4),
}))

const floatVariants = {
  animate: {
    y: [0, -18, -9, 0],
    rotate: [0, 1.5, -1, 0],
    transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' as const },
  },
}

const SolarHouseIllustration = () => (
  <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ground/base glow */}
    <ellipse cx="260" cy="390" rx="180" ry="20" fill="url(#groundGlow)" opacity="0.5" />

    {/* House body */}
    <rect x="100" y="210" width="320" height="180" rx="4" fill="url(#houseGrad)" />

    {/* House door */}
    <rect x="220" y="290" width="80" height="100" rx="4" fill="url(#doorGrad)" />
    <circle cx="290" cy="342" r="5" fill="#F5A623" />

    {/* House windows */}
    <rect x="120" y="240" width="60" height="55" rx="6" fill="url(#windowGrad)" />
    <line x1="150" y1="240" x2="150" y2="295" stroke="#60B4F7" strokeWidth="1.5" opacity="0.6" />
    <line x1="120" y1="267" x2="180" y2="267" stroke="#60B4F7" strokeWidth="1.5" opacity="0.6" />

    <rect x="340" y="240" width="60" height="55" rx="6" fill="url(#windowGrad)" />
    <line x1="370" y1="240" x2="370" y2="295" stroke="#60B4F7" strokeWidth="1.5" opacity="0.6" />
    <line x1="340" y1="267" x2="400" y2="267" stroke="#60B4F7" strokeWidth="1.5" opacity="0.6" />

    {/* Roof */}
    <path d="M80 215 L260 80 L440 215 Z" fill="url(#roofGrad)" />
    <path d="M80 215 L260 80 L440 215" stroke="url(#roofStroke)" strokeWidth="2" fill="none" />

    {/* Chimney */}
    <rect x="340" y="120" width="28" height="70" rx="2" fill="#152C52" />

    {/* Solar panels on roof */}
    {/* Panel Group 1 */}
    <g transform="rotate(-27, 200, 160)">
      <rect x="155" y="135" width="36" height="28" rx="2" fill="url(#panelGrad1)" stroke="#60B4F7" strokeWidth="0.5" />
      <line x1="155" y1="149" x2="191" y2="149" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
      <line x1="173" y1="135" x2="173" y2="163" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
    </g>
    <g transform="rotate(-27, 240, 148)">
      <rect x="195" y="125" width="36" height="28" rx="2" fill="url(#panelGrad1)" stroke="#60B4F7" strokeWidth="0.5" />
      <line x1="195" y1="139" x2="231" y2="139" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
      <line x1="213" y1="125" x2="213" y2="153" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
    </g>
    <g transform="rotate(-27, 200, 130)">
      <rect x="155" y="105" width="36" height="28" rx="2" fill="url(#panelGrad2)" stroke="#60B4F7" strokeWidth="0.5" />
      <line x1="155" y1="119" x2="191" y2="119" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
      <line x1="173" y1="105" x2="173" y2="133" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
    </g>
    <g transform="rotate(-27, 240, 118)">
      <rect x="195" y="95" width="36" height="28" rx="2" fill="url(#panelGrad2)" stroke="#60B4F7" strokeWidth="0.5" />
      <line x1="195" y1="109" x2="231" y2="109" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
      <line x1="213" y1="95" x2="213" y2="123" stroke="#1A8FE3" strokeWidth="0.8" opacity="0.7" />
    </g>

    {/* Energy flow dots */}
    <circle cx="260" cy="210" r="4" fill="#F5A623">
      <animate attributeName="cy" values="210;195;210" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="260" cy="230" r="3" fill="#FBBF24" opacity="0.7">
      <animate attributeName="cy" values="230;215;230" dur="2s" begin="0.3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" begin="0.3s" repeatCount="indefinite" />
    </circle>

    {/* Sun in corner */}
    <circle cx="430" cy="55" r="35" fill="url(#sunGrad)" opacity="0.9" />
    {SUN_RAYS.map((ray, i) => (
      <line
        key={i}
        x1={ray.x1}
        y1={ray.y1}
        x2={ray.x2}
        y2={ray.y2}
        stroke="#F5A623"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.8"
      />
    ))}

    {/* Floating energy card */}
    <rect x="20" y="50" width="130" height="60" rx="12" fill="rgba(15,32,64,0.9)" stroke="rgba(96,180,247,0.3)" strokeWidth="1" />
    <circle cx="48" cy="80" r="14" fill="url(#greenBadge)" />
    <text x="48" y="85" textAnchor="middle" fontSize="14" fill="white">⚡</text>
    <text x="72" y="73" fontSize="9" fill="#94A3B8" fontFamily="system-ui">Ahorro mensual</text>
    <text x="72" y="88" fontSize="15" fontWeight="700" fill="white" fontFamily="system-ui">-65%</text>

    {/* Floating savings card */}
    <rect x="360" y="290" width="140" height="65" rx="12" fill="rgba(15,32,64,0.9)" stroke="rgba(245,166,35,0.3)" strokeWidth="1" />
    <circle cx="388" cy="322" r="14" fill="url(#goldBadge)" />
    <text x="388" y="327" textAnchor="middle" fontSize="12" fill="#0A1628">$</text>
    <text x="412" y="315" fontSize="9" fill="#94A3B8" fontFamily="system-ui">Retorno inversión</text>
    <text x="412" y="330" fontSize="15" fontWeight="700" fill="#F5A623" fontFamily="system-ui">4-6 años</text>

    {/* Gradients */}
    <defs>
      <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A3A68" />
        <stop offset="100%" stopColor="#152C52" />
      </linearGradient>
      <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0F2040" />
        <stop offset="100%" stopColor="#0A1628" />
      </linearGradient>
      <linearGradient id="roofStroke" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#60B4F7" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F5A623" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="panelGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E4B8B" />
        <stop offset="100%" stopColor="#0A6EBD" />
      </linearGradient>
      <linearGradient id="panelGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0A6EBD" />
        <stop offset="100%" stopColor="#1A8FE3" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F5A623" />
      </linearGradient>
      <linearGradient id="doorGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0F2040" />
        <stop offset="100%" stopColor="#0A1628" />
      </linearGradient>
      <linearGradient id="windowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1A3A68" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#60B4F7" stopOpacity="0.2" />
      </linearGradient>
      <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0A6EBD" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#0A6EBD" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="greenBadge" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#16A34A" />
      </radialGradient>
      <radialGradient id="goldBadge" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F5A623" />
      </radialGradient>
    </defs>
  </svg>
)

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section ref={sectionRef} className="relative min-h-screen hero-mesh flex flex-col overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#0A6EBD]/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1A8FE3]/5 blur-[150px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Container className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left column — content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="flex items-center animate-hero-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm font-medium text-white/80 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                🇨🇱 Empresa chilena de energía solar residencial
              </span>
            </div>

            {/* Headline */}
            <div className="animate-hero-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Tu techo,{' '}
                <span className="relative">
                  <span className="gradient-text">tu energía</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 8 Q75 2 150 6 Q225 10 298 4"
                      stroke="url(#underlineGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#F5A623" />
                        <stop offset="100%" stopColor="#0A6EBD" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                <span className="text-white/90">sin complicaciones.</span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="animate-hero-3 text-lg sm:text-xl text-white/60 leading-relaxed max-w-lg">
              Empresa chilena especializada en energía solar residencial. Trabajamos con{' '}
              <span className="text-white/80 font-medium">productos premium seleccionados por su calidad y durabilidad</span>,{' '}
              evaluando cada vivienda de forma personalizada para ofrecerte la mejor solución.
            </p>

            {/* CTAs */}
            <div className="animate-hero-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://cotiza.soluxenergy.cl"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-bold text-base sm:text-lg shadow-2xl hover:shadow-[0_0_40px_rgba(245,166,35,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Zap className="w-5 h-5" strokeWidth={2.5} />
                Cotiza gratis — 2 minutos
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl border border-white/20 text-white font-semibold text-base sm:text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                ¿Cómo funciona?
              </a>
            </div>

            {/* Trust indicators */}
            <div className="animate-hero-5 flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                Garantía 25 años
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Star className="w-4 h-4 text-[#F5A623]" />
                Instaladores certificados
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Clock className="w-4 h-4 text-[#60B4F7]" />
                Cotización en 2 min
              </div>
            </div>
          </div>

          {/* Right column — illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: illustrationY }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative w-full max-w-lg lg:max-w-full"
            >
              {/* Glow behind illustration */}
              <div className="absolute inset-0 rounded-full bg-[#0A6EBD]/20 blur-[80px] scale-75" />
              <SolarHouseIllustration />
            </motion.div>

            {/* Floating particle dots */}
            {[
              { size: 6, top: '15%', left: '8%', color: '#F5A623', delay: 0 },
              { size: 4, top: '70%', left: '5%', color: '#60B4F7', delay: 1.5 },
              { size: 8, top: '30%', right: '5%', color: '#22C55E', delay: 0.8 },
              { size: 5, bottom: '20%', right: '10%', color: '#F5A623', delay: 2 },
            ].map((dot, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: dot.size,
                  height: dot.size,
                  backgroundColor: dot.color,
                  top: dot.top,
                  left: dot.left,
                  right: (dot as { right?: string }).right,
                  bottom: (dot as { bottom?: string }).bottom,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3 + i,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col items-center gap-2 pb-4"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Descubre más</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
