'use client';

import Slider from '@/components/Slider';
import Header from '@/components/Header';
import Jurusan from '@/components/Jurusan';
import TentangSekolah from '@/components/TentangSekolah';
import BeritaSection from '@/components/BeritaSection'


export default function Home() {

  return (
    <main className="pt-20">
      <Header />
      <Slider />
<TentangSekolah />
	<Jurusan />
      <BeritaSection />
    </main>
  );
}