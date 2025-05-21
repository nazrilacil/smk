'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BeritaItem({ item, index }) {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modal = {
    hidden: { y: '-50%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const tanggal = new Date(item.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Animasi fade-in scroll
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <>
      <motion.div
        key={item.id}
        className="rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:scale-[1.01] transition"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        custom={index + 1}
      >
        <img
          src={item.gambar_url}
          alt={item.judul}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.3 }}
            className="text-xl font-semibold mb-1 text-teal-500"
          >
            {item.judul}
          </motion.h3>

          <p className="text-sm text-slate-400 mb-2 italic">{tanggal}</p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.4 }}
            className="text-sm mb-2"
          >
            {item.isi.slice(0, 120)}...
          </motion.p>

          <button
            onClick={() => setShowModal(true)}
            className="text-sm text-green-400 hover:underline"
          >
            Lihat Selengkapnya
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (          
	<motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="rounded-lg p-6 max-w-2xl w-full relative shadow-lg border border-teal-600"
              variants={modal}
              onClick={(e) => e.stopPropagation()}
            >              <img
                src={item.gambar_url}
                alt={item.judul}
                className="w-full h-64 object-cover rounded mb-4 shadow"
              />
              <h3 className="text-2xl font-bold mb-2 text-green-400">{item.judul}</h3>
              <p className="text-sm text-slate-400 mb-4 italic">{tanggal}</p>
              <p className="leading-relaxed">{item.isi}</p>

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-3xl hover:text-red-400 transition"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}