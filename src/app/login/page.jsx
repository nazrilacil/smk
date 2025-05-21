'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-lg bg-slate-600 w-full max-w-md animate-fade-in">
        <img src="/smk.png" className="mx-auto w-24 mb-4" alt="almasturiyah" />
        <h2 className="text-xl font-bold mb-6 text-center">Login Admin</h2>

        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="Email"
          className="mb-4 w-full rounded-md border-gray-300 bg-white p-3 text-black shadow focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="Password" className="block mb-2 text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          id="Password"
          className="mb-4 w-full rounded-md border-gray-300 bg-white p-3 text-black shadow focus:ring-2 focus:ring-teal-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <button
          type="button"
          className="group mt-4 w-full flex items-center justify-center gap-2 rounded-md bg-teal-600 px-5 py-3 text-white transition hover:bg-teal-700"
          onClick={handleLogin}
        >
          <span className="text-sm font-medium">Login</span>
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <p className="mt-4 text-center">
          Belum punya akun?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}