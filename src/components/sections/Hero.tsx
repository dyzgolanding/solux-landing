'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Shield, Star, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'

/* ── Solar house cross-section illustration ─────────────────────────────── */
const SolarSystemSchematic = () => {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]

  return (
    <svg viewBox="0 0 500 410" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Panel gradient */}
        <linearGradient id="pFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#2A80D8"/>
          <stop offset="55%"  stopColor="#0A52A0"/>
          <stop offset="100%" stopColor="#051830"/>
        </linearGradient>
        {/* Roof gradient */}
        <linearGradient id="roofG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#CC2222"/>
          <stop offset="100%" stopColor="#991515"/>
        </linearGradient>
        {/* House interior gradient */}
        <linearGradient id="intG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E8EFF8"/>
          <stop offset="100%" stopColor="#DDE6F2"/>
        </linearGradient>
        {/* Full roof clip (for glow) */}
        <clipPath id="roofClip">
          <path d="M 45 154 L 252 36 L 460 154 Z"/>
        </clipPath>
        {/* Horizontal clip — panels stop cleanly at the eave, no diagonal cut */}
        <clipPath id="eaveClip">
          <rect x="0" y="0" width="500" height="154"/>
        </clipPath>
        {/* Orange arrowhead marker */}
        <marker id="arrO" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#F5A623"/>
        </marker>
        {/* Bulb glow */}
        <radialGradient id="bulbG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FBBF24" stopOpacity="1"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <style>{`
        @keyframes fw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
        @keyframes bulbP { 0%,100% { opacity: 0.22; } 50% { opacity: 0.55; } }
        @keyframes sunP  { 0%,100% { opacity: 0.18; } 50% { opacity: 0.45; } }
        .fwire { animation: fw 0.85s linear infinite; }
        .fbulb { animation: bulbP 1.6s ease-in-out infinite; }
        .fsun  { animation: sunP  2s   ease-in-out infinite; }
      `}</style>

      {/* ═══════════ HOUSE BODY ═══════════ */}
      <rect x="80" y="154" width="372" height="244" fill="url(#intG)" stroke="#B8C8D8" strokeWidth="1.5"/>

      {/* ═══════════ ROOF ═══════════ */}
      <path d="M 45 156 L 252 36 L 460 156 Z" fill="url(#roofG)"/>
      <path d="M 45 156 L 252 36 L 460 156"   stroke="#881212" strokeWidth="1.5" fill="none"/>
      {/* Eave lip */}
      <rect x="45" y="152" width="415" height="8" rx="1" fill="#AA1A1A"/>

      {/* ═══════════ SOLAR PANELS ═══════════ */}
      {/* Strategy: rotate(29.5°) = exact slope angle.
          Center cy=110 is 7px BELOW the slope at cx=370 (slope_y=103),
          so the entire top edge lands safely inside the roof triangle.
          eaveClip cuts the bottom cleanly at y=154 — no diagonal clip ever. */}
      <g clipPath="url(#roofClip)">
        <ellipse cx="370" cy="110" rx="88" ry="38" fill="#F5A623" opacity="0.09"
          transform="rotate(29.5, 370, 110)"/>
      </g>
      <g clipPath="url(#eaveClip)" transform="rotate(29.5, 370, 110)">
        {([0, 1] as const).map(row =>
          ([0, 1, 2] as const).map(col => (
            <g key={`${row}${col}`}>
              <rect
                x={306 + col * 44} y={110 + row * 30}
                width="40" height="26" rx="2"
                fill="url(#pFill)" stroke="#60B4F7" strokeWidth="1.2"/>
              <line x1={306+col*44}    y1={110+row*30+8}  x2={346+col*44} y2={110+row*30+8}  stroke="#1A70CC" strokeWidth="0.8" opacity="0.7"/>
              <line x1={306+col*44}    y1={110+row*30+17} x2={346+col*44} y2={110+row*30+17} stroke="#1A70CC" strokeWidth="0.8" opacity="0.7"/>
              <line x1={306+col*44+13} y1={110+row*30}    x2={306+col*44+13} y2={136+row*30} stroke="#1A70CC" strokeWidth="0.8" opacity="0.7"/>
              <line x1={306+col*44+27} y1={110+row*30}    x2={306+col*44+27} y2={136+row*30} stroke="#1A70CC" strokeWidth="0.8" opacity="0.7"/>
            </g>
          ))
        )}
      </g>
      {/* Redraw left-slope fill OVER panels to hide any tiny overflow left of peak */}
      <path d="M 45 156 L 252 36 L 252 156 Z" fill="url(#roofG)"/>

      {/* ═══════════ SUN ═══════════ */}
      {/* Outer pulse glow */}
      <circle cx="68" cy="66" r="48" fill="#F5A623" className="fsun"/>
      {/* Sun body */}
      <circle cx="68" cy="66" r="30" fill="#FBBF24" opacity="0.95"/>
      <circle cx="68" cy="66" r="22" fill="#FDE68A"/>
      {/* Rays */}
      {rays.map((a, i) => {
        const rad = (a * Math.PI) / 180
        return (
          <line key={i}
            x1={68 + Math.cos(rad) * 33} y1={66 + Math.sin(rad) * 33}
            x2={68 + Math.cos(rad) * 48} y2={66 + Math.sin(rad) * 48}
            stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round"/>
        )
      })}

      {/* ═══════════ RADIATION ARROWS (sun → panels) ═══════════ */}
      <line x1="107" y1="46" x2="218" y2="82"  stroke="#F5A623" strokeWidth="6.5" strokeLinecap="round" opacity="0.92" markerEnd="url(#arrO)"/>
      <line x1="109" y1="65" x2="222" y2="101" stroke="#F5A623" strokeWidth="6.5" strokeLinecap="round" opacity="0.74" markerEnd="url(#arrO)"/>
      <line x1="106" y1="84" x2="214" y2="118" stroke="#F5A623" strokeWidth="5"   strokeLinecap="round" opacity="0.50" markerEnd="url(#arrO)"/>

      {/* ═══════════ EXTERIOR WALLS ═══════════ */}
      <rect x="80"  y="154" width="15" height="244" fill="#D0DCE8" stroke="#B0C0D0" strokeWidth="1"/>
      <rect x="438" y="154" width="15" height="244" fill="#D0DCE8" stroke="#B0C0D0" strokeWidth="1"/>
      {/* Foundation */}
      <rect x="68" y="396" width="410" height="8" rx="2" fill="#8A9BB0"/>

      {/* ═══════════ BALCONY (left, upper floor) ═══════════ */}
      <rect x="26" y="188" width="56" height="64" fill="#E0EAF4" stroke="#B0C0D0" strokeWidth="1.5"/>
      {/* Top rail */}
      <rect x="26" y="188" width="56" height="5" rx="1" fill="#9AAABB"/>
      {/* Bottom slab */}
      <rect x="23" y="249" width="62" height="5" rx="1" fill="#9AAABB"/>
      {/* Posts */}
      {[32, 45, 58, 71].map((x) => (
        <rect key={x} x={x} y="193" width="3.5" height="54" rx="1.5" fill="#AABCCC"/>
      ))}

      {/* ═══════════ FLOOR DIVIDER ═══════════ */}
      <rect x="80" y="254" width="372" height="6" fill="#C0CCD8" stroke="#AABBC8" strokeWidth="0.5"/>

      {/* ═══════════ INTERIOR DIVIDERS ═══════════ */}
      {/* Ground floor: 3 sections */}
      <line x1="202" y1="260" x2="202" y2="396" stroke="#B0BFCC" strokeWidth="1.5" strokeDasharray="5,3"/>
      <line x1="322" y1="260" x2="322" y2="396" stroke="#B0BFCC" strokeWidth="1.5" strokeDasharray="5,3"/>
      {/* Upper floor: 2 sections */}
      <line x1="258" y1="154" x2="258" y2="260" stroke="#B0BFCC" strokeWidth="1.5" strokeDasharray="5,3"/>

      {/* ═══════════ UPPER FLOOR ═══════════ */}
      {/* Ceiling line */}
      <rect x="80" y="154" width="372" height="5" fill="#C8D6E2"/>

      {/* Window (upper left) */}
      <rect x="98" y="172" width="78" height="54" rx="3" fill="#BAD8F8" stroke="#7CBAE8" strokeWidth="1.5"/>
      <line x1="137" y1="172" x2="137" y2="226" stroke="#7CBAE8" strokeWidth="1.2" opacity="0.8"/>
      <line x1="98"  y1="199" x2="176" y2="199" stroke="#7CBAE8" strokeWidth="1.2" opacity="0.8"/>

      {/* TV (upper right) */}
      <rect x="272" y="164" width="96" height="62" rx="4" fill="#1C2838" stroke="#0D1822" strokeWidth="1.5"/>
      <rect x="278" y="170" width="84" height="46" rx="2" fill="#2266A8" opacity="0.55"/>
      <rect x="280" y="172" width="80" height="38" rx="1" fill="#18408A" opacity="0.65"/>
      {/* TV landscape scene */}
      <ellipse cx="310" cy="185" rx="14" ry="9" fill="#22C55E" opacity="0.5"/>
      <rect x="280" y="188" width="80" height="14" rx="0" fill="#2A8A3A" opacity="0.38"/>
      {/* TV stand */}
      <rect x="308" y="226" width="26" height="5" rx="1" fill="#1C2838"/>
      <rect x="304" y="231" width="34" height="3" rx="1" fill="#0D1822"/>

      {/* Fridge (upper right corner) */}
      <rect x="390" y="158" width="46" height="94" rx="3" fill="#C8D4E0" stroke="#96A8B8" strokeWidth="1.5"/>
      <line x1="390" y1="200" x2="436" y2="200" stroke="#96A8B8" strokeWidth="1.5"/>
      <rect x="387" y="170" width="4" height="20" rx="2" fill="#7A8FA0"/>
      <rect x="387" y="208" width="4" height="16" rx="2" fill="#7A8FA0"/>

      {/* ═══════════ GROUND FLOOR LEFT — INVERSOR ═══════════ */}
      {/* Wall plate */}
      <rect x="95" y="272" width="90" height="112" rx="4" fill="#C8D4E0" stroke="#96A8B8" strokeWidth="1.5"/>
      {/* Inversor unit */}
      <rect x="100" y="277" width="62" height="102" rx="3" fill="#AABAC8" stroke="#7A8FA0" strokeWidth="1.5"/>
      {/* Display */}
      <rect x="104" y="282" width="54" height="22" rx="2" fill="#182838"/>
      <rect x="106" y="284" width="50" height="18" rx="1" fill="#0D1C2A" opacity="0.88"/>
      {/* Label */}
      <text x="131" y="319" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#283848" fontFamily="system-ui" letterSpacing="0.6">INVERTOR</text>
      {/* Green LED */}
      <circle cx="153" cy="314" r="5.5" fill="#22C55E" opacity="0.9"/>
      <circle cx="153" cy="314" r="3.5" fill="#4ADE80"/>
      {/* Vent slits */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="105" y1={330+i*9} x2="157" y2={330+i*9} stroke="#7A8FA0" strokeWidth="1" opacity="0.6"/>
      ))}

      {/* ═══════════ GROUND FLOOR CENTER — TABLERO ═══════════ */}
      <rect x="220" y="260" width="62" height="128" rx="4" fill="#18243A" stroke="#0A1525" strokeWidth="2"/>
      <rect x="224" y="264" width="54" height="120" rx="2" fill="#1E2E45"/>
      {/* Breaker rows */}
      {[0,1,2,3,4,5,6,7].map(row => (
        <g key={row}>
          <rect x="228" y={271+row*13} width="20" height="9" rx="2" fill="#2A3E58"/>
          <rect x="251" y={271+row*13} width="20" height="9" rx="2" fill="#2A3E58"/>
        </g>
      ))}
      {/* Main breaker */}
      <rect x="228" y={271+8*13} width="43" height="9" rx="2" fill="#325A80"/>

      {/* ═══════════ GROUND FLOOR RIGHT — BOMBILLA ═══════════ */}
      {/* Hanging wire */}
      <line x1="360" y1="260" x2="360" y2="282" stroke="#5A6678" strokeWidth="1.5"/>
      {/* Glow aura */}
      <circle cx="360" cy="304" r="30" fill="url(#bulbG)" className="fbulb"/>
      {/* Bulb glass */}
      <circle cx="360" cy="302" r="19" fill="#FDE68A" opacity="0.9"/>
      <circle cx="360" cy="301" r="14" fill="#FBBF24"/>
      <circle cx="360" cy="300" r="9"  fill="#F59E0B"/>
      {/* Filament */}
      <path d="M 354 302 Q 360 295 366 302" stroke="#FCD34D" strokeWidth="1.5" fill="none"/>
      {/* Base */}
      <rect x="354" y="320" width="12" height="6" rx="2" fill="#D97706"/>
      <rect x="356" y="326" width="8"  height="5" rx="1" fill="#B45309"/>

      {/* ═══════════ GROUND FLOOR RIGHT — MICROONDAS ═══════════ */}
      <rect x="378" y="322" width="68" height="50" rx="3" fill="#3A4658" stroke="#28333F" strokeWidth="1.5"/>
      <rect x="383" y="327" width="42" height="38" rx="2" fill="#222E3F"/>
      <rect x="385" y="329" width="38" height="34" rx="1" fill="#181E2C" opacity="0.92"/>
      {/* Display */}
      <rect x="430" y="329" width="11" height="16" rx="1" fill="#0C1525"/>
      <text x="436" y="340" textAnchor="middle" fontSize="5.5" fill="#22C55E" fontFamily="monospace">1:30</text>
      {/* Buttons */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx="436" cy={349+i*5} r="1.8" fill="#485A70"/>
      ))}

      {/* ═══════════ WIRES ═══════════ */}

      {/* DC: panels → left along roof base → down wall → inversor */}
      {/* Track (ghost) */}
      <path d="M 258 156 L 158 156 L 158 272"
        stroke="#22C55E" strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.15"/>
      {/* Animated */}
      <path className="fwire" d="M 258 156 L 158 156 L 158 272"
        stroke="#22C55E" strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 12"/>

      {/* AC: inversor → tablero */}
      <path d="M 190 318 L 220 318"
        stroke="#22C55E" strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeOpacity="0.15"/>
      <path className="fwire" d="M 190 318 L 220 318"
        stroke="#22C55E" strokeWidth="4.5" fill="none"
        strokeLinecap="round" strokeDasharray="10 10"/>

      {/* Tablero → bombilla */}
      <line x1="282" y1="298" x2="341" y2="298" stroke="#22C55E" strokeWidth="2" opacity="0.7"/>
      <line x1="341" y1="298" x2="341" y2="260" stroke="#22C55E" strokeWidth="2" opacity="0.7"/>
      <line x1="341" y1="260" x2="360" y2="260" stroke="#22C55E" strokeWidth="2" opacity="0.7"/>

      {/* Tablero → microondas */}
      <line x1="282" y1="340" x2="378" y2="340" stroke="#22C55E" strokeWidth="2" opacity="0.7"/>

      {/* Tablero → piso superior (TV + fridge) */}
      <line x1="282" y1="262" x2="282" y2="254" stroke="#22C55E" strokeWidth="2" opacity="0.65"/>
      <line x1="282" y1="254" x2="415" y2="254" stroke="#22C55E" strokeWidth="2" opacity="0.65"/>
      <line x1="355" y1="254" x2="355" y2="228" stroke="#22C55E" strokeWidth="2" opacity="0.65"/>
      <line x1="415" y1="254" x2="415" y2="228" stroke="#22C55E" strokeWidth="2" opacity="0.65"/>
    </svg>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative min-h-screen hero-mesh flex flex-col overflow-hidden">
      {/* Ambient glow orbs — hidden on mobile */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F5A623]/8 blur-[120px] pointer-events-none hidden sm:block" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#0A6EBD]/12 blur-[100px] pointer-events-none hidden sm:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1A8FE3]/5 blur-[150px] pointer-events-none hidden sm:block" />

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

          {/* Left column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center animate-hero-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 text-sm font-medium text-white/80 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                🇨🇱 Empresa chilena de energía solar residencial
              </span>
            </div>

            <div className="animate-hero-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                Tu techo,{' '}
                <span className="gradient-text">tu energía</span>
                <br />
                <span className="text-white/90">sin complicaciones.</span>
              </h1>
            </div>

            <p className="animate-hero-3 text-lg sm:text-xl text-white/60 leading-relaxed max-w-lg">
              Empresa chilena especializada en energía solar residencial. Trabajamos con{' '}
              <span className="text-white/80 font-medium">productos premium seleccionados por su calidad y durabilidad</span>,{' '}
              evaluando cada vivienda de forma personalizada para ofrecerte la mejor solución.
            </p>

            <div className="animate-hero-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://cotiza.soluxenergy.cl"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-bold text-base sm:text-lg shadow-2xl hover:shadow-[0_0_40px_rgba(245,166,35,0.45)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
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

            <div className="animate-hero-5 flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Shield className="w-4 h-4 text-[#22C55E]" />
                Garantía 1 año equipos
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

          {/* Right column — schematic illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-full">
              <div className="absolute inset-0 rounded-full bg-[#0A6EBD]/15 blur-[80px] scale-75 hidden sm:block" />
              <SolarSystemSchematic />
            </div>
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
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </Container>
    </section>
  )
}
