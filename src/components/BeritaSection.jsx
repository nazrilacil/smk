'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import BeritaItem from './BeritaItem';
import { motion } from 'framer-motion';

export default function BeritaSection() {
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gagal mengambil data:', error.message);
    } else {
      setBerita(data);
    }
  };

  // Variants untuk stagger
  const containerStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="bg-gradient-to-t via-300 from-green-900 text-white py-10 px-4 md:px-16 py-20 px-6 md:px-16" id="berita">
      <motion.h2
        className="text-3xl font-bold text-green-400 text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Berita Terbaru
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        {berita.map((item, index) => (
          <BeritaItem key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
}