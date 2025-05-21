'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';

export default function TambahBerita() {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState(null);
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    const { data } = await supabase.from('berita').select('*').order('id', { ascending: false });
    setBerita(data);
  };

  const handleUpload = async () => {
    if (!judul || !isi || !gambar) return alert('Lengkapi semua kolom');

    const ext = gambar.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { data: imgData, error: imgError } = await supabase.storage
      .from('berita-images')
      .upload(fileName, gambar);

    if (imgError) return alert('Upload gambar gagal');

    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/berita-images/${fileName}`;

    const { error } = await supabase.from('berita').insert({ judul, isi, gambar_url: url });
    if (error) return alert('Gagal simpan ke database');

    setJudul('');
    setIsi('');
    setGambar(null);
    fetchBerita();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Tambah Berita Terbaru</h1>
      <input
        type="text"
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        className="bg-gray-800 border border-gray-600 p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder="Isi berita"
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        rows={4}
        className="bg-gray-800 border border-gray-600 p-2 rounded w-full mb-2"
      />
      <input
        type="file"
        onChange={(e) => setGambar(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-6"
      >
        <UploadCloud size={16} /> Upload Berita
      </button>

      <div className="space-y-4">
        {berita.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="bg-gray-800 p-4 rounded shadow"
          >
            <img src={item.gambar_url} alt={item.judul} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-xl font-semibold">{item.judul}</h2>
            <p className="text-gray-300">{item.isi}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}