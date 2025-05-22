// app/layout.js
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SupabaseProvider } from '@/lib/supabaseProvider'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/Loader';
import Footer from '@/components/Footer'

export const metadata = {
  title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
  description: 'Website sekolah SMK AL-MASTURIYAH LANGKAPLANCAR',
  other: {
    'google-site-verification': 'qNFq2NUCeYI5S87f8OUlDQq9HnzhmKj9e1jT8PTiGRA',
  },
  openGraph: {
    title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
    description: 'Sebagai sekolah menengah kejuruan, SMK AL-MASTURIYAH LANGKAPLANCAR memiliki fokus khusus pada pengembangan keahlian dan keterampilan para siswanya. Kurikulum yang diterapkan dirancang untuk mempersiapkan mereka agar siap bekerja di dunia industri. Sekolah ini juga menyediakan program magang dan pelatihan kerja sama dengan industri terkait, guna memberikan pengalaman praktis kepada para siswa.',
    url: 'https://smk-al-masturiyah.vercel.app',
    siteName: 'SMK AL-MASTURIYAH',
    images: [
      {
        url: 'https://smk-al-masturiyah.vercel.app/og-image.jpg', // Ganti dengan path gambar kamu
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
