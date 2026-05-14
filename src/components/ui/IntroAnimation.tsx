"use client"

import { useEffect, useState } from "react"

const LETTERS = [
  { char: "S", color: "#F5A623" },
  { char: "O", color: "#F5A623" },
  { char: "L", color: "#F5A623" },
  { char: "U", color: "#0A6EBD" },
  { char: "X", color: "#0A6EBD" },
]

const LETTER_IN_STAGGER  = 100
const LETTER_IN_DUR      = 700
const HOLD_DURATION      = 400
const LETTERS_IN_TOTAL   = LETTER_IN_STAGGER * (LETTERS.length - 1) + LETTER_IN_DUR + HOLD_DURATION

const LETTER_OUT_STAGGER = 60
const LETTER_OUT_DUR     = 450

const CURTAIN_DELAY      = LETTERS_IN_TOTAL + 100
const CURTAIN_DURATION   = 1300
const ANIM_TOTAL         = CURTAIN_DELAY + LETTER_OUT_STAGGER * (LETTERS.length - 1) + LETTER_OUT_DUR + 1400

type Phase = "idle" | "in" | "out" | "done"

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [curtainUp, setCurtainUp] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("solux-intro")) {
      setPhase("done")
      return
    }
    sessionStorage.setItem("solux-intro", "1")

    const t0 = setTimeout(() => setPhase("in"),  80)
    const t1 = setTimeout(() => setPhase("out"), LETTERS_IN_TOTAL)
    const t2 = setTimeout(() => setCurtainUp(true), CURTAIN_DELAY)
    const t3 = setTimeout(() => setPhase("done"), ANIM_TOTAL)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (phase === "done") return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      {/* Navy curtain — retracts upward */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: curtainUp ? "100%" : "0%",
          transition: curtainUp ? `bottom ${CURTAIN_DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)` : "none",
          background: "#0A1628",
        }}
      />

      {/* SOLUX letters */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex" style={{ gap: "0.04em" }}>
          {LETTERS.map((letter, i) => {
            const isIdle = phase === "idle"
            const isIn   = phase === "in"
            const isOut  = phase === "out"

            const opacity    = isIdle ? 0 : isIn ? 1 : 0
            const blur       = isIdle ? 36 : isIn ? 0 : 24
            const translateY = isIdle ? 48 : isIn ? 0 : -20

            const transition = isOut
              ? `opacity ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${i * LETTER_OUT_STAGGER}ms,
                 filter  ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${i * LETTER_OUT_STAGGER}ms,
                 transform ${LETTER_OUT_DUR}ms cubic-bezier(0.4,0,1,1) ${i * LETTER_OUT_STAGGER}ms`
              : isIn
              ? `opacity ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${i * LETTER_IN_STAGGER}ms,
                 filter  ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${i * LETTER_IN_STAGGER}ms,
                 transform ${LETTER_IN_DUR}ms cubic-bezier(0.16,1,0.3,1) ${i * LETTER_IN_STAGGER}ms`
              : "none"

            const glowColor = letter.color === "#F5A623"
              ? "rgba(245,166,35,0.5), 0 0 160px rgba(245,166,35,0.2)"
              : "rgba(10,110,189,0.5), 0 0 160px rgba(10,110,189,0.2)"

            return (
              <span
                key={i}
                className="font-black leading-none select-none"
                style={{
                  fontSize: `calc((100vw - 64px) / ${LETTERS.length})`,
                  letterSpacing: "0.05em",
                  color: letter.color,
                  opacity,
                  filter: `blur(${blur}px)`,
                  transform: `translateY(${translateY}px)`,
                  transition,
                  willChange: "opacity, filter, transform",
                  textShadow: isIn ? `0 0 80px ${glowColor}` : "none",
                }}
              >
                {letter.char}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
