import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SupabaseProvider } from '@/lib/supabaseProvider'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/Loader';
import Footer from '@/components/Footer'
import Head from 'next/head' // Tambahkan ini

export const metadata = {
  title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
  description: 'Website sekolah SMK AL-MASTURIYAH LANGKAPLANCAR',
  openGraph: {
    title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
    description: 'Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR memiliki fokus khusus pada pengembangan keahlian dan keterampilan para siswanya. Kurikulum yang diterapkan dirancang untuk mempersiapkan mereka agar siap bekerja di dunia industri. Sekolah ini juga menyediakan program magang dan pelatihan kerja sama dengan industri terkait, guna memberikan pengalaman praktis kepada para siswa.',
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
    description: 'Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR memiliki fokus khusus pada pengembangan keahlian dan keterampilan para siswanya. Kurikulum yang diterapkan dirancang untuk mempersiapkan mereka agar siap bekerja di dunia industri. Sekolah ini juga menyediakan program magang dan pelatihan kerja sama dengan industri terkait, guna memberikan pengalaman praktis kepada para siswa.',
    images: ['https://smk-al-masturiyah.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <Head>
        <meta name="google-site-verification" content="qNFq2NUCeYI5S87f8OUlDQq9HnzhmKj9e1jT8PTiGRA" />
        <meta property="og:image" content="https://smk-al-masturiyah.vercel.app/og-image.jpg" />
        <meta property="og:title" content="SMK AL-MASTURIYAH LANGKAPLANCAR" />
        <meta property="og:description" content="Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR ..." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
