'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: '¿Cómo funciona?', href: '#como-funciona' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="SOLUX ENERGY"
                width={500}
                height={500}
                className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                priority
                unoptimized
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <a
                href="https://cotiza.soluxenergy.cl"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#F5A623] hover:from-[#F5A623] hover:to-[#FBBF24] text-[#0A1628] text-sm font-bold shadow-lg hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Zap className="w-4 h-4" strokeWidth={2.5} />
                Cotiza gratis
              </a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={menuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-[#0A1628]/98 backdrop-blur-2xl border-l border-white/10 pt-20 pb-8 px-6 flex flex-col lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-white/80 hover:text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="https://cotiza.soluxenergy.cl"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5A623] to-[#FBBF24] text-[#0A1628] font-bold shadow-lg"
              >
                <Zap className="w-4 h-4" strokeWidth={2.5} />
                Cotiza gratis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
