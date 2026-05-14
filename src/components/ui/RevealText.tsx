"use client"

import React, { useEffect, useRef, useState } from "react"

type Props = {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "p"
  stagger?: number
  duration?: number
  delay?: number
  threshold?: number
}

type Unit =
  | { kind: "word"; text: string }
  | { kind: "el"; node: React.ReactElement }
  | { kind: "br" }
  | { kind: "space" }

export function RevealText({
  children,
  className = "",
  as: Tag = "h2",
  stagger = 80,
  duration = 700,
  delay = 0,
  threshold = 0.2,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  // Build flat list of animatable units from mixed React children
  const units: Unit[] = []

  function walk(node: React.ReactNode) {
    if (node === null || node === undefined || node === false) return
    if (typeof node === "string" || typeof node === "number") {
      const str = String(node)
      str.split(/(\s+)/).forEach(token => {
        if (!token) return
        if (/^\s+$/.test(token)) {
          if (units.length > 0 && units[units.length - 1].kind !== "space" && units[units.length - 1].kind !== "br") {
            units.push({ kind: "space" })
          }
        } else {
          units.push({ kind: "word", text: token })
        }
      })
    } else if (React.isValidElement(node)) {
      if ((node as React.ReactElement).type === "br") {
        units.push({ kind: "br" })
      } else {
        // Add space before element if last token was a word (not already a space)
        if (units.length > 0 && units[units.length - 1].kind === "word") {
          units.push({ kind: "space" })
        }
        units.push({ kind: "el", node: node as React.ReactElement })
      }
    } else if (Array.isArray(node)) {
      node.forEach(walk)
    }
  }

  walk(children)

  // Render with staggered animation
  let animIdx = 0
  const rendered: React.ReactNode[] = []

  units.forEach((unit, i) => {
    if (unit.kind === "br") {
      rendered.push(<br key={`br-${i}`} />)
      return
    }
    if (unit.kind === "space") {
      rendered.push(<span key={`sp-${i}`} style={{ display: "inline" }}>{" "}</span>)
      return
    }

    const idx = animIdx++
    const wDelay = delay + idx * stagger
    const style: React.CSSProperties = {
      display: "inline-block",
      opacity: visible ? 1 : 0,
      filter: visible ? "blur(0px)" : "blur(8px)",
      transform: visible ? "translateY(0)" : "translateY(12px)",
      transition: visible
        ? `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${wDelay}ms,
           filter  ${duration}ms cubic-bezier(0.16,1,0.3,1) ${wDelay}ms,
           transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${wDelay}ms`
        : "none",
    }

    if (unit.kind === "word") {
      rendered.push(<span key={`w-${i}`} style={style}>{unit.text}</span>)
    } else {
      rendered.push(<span key={`el-${i}`} style={style}>{unit.node}</span>)
    }
  })

  // @ts-ignore — dynamic tag
  return <Tag ref={ref} className={className}>{rendered}</Tag>
}
