'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  name: string;
  subtitle: string;
  date: string;
  heroImage: string;
  imagePosition?: 'center' | 'top' | 'bottom' | 'contain';
}

export default function HeroSection({
  name,
  subtitle,
  date,
  heroImage,
  imagePosition = 'top',
}: HeroSectionProps) {
  const eventDate = new Date(date);
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getBgPositionClass = () => {
    switch (imagePosition) {
      case 'top':
        return 'bg-[center_top] sm:bg-[center_15%]';
      case 'bottom':
        return 'bg-[center_bottom]';
      case 'contain':
        return 'bg-contain bg-no-repeat bg-center';
      default:
        return 'bg-center';
    }
  };

  return (
    <header className="relative min-h-[100svh] w-full flex flex-col justify-end items-center overflow-hidden bg-[#131313]">
      {/* Fotografía Principal Adaptada a Móvil y Escritorio */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover scale-100 sm:scale-105 transition-transform duration-1000 ${getBgPositionClass()}`}
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Capas Cinematográficas de Difuminado Suave hacia #131313 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 via-25% to-transparent to-60%" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_#131313_95%)]" />
      </div>

      {/* Zona Inferior: Tipografía Playfair Display en Oro Rosa (#E2A4AD) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 pt-28 text-center flex flex-col items-center">
        {/* Emblema "XV" en Oro Rosa */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-2 sm:mb-4"
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
          className="text-[9px] sm:text-xs tracking-widest-xl uppercase text-rosegold-light/85 font-sans font-light mb-2 sm:mb-3"
        >
          {subtitle}
        </motion.p>

        {/* Nombre de la Quinceañera */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-3xl sm:text-5xl md:text-7xl font-normal tracking-[0.1em] sm:tracking-[0.18em] uppercase rose-gold-gradient-text drop-shadow-[0_4px_30px_rgba(226,164,173,0.35)] py-2 leading-tight"
        >
          {name}
        </motion.h1>

        {/* Fecha en sans-serif ligera */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-3 sm:mt-6 text-[10px] sm:text-xs md:text-sm tracking-widest uppercase text-gray-300/90 font-sans font-light"
        >
          <span>{formattedDate}</span>
        </motion.div>
      </div>

      {/* Indicador de Desplazamiento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-rosegold/60 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-rosegold" />
      </motion.div>
    </header>
  );
}
