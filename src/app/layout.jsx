// app/layout.js
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SupabaseProvider } from '@/lib/supabaseProvider'
import { Toaster } from 'react-hot-toast'
import Loader from '@/components/Loader';
import Footer from '@/components/Footer'

export const metadata = {
  title: 'SMK AL-MASTURIYAH LANGKAPLANCAR',
  description: 'Website sekkolah SMK AL-MASTURIYAH LANGKAPLANCAR',
}

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