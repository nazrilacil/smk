'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Page = () => {
  const [jurusan, setJurusan] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nama: '',
    deskripsi: '',
    gambarFile: null,
    gambarURL: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('jurusan').select('*');
    if (error) console.error(error);
    else setJurusan(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'gambarFile') {
      setForm({
        ...form,
        gambarFile: files[0],
        gambarURL: URL.createObjectURL(files[0]),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let gambar_url = form.gambarURL;

    if (form.gambarFile) {
      const fileName = `${uuidv4()}-${form.gambarFile.name}`;
      const { data, error } = await supabase.storage
        .from('jurusan-images')
        .upload(fileName, form.gambarFile);

      if (error) {
        alert('Gagal upload gambar');
        setLoading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from('jurusan-images')
        .getPublicUrl(fileName);
      gambar_url = publicUrl.publicUrl;
    }

    if (form.id) {
      await supabase
        .from('jurusan')
        .update({
          nama: form.nama,
          deskripsi: form.deskripsi,
          gambar_url: gambar_url,
        })
        .eq('id', form.id);
    } else {
      await supabase.from('jurusan').insert([
        {
          nama: form.nama,
          deskripsi: form.deskripsi,
          gambar_url: gambar_url,
        },
      ]);
    }

    setForm({ id: null, nama: '', deskripsi: '', gambarFile: null, gambarURL: '' });
    setShowForm(false);
    fetchData();
    setLoading(false);
  };

  const handleEdit = (data) => {
    setForm({
      id: data.id,
      nama: data.nama,
      deskripsi: data.deskripsi,
      gambarFile: null,
      gambarURL: data.gambar_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus jurusan ini?');
    if (!confirm) return;

    await supabase.from('jurusan').delete().eq('id', id);
    fetchData();
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Manajemen Jurusan</h1>

      <button
        onClick={() => {
          setForm({ id: null, nama: '', deskripsi: '', gambarFile: null, gambarURL: '' });
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        + Tambah Jurusan
      </button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-gray-800 p-4 rounded-lg shadow-md mb-6"
          >
            <h2 className="text-xl mb-4">
              {form.id ? 'Edit Jurusan' : 'Tambah Jurusan'}
            </h2>

            <div className="mb-4">
              <label className="block mb-1">Nama Jurusan</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Gambar</label>
              <input
                type="file"
                name="gambarFile"
                accept="image/*"
                onChange={handleChange}
                className="text-white"
              />
              {form.gambarURL && (
                <img
                  src={form.gambarURL}
                  alt="Preview"
                  className="mt-2 h-32 object-cover rounded"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white font-bold ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Batal
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jurusan.map((jrs) => (
          <div
            key={jrs.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={jrs.gambar_url}
              alt={jrs.nama}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{jrs.nama}</h3>
            <p className="text-sm text-gray-300 mb-3">{jrs.deskripsi}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(jrs)}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded text-sm"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(jrs.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
              >
                <FaTrash /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;