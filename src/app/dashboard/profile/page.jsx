'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff } from 'lucide-react';

export default function page() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setEmail(user.email);
        setUsername(user.user_metadata?.username || 'Belum diatur');
        fetchProfilePhoto(user.id);
      }
    };
    getUser();
  }, []);

  const fetchProfilePhoto = async (userId) => {
    const { data } = supabase.storage
      .from('foto-profil')
      .getPublicUrl(`${userId}.jpg`);
    setPhotoUrl(data.publicUrl);
  };

  const handlePasswordChange = async () => {
    if (!password) return alert("Password tidak boleh kosong.");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return alert("Gagal mengganti password.");
    alert("Password berhasil diganti!");
    setPassword('');
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;
    setUploading(true);

    const filePath = `${user.id}.jpg`;
    const { error } = await supabase.storage
      .from('foto-profil')
      .upload(filePath, file, { upsert: true });

    if (!error) fetchProfilePhoto(user.id);
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Profil Anda</h1>

      <div className="flex flex-col items-center gap-3">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Foto Profil"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
            Tidak ada foto
          </div>
        )}

        <button
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Mengunggah..." : "Ganti Foto Profil"}
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      <div>
        <label className="block font-semibold">Username</label>
        <input
          type="text"
          value={username}
          readOnly
          className="w-full p-2 border rounded bg-rose-900"
        />
      </div>

      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-2 border rounded bg-rose-900"
        />
      </div>

      <div>
        <label className="block font-semibold">Ganti Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password baru"
            className="w-full p-2 border rounded pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Simpan Password Baru
        </button>
      </div>
    </div>
  );
}