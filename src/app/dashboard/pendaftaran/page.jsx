"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function page() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [popupData, setPopupData] = useState(null);

  const fetchData = async () => {
    const { data: pendaftar, error } = await supabase
      .from("pendaftar_sekolah")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setData(pendaftar);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await supabase.from("pendaftar_sekolah").delete().eq("id", id);
    fetchData();
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pendaftar");
    XLSX.writeFile(workbook, "data_pendaftar.xlsx");
  };

  const filtered = filter
    ? data.filter((item) =>
        item.nama.toLowerCase().includes(filter.toLowerCase())
      )
    : data;

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama..."
          className="p-2 rounded bg-gray-800 border border-gray-600"
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            <FileDown /> Excel
          </button>
          <span>Total: {filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-gray-800 p-4 rounded shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <h2 className="text-lg font-bold">{item.nama}</h2>
            <p className="text-sm text-gray-300">{item.nisn}</p>
            <p className="text-sm text-gray-400">{item.jurusan}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setPopupData(item)}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Detail
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <motion.div
            className="bg-gray-900 p-6 rounded-xl w-full max-w-md text-white"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Detail Pendaftar</h3>
            <p><strong>Nama:</strong> {popupData.nama}</p>
            <p><strong>NISN:</strong> {popupData.nisn}</p>
            <p><strong>Tempat Lahir:</strong> {popupData.tempat_lahir}</p>
            <p><strong>Tanggal Lahir:</strong> {popupData.tanggal_lahir}</p>
            <p><strong>Alamat:</strong> {popupData.alamat}</p>
            <p><strong>No HP:</strong> {popupData.no_hp}</p>
            <p><strong>Email:</strong> {popupData.email}</p>
            <p><strong>Daftar:</strong> {new Date(popupData.created_at).toLocaleString()}</p>
            <button
              onClick={() => setPopupData(null)}
              className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}