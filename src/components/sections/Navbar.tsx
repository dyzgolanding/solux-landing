'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { label: '¿Cómo funciona?', href: '#como-funciona' },
  { label: 'Beneficios',      href: '#beneficios' },
  { label: 'Proceso',         href: '#proceso' },
  { label: 'Testimonios',     href: '#testimonios' },
  { label: 'FAQ',             href: '#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed inset-x-0 z-50 flex justify-center pointer-events-none"
      style={{
        top: scrolled ? '14px' : '0px',
        padding: scrolled ? '0 20px' : '0 40px',
        transition: 'top 0.45s ease, padding 0.45s ease',
      }}
    >
      <div
        className="pointer-events-auto w-full"
        style={{ maxWidth: '820px', transition: 'max-width 0.45s ease' }}
      >
        {/* Main bar / pill */}
        <nav
          className="flex items-center justify-between"
          style={{
            padding: scrolled ? '14px 28px' : '20px 0px',
            borderRadius: scrolled ? '9999px' : '0px',
            background: scrolled ? 'rgba(255,255,255,0.22)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'none',
            border: '1px solid transparent',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.15)' : 'none',
            transition: 'padding 0.45s ease, border-radius 0.45s ease, background 0.45s ease, backdrop-filter 0.45s ease, border 0.45s ease, box-shadow 0.45s ease',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/favicon.ico"
              alt="SOLUX ENERGY"
              width={64}
              height={64}
              className="w-auto object-contain"
              style={{ height: scrolled ? '34px' : '42px', transition: 'height 0.45s ease' }}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="px-3.5 py-2 text-sm font-bold rounded-full transition-colors duration-200"
                style={{ color: scrolled ? 'rgba(10,22,40,0.7)' : 'rgba(255,255,255,0.8)' }}
                onMouseEnter={e => (e.currentTarget.style.background = scrolled ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <a
              href="https://cotiza.soluxenergy.cl"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #F5A623, #FBBF24)', color: '#0A1628' }}
            >
              Cotiza gratis
            </a>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-full transition-colors"
              style={{ background: 'transparent' }}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="block h-px transition-all duration-300 origin-center"
                style={{ width: '20px', backgroundColor: scrolled ? 'rgba(10,22,40,0.7)' : 'rgba(255,255,255,0.8)', transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
              <span className="block h-px transition-all duration-300"
                style={{ width: '20px', backgroundColor: scrolled ? 'rgba(10,22,40,0.7)' : 'rgba(255,255,255,0.8)', opacity: open ? 0 : 1 }} />
              <span className="block h-px transition-all duration-300 origin-center"
                style={{ width: '20px', backgroundColor: scrolled ? 'rgba(10,22,40,0.7)' : 'rgba(255,255,255,0.8)', transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? '400px' : '0px', opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-3xl border border-white/30 px-2 py-2 flex flex-col"
            style={{
              backdropFilter: 'blur(24px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
              background: 'rgba(255,255,255,0.22)',
            }}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className="px-4 py-3 text-sm text-[#0A1628]/65 hover:text-[#0A1628] hover:bg-black/5 rounded-2xl transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1">
              <a
                href="https://cotiza.soluxenergy.cl"
                className="flex items-center justify-center gap-2 w-full text-sm px-4 py-3 rounded-full text-[#0A1628] font-bold"
                style={{ background: 'linear-gradient(135deg, #F5A623, #FBBF24)' }}
              >
                Cotiza gratis →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
