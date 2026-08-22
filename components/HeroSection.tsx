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
      {/* Fotografía Principal Adaptada a Móvil y Escritorio con Difuminado */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_20%] sm:bg-[center_15%] md:bg-center scale-100 sm:scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Capas Cinematográficas de Difuminado perimetral hacia #131313 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/50 via-transparent to-[#131313]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#131313_95%)]" />
      </div>

      {/* Zona Inferior: Tipografía Playfair Display en Oro Rosa (#E2A4AD) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 sm:pb-20 pt-36 text-center flex flex-col items-center">
        {/* Emblema "XV" en Oro Rosa */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-3 sm:mb-4"
        >
          <span className="font-serif text-2xl sm:text-4xl tracking-[0.4em] text-rosegold font-light block">
            XV
          </span>
          <div className="w-10 sm:w-12 h-[1px] bg-rosegold/50 mx-auto mt-2" />
        </motion.div>

        {/* Subtítulo elegante */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold-light/85 font-sans font-light mb-2 sm:mb-3"
        >
          {subtitle}
        </motion.p>

        {/* Nombre de la Quinceañera */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl font-normal tracking-[0.12em] sm:tracking-[0.18em] uppercase rose-gold-gradient-text drop-shadow-[0_4px_30px_rgba(226,164,173,0.35)] py-2 leading-tight"
        >
          {name}
        </motion.h1>

        {/* Fecha en sans-serif ligera */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-4 sm:mt-6 text-[11px] sm:text-xs md:text-sm tracking-widest uppercase text-gray-300/90 font-sans font-light"
        >
          <span>{formattedDate}</span>
        </motion.div>
      </div>

      {/* Indicador de Desplazamiento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-rosegold/60 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-rosegold" />
      </motion.div>
    </header>
  );
}
