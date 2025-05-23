import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SupabaseProvider } from '@/lib/supabaseProvider'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import { Metadata } from 'next';
 

export const metadata: Metadata = {
  title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
  description: 'Website sekolah SMK AL-MASTURIYAH LANGKAPLANCAR',
  openGraph: {
    title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
    description: 'Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR ...',
    url: 'https://smk-al-masturiyah.vercel.app',
    siteName: 'SMK AL-MASTURIYAH',
    images: [
      {
        url: 'https://smk-al-masturiyah.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SMK AL-MASTURIYAH',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
    description: 'Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR ...',
    images: ['https://smk-al-masturiyah.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ThemeProvider>
          <SupabaseProvider>
            <Loader>
              {children}
              <Footer />
            </Loader>
            <Toaster position="top-right" reverseOrder={false} />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
