'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiUser, FiUserPlus, FiMail } from 'react-icons/fi';
import { FaBlog, FaHistory, FaInfoCircle } from 'react-icons/fa';
import { HiAcademicCap, HiNewspaper } from 'react-icons/hi';
import { RiLoginBoxLine } from 'react-icons/ri';
import DarkModeToggle from '@/components/DarkModeToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-50 bg-teal-900 text-white shadow-xl mb-4 w-full">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-teal-600 dark:text-teal-500">
            <img src="/smk.png" alt="Logo SMK" className="h-10" />
          </Link>

          <div className="hidden md:flex gap-6 text-sm items-center">
            <Link href="/about" className="hover:text-sky-600 flex items-center gap-1">
              <FaInfoCircle /> About
            </Link>
            <a href="#tentangSekolah" className="hover:text-sky-600 flex items-center gap-1">
              <FiUser /> Tentang Sekolah
            </a>
            <a href="/history" className="hover:text-sky-600 flex items-center gap-1">
              <FaHistory /> History
            </a>
            <a href="#berita" className="hover:text-sky-600 flex items-center gap-1">
              <HiNewspaper /> Berita
            </a>
            <a href="#jurusan" className="hover:text-sky-600 flex items-center gap-1">
              <HiAcademicCap /> Jurusan
            </a>
            <a href="/blog" className="hover:text-sky-600 flex items-center gap-1">
              <FaBlog /> Blog
            </a>
            <a href="#" className="hover:text-sky-600 flex items-center gap-1">
              <FiMail /> Kontak
            </a>
          </div>

          <div className="flex items-center gap-4">
              <DarkModeToggle />
            <Link href="/register" className="hidden sm:block bg-gray-100 text-teal-600 px-4 py-2 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:hover:text-white/75">Daftar</Link>

            {/* Mobile Menu Button */}
        <div className="block md:hidden z-60">
          <button
            className="rounded-sm p-2 z-60 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <div className="mt-2 w-6 h-6 relative">
            <span className={`absolute block h-0.5 w-full bg-white transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : '-translate-y-1'}`}/>
            <span className={`absolute block h-0.5 w-full bg-white transform transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100 translate-y-1.5'}`}/>
            <span className={`absolute block h-0.5 w-full bg-white transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-[6px]' : 'translate-y-3'}`}/>
            </div>
          </button>
        </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transition-opacity ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeMenu}></div>
      <div className={`fixed top-0 right-0 h-full w-64 bg-teal-900 text-white z-50 transform transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4"></div>
        <nav className="flex flex-col gap-4 p-6 ml-20">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><FiHome /> Home</Link>
          <Link href="#tentangSekolah" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><FaInfoCircle /> About</Link>
          <a href="#jurusan" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><HiAcademicCap /> Jurusan</a>
          <a href="#berita" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><HiNewspaper /> Berita</a>
          <a href="/blog" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><FaBlog /> Blog</a>
          <Link href="/kontak" onClick={closeMenu} className="flex items-center gap-2 hover:text-sky-600"><FiMail /> Kontak</Link>
          <Link href="/register" onClick={closeMenu} className="flex items-center gap-2 hover:text-yellow-600"><FiUserPlus /> Daftar</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;