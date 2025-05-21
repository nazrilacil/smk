'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function Slider() {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchSliders = async () => {
      const { data, error } = await supabase.from('slider').select('*');
      if (!error) setSliders(data);
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex, sliders]);

  const startAutoSlide = () => {
    stopAutoSlide(); // clear interval sebelumnya
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev =>
        prev === sliders.length - 1 ? 0 : prev + 1
      );
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  if (sliders.length === 0) return <p className="p-4 text-center">Loading slider...</p>;

  return (
    <div className="relative w-[90%] h-[200px] md:h-[400px] sm:h-[300px] lg:h-[500px] overflow-hidden mx-auto bg-gray-200 rounded-xl">
      {sliders.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.image_url}
          alt={slide.title}
          className={`absolute w-full object-cover h-[200px] md:h-[400px] sm:h-[300px] lg:h-[500px] transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      {/* Tombol navigasi */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full"
      >
        <AiOutlineLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full"
      >
        <AiOutlineRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-black w-6' : 'bg-black/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}