'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const WA_URL =
  'https://wa.me/56934015468?text=Hola%20SOLUX%20Energy%2C%20quiero%20información%20sobre%20paneles%20solares'

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.18 }}
                className="whitespace-nowrap bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg pointer-events-none"
              >
                Habla con un asesor
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            {/* WhatsApp icon */}
            <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7 relative z-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.664 4.797 1.82 6.797L2 30l7.41-1.797A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.824-1.594l-.418-.248-4.396 1.066 1.1-4.28-.27-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.344-.172-2.035-1.004-2.35-1.117-.317-.113-.547-.172-.778.172-.23.344-.893 1.117-1.094 1.347-.2.23-.402.258-.747.086-.344-.172-1.453-.536-2.766-1.707-1.022-.912-1.712-2.04-1.913-2.384-.2-.344-.021-.53.15-.702.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.602-.086-.172-.778-1.875-1.065-2.568-.281-.673-.566-.582-.778-.592l-.663-.011c-.23 0-.603.086-.919.43-.315.344-1.207 1.18-1.207 2.875 0 1.695 1.236 3.333 1.408 3.563.172.23 2.432 3.714 5.893 5.208.824.356 1.467.568 1.969.728.827.263 1.58.226 2.174.137.663-.1 2.035-.832 2.322-1.636.287-.803.287-1.49.2-1.636-.086-.144-.316-.23-.66-.402z"/>
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
