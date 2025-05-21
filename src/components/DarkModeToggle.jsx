'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

useEffect(()=> setMounted(true),[])

if (!mounted) return null
  return (
	<div className="flex items-center justify-center mt-4">
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-200 text-white dark:bg-gray-700 hover:bg-gray-600 transition"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
	</div>
  );
}