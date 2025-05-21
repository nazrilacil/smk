'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ children }) {
  const [textShown, setTextShown] = useState('')
  const [index, setIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  const fullText = 'SMK AL-MASTURIYAH'

  // Optional: efek suara ketikan
  const playTypeSound = () => {
    const audio = new Audio('/sounds/type.mp3')
    audio.volume = 0.2
    audio.play()
  }

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTextShown((prev) => prev + fullText[index])
        playTypeSound()
        setIndex(index + 1)
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [index])

  if (showContent) return children

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/50"
      >
        <div className="flex text-3xl md:text-5xl font-bold text-green-400 mb-10">
          {textShown}
          {index >= fullText.length && (
            <motion.span
              className="ml-1 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              |
            </motion.span>
          )}
        </div>

        {index >= fullText.length && (
          <motion.button
            onClick={() => setShowContent(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg animate-bounce hover:bg-green-600 transition"
          >
            Start
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}