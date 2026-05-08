import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { ScrollCarousel } from '@/components/sections/ScrollCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Benefits } from '@/components/sections/Benefits'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

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
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
