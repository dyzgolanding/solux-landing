'use client'

import { useScroll, useSpring, motion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-gradient-to-r from-[#F5A623] via-[#0A6EBD] to-[#22C55E]"
    />
  )
}
