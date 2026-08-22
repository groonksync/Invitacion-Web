'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  name: string;
  subtitle: string;
  date: string;
  heroImage: string;
}

export default function HeroSection({ name, subtitle, date, heroImage }: HeroSectionProps) {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="relative min-h-[100svh] w-full flex flex-col justify-end items-center overflow-hidden bg-[#131313]">
      {/* Fotografía Principal a Pantalla Completa con Viñeta Desvanecida */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center sm:bg-top scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Capas de Desvanecimiento Cinematográfico hacia #131313 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/60 via-transparent to-[#131313]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#131313_90%)]" />
      </div>

      {/* Zona Inferior: Tipografía Playfair Display Oro Rosa (#E2A4AD) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 pt-32 text-center flex flex-col items-center">
        {/* Emblema "XV" en Oro Rosa */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-4"
        >
          <span className="font-serif text-3xl sm:text-4xl tracking-[0.4em] text-rosegold font-light block">
            XV
          </span>
          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-2" />
        </motion.div>

        {/* Subtítulo elegante */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold-light/80 font-sans font-light mb-3"
        >
          {subtitle}
        </motion.p>

        {/* Nombre de la Quinceañera en Playfair Display Mayúsculas de Ultra-Lujo */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-[0.15em] sm:tracking-[0.2em] uppercase rose-gold-gradient-text drop-shadow-[0_4px_30px_rgba(226,164,173,0.3)] py-2"
        >
          {name}
        </motion.h1>

        {/* Fecha en sans-serif ligera con mucho aire */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 text-xs sm:text-sm tracking-widest uppercase text-gray-300/90 font-sans font-light"
        >
          <span>{formattedDate}</span>
        </motion.div>
      </div>

      {/* Indicador de Desplazamiento Minimalista */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-rosegold/60 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-rosegold" />
      </motion.div>
    </header>
  );
}
