import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SupabaseProvider } from '@/lib/supabaseProvider'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
 

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <meta name="google-site-verification" content="qNFq2NUCeYI5S87f8OUlDQq9HnzhmKj9e1jT8PTiGRA" />
       <title>SMK AL-MASTURIYAH LANGKAPLANCAR</title>
        <meta property="og:image" content="https://raw.githubusercontent.com/nazrilacil/smk/refs/heads/master/public/og-image.jpg" />
        <meta property="og:title" content="SMK AL-MASTURIYAH LANGKAPLANCAR" />
        <meta property="og:description" content="Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR ..." />
        <meta name="keywords" content="SMK AL-MASTURIYAH LANGKAPLANCAR, SMK AL-MASTURIYAH, Nazril Acil" />
        <meta name="twitter:card" content="summary_large_image" />
       <link rel="icon" type="image/png" href="/smk.png" />
       <meta name="description" content="SMK AL-MASTURIYAH LANGKAPLANCAR, Daftar Sekolah SMK adalah pilihan terbaik untuk mengembangkan keahlian fi bidang teknik dan teknologi, dengan berbagai jurusan." />
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
