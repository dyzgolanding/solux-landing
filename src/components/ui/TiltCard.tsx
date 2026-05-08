'use client'

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = '', intensity = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })
  const scale = useSpring(1, { stiffness: 250, damping: 25 })
  const glareX = useSpring(50, { stiffness: 200, damping: 20 })
  const glareY = useSpring(50, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const pctX = (e.clientX - centerX) / (rect.width / 2)
    const pctY = (e.clientY - centerY) / (rect.height / 2)

    rotateX.set(-pctY * intensity)
    rotateY.set(pctX * intensity)
    glareX.set(50 + pctX * 30)
    glareY.set(50 + pctY * 30)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.03)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    glareX.set(50)
    glareY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
          style={{ transformStyle: 'preserve-3d', translateZ: 1 }}
        >
          <motion.div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, white 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
