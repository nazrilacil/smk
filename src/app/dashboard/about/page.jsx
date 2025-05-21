'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Info, Trash2 } from 'lucide-react';

export default function TentangSekolahDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTentang();
  }, []);

  const fetchTentang = async () => {
    const { data } = await supabase.from('tentang_sekolah').select('*').order('created_at', { ascending: false });
    setData(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('tentang_sekolah').delete().eq('id', id);
    if (!error) fetchTentang();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-green-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Tentang Sekolah</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-800 rounded-xl p-4 shadow-md relative"
          >
            <div className="flex items-center gap-3 mb-3">
              <Info className="text-green-400" />
              <h2 className="text-xl font-semibold">{item.judul}</h2>
            </div>
            <img src={item.gambar_url} alt={item.judul} className="w-full h-40 object-cover rounded mb-3" />
            <p className="text-gray-300 text-sm">{item.konten.slice(0, 150)}...</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}