'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

export default function SliderDashboard() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    const { data, error } = await supabase.from('slider').select('*').order('id', { ascending: false });
    if (error) console.error('Fetch error:', error);
    else setSliders(data);
  };

  const handleUpload = async () => {
    if (!image) return alert("Pilih gambar dulu");
    setLoading(true);

    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase
      .storage
      .from('slider-images')
      .upload(fileName, image);

    if (uploadError) {
      alert("Upload gambar gagal");
      setLoading(false);
      return;
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/slider-images/${fileName}`;

    const { error: insertError } = await supabase
      .from('slider')
      .insert([{ title, image_url: publicUrl }]);

    if (insertError) {
      alert("Gagal menyimpan ke database");
      setLoading(false);
      return;
    }

    alert("Berhasil upload dan simpan!");
    setTitle('');
    setImage(null);
    fetchSliders();
    setLoading(false);
  };

  const deleteSlider = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('slider').delete().eq('id', id);
    if (error) alert("Gagal menghapus slider");
    else fetchSliders();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Slider</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <input
          type="text"
          placeholder="Judul slider"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-gray-700 text-white rounded"
        />
        
        <label
  htmlFor="File"
  className="flex flex-col items-center rounded border border-gray-300 bg-white p-4 text-gray-900 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
    />
  </svg>

  <span className="mt-4 font-medium dark:text-white"> Upload your file(s) </span>

  <span
    className="mt-2 inline-block rounded border border-gray-200 bg-gray-50 px-3 py-1.5 text-center text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
  >
    Browse files
  </span>

  <input multiple 
  type="file" 
  id="File" 
  className="sr-only"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])} />
</label>
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaCloudUploadAlt />
          {loading ? 'Mengupload...' : 'Tambah Slider'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div key={slider.id} className="bg-gray-800 rounded shadow-lg overflow-hidden">
            <img
              src={slider.image_url}
              alt={slider.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold">{slider.title}</h2>
              <button
                onClick={() => deleteSlider(slider.id)}
                className="mt-2 flex items-center gap-2 text-red-400 hover:text-red-600"
              >
                <FaTrash /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}