'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { FaSchool, FaTimes } from 'react-icons/fa';

export default function TentangSekolah() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('tentang_sekolah')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setData(data);
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
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-green-900 text-white px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-2">
        <FaSchool /> Tentang Sekolah
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg border border-green-700 hover:scale-[1.01] transition"
          >
            {item.gambar_url && (
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-green-400">{item.judul}</h3>
              <p className="text-sm text-gray-300">
                {item.konten.slice(0, 100)}...
              </p>
              <button
                onClick={() => setSelected(item)}
                className="text-sm text-green-300 hover:underline"
              >
                Lihat Selengkapnya
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#111] text-white rounded-xl p-6 max-w-2xl w-full shadow-lg relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-white hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
            {selected.gambar_url && (
              <img
                src={selected.gambar_url}
                alt={selected.judul}
                className="w-full h-52 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-2xl font-bold text-green-400 mb-2">{selected.judul}</h3>
            <p className="text-gray-300 text-sm whitespace-pre-line">{selected.konten}</p>
            <p className="text-xs text-gray-500 mt-4">
              Dibuat pada: {new Date(selected.created_at).toLocaleString('id-ID')}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}