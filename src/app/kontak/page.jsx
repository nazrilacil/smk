'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import React from 'react';

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b  to-green-900 px-6 py-12">
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Kontak Kami
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Google Maps Embed */}
        <motion.div
          className="rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=Bojongkondang%2C%20Kec.%20Langkaplancar%2C%20Kab.%20Pangandaran%2C%20Jawa%20Barat%2046391&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-96"
          ></iframe>
        </motion.div>

        {/* Kontak Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-green-400 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold">Alamat Sekolah</h2>
              <p>Jl. Raya Langkaplancar No.99, Pangandaran, Jawa Barat</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-green-400 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold">Email</h2>
              <p>smkalmasturiyah@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhone className="text-green-400 text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold">Telepon</h2>
              <p>+62 853-5334-2066</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
        }
