'use client'

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  FiMenu, FiX, FiHome, FiUser, FiLogOut,
  FiImage, FiBookOpen, FiFileText, FiInfo
} from "react-icons/fi"
import { usePathname, useRouter } from "next/navigation"
import { FaFileAlt } from "react-icons/fa"


export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sidebarRef = useRef()
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const closeMenu = () => {
    if (window.innerWidth < 768) setMenuOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabaseClient')
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="h-full bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative z-20 bg-gray-800 w-64 h-full p-6 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <button onClick={toggleMenu} className="md:hidden text-white">
            <FiX size={24} />
          </button>
        </div>

        <nav className="space-y-4">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiHome /> Home
          </Link>
          <Link href="/dashboard/profile" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiUser /> Profile
          </Link>
          <Link href="/dashboard/slider" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiImage /> Edit Slider
          </Link>
          <Link href="/dashboard/jurusan" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiBookOpen /> Jurusan
          </Link>
          <Link href="/dashboard/pendaftaran" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FaFileAlt /> Pendaftaran
          </Link>
          <Link href="/dashboard/berita" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiFileText /> Berita
          </Link>
          <Link href="/dashboard/about" onClick={closeMenu} className="flex items-center gap-3 hover:text-blue-400">
            <FiInfo /> About
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 text-left w-full hover:text-red-400">
            <FiLogOut /> Logout
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-gray-800 md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>
          <h2 className="text-lg font-semibold capitalize">{pathname.replace("/dashboard/", "") || "Dashboard"}</h2>
        </header>

        <main className="p-6 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}