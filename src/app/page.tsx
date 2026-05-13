import dynamic from 'next/dynamic'
import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'

const ScrollCarousel = dynamic(() => import('@/components/sections/ScrollCarousel').then(m => ({ default: m.ScrollCarousel })))
const HowItWorks    = dynamic(() => import('@/components/sections/HowItWorks').then(m => ({ default: m.HowItWorks })))
const Benefits      = dynamic(() => import('@/components/sections/Benefits').then(m => ({ default: m.Benefits })))
const Process       = dynamic(() => import('@/components/sections/Process').then(m => ({ default: m.Process })))
const FAQ           = dynamic(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })))
const CTA           = dynamic(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })))
const Footer        = dynamic(() => import('@/components/sections/Footer').then(m => ({ default: m.Footer })))

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ScrollCarousel />
        <HowItWorks />
        <Benefits />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
