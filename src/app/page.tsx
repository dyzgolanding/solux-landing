import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { IntroAnimation } from '@/components/ui/IntroAnimation'
import { ScrollCarousel } from '@/components/sections/ScrollCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Benefits } from '@/components/sections/Benefits'
import { PhotoGallery } from '@/components/sections/PhotoGallery'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ScrollCarousel />
        <HowItWorks />
        <Benefits />
        <PhotoGallery />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
