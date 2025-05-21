'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';
import { format } from 'date-fns';

export default function Jurusan() {
  const [jurusan, setJurusan] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchJurusan();
  }, []);

  const fetchJurusan = async () => {
    const { data, error } = await supabase.from('jurusan').select('*').order('created_at');
    if (data) setJurusan(data);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

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

  return (
    <section className="bg-gradient-to-b from-green-900 py-20 px-6 md:px-20" id="jurusan">
      <motion.h2 className="text-3xl font-bold text-sky-500 text-center mb-10">Jurusan</motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jurusan.map((item, i) => (
          <motion.div
            key={item.id}
            className="p-6 rounded-xl shadow border border-gray-700 hover:shadow-teal-500/30"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
            custom={i + 1}
          >
            {item.gambar_url && (
              <img
                src={item.gambar_url}
                alt={item.nama}
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <FaBookOpen className="text-sky-500 text-2xl mb-2" />
            <h3 className="text-xl font-semibold text-sky-500 mb-2">{item.nama}</h3>
            <p className="mb-3">{item.deskripsi?.slice(0, 100)}...</p>
            <button
              onClick={() => setSelected(item)}
              className="text-sm text-sky-700 underline"
            >
              Lihat Selengkapnya
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 px-4"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-gradient-to-b from-green-900 rounded-lg p-6 max-w-2xl w-full relative shadow-lg border border-teal-600"
              variants={modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-xl"
                onClick={() => setSelected(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold text-sky-600 mb-4">{selected.nama}</h3>
              {selected.gambar_url && (
                <img
                  src={selected.gambar_url}
                  className="w-full max-h-60 object-cover rounded mb-4"
                  alt="gambar jurusan"
                />
              )}
              <p className="mb-3">{selected.deskripsi}</p>
              <p className="text-sm text-gray-500">
                Dibuat pada: {format(new Date(selected.created_at), 'dd MMMM yyyy')}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
