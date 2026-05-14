'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3'
}

export function AnimatedHeading({ text, className = '', delay = 0, as: Tag = 'h2' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  const words = text.split(' ')

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag className="flex flex-wrap gap-x-[0.3em] gap-y-1">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  )
}
