'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import {
  FaUserGraduate, FaEnvelope, FaPhone, FaBirthdayCake,
  FaMapMarkerAlt, FaEdit
} from 'react-icons/fa';
import Header from '@/components/Header';

export default function page() {
  const [form, setForm] = useState({
    nama: '', nisn: '', tempat_lahir: '', tanggal_lahir: '',
    alamat: '', no_hp: '', email: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        'service_4ex02oo',
        'template_mg5d0t4',
        form,
        '1jK0--gN_Skgcs8kB2jvM'
      );
    } catch (error) {
      console.error('Gagal kirim email:', error);
    }

    const { error } = await supabase.from('pendaftar_sekolah').insert([form]);
    if (error) console.error(error);

    setLoading(false);
    alert('Pendaftaran berhasil!');
    setForm({ nama: '', nisn: '', tempat_lahir: '', tanggal_lahir: '', alamat: '', no_hp: '', email: '' });
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-b to-green-900 text-white p-6 flex items-center justify-center">
      <motion.div
        className="w-full max-w-xl bg-gray-800 bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-3xl font-bold text-green-400 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <FaUserGraduate className="inline-block mb-1 mr-2" />
          Formulir Pendaftaran SMK AL-MASTURIYAH
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'nama', label: 'Nama Lengkap', icon: <FaUserGraduate /> },
            { name: 'nisn', label: 'NISN', icon: <FaEdit /> },
            { name: 'tempat_lahir', label: 'Tempat Lahir', icon: <FaMapMarkerAlt /> },
            { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', icon: <FaBirthdayCake /> },
            { name: 'alamat', label: 'Alamat', icon: <FaMapMarkerAlt /> },
            { name: 'no_hp', label: 'Nomor HP', icon: <FaPhone /> },
            { name: 'email', label: 'Email', icon: <FaEnvelope /> },
          ].map(({ name, label, icon, type = 'text' }) => (
            <div key={name}>
              <label className="text-sm font-medium mb-1 flex items-center gap-2">
                {icon} {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Daftar Sekarang'}
          </button>
        </form>
      </motion.div>
    </div>
  </>
  );
}