'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Landmark, Info, GraduationCap } from 'lucide-react';

const fadeInVariant = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function TentangSekolah() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('tentang_sekolah').select('*');
      if (error) console.error(error);
      else setData(data);
    };
    fetchData();
  }, []);

  const icons = [<Landmark />, <Info />, <GraduationCap />];

  return (
    <section className="bg-gradient-to-b vi-gray-600 to-green-900 min-h-screen py-16 px-5" id="tentangSekolah">
      <div className="max-w-6xl mx-auto" onClick={() => setSelected(item)}
>
        <motion.h2
          variants={fadeInVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-14"
        >
          Tentang Sekolah
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeInVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white/10 p-6 rounded-xl border border-white/10 shadow-xl hover:scale-[1.01] transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600 rounded-full shadow-lg animate-pulse">
                  {icons[index % icons.length]}
                </div>
                <h3 className="text-xl font-semibold">{item.judul}</h3>
              </div>

              {item.gambar_url && (
                <motion.img
                  src={item.gambar_url}
                  alt="tentang"
                  className="w-full h-56 object-cover rounded-lg mb-4 border border-white/10"
                  initial={{ opacity: 0.4 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              )}

              <p className="text-white/90 text-sm leading-relaxed">{item.konten}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}