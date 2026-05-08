import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'SOLUX ENERGY — Paneles Solares Residenciales en Chile',
  description:
    'Instalamos paneles solares en tu hogar con tecnología de punta. Ahorra en tu cuenta de luz desde el primer mes. Cotiza gratis en minutos.',
  keywords: 'paneles solares, energía solar, chile, solar residencial, ahorro energía, SOLUX',
  authors: [{ name: 'SOLUX ENERGY' }],
  metadataBase: new URL('https://soluxenergy.cl'),
  openGraph: {
    title: 'SOLUX ENERGY — Paneles Solares Residenciales en Chile',
    description: 'Transforma tu techo en una fuente de energía. Ahorra desde el primer mes.',
    url: 'https://soluxenergy.cl',
    siteName: 'SOLUX ENERGY',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLUX ENERGY — Paneles Solares en Chile',
    description: 'Transforma tu techo en una fuente de energía.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL" className={`${geist.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 antialiased overflow-x-hidden">
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
