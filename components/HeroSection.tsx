'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ChevronDown } from 'lucide-react';

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
    <header className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Imagen de fondo con parallax/zoom suave y overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Capas de gradiente cinematográfico para legibilidad y elegancia */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0f] via-[#0d0a0f]/60 to-[#0d0a0f]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-black/80" />
      </div>

      {/* Contenido principal animado */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-16 pb-24 flex flex-col items-center">
        {/* Distintivo superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-6 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Celebremos Juntos</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
        </motion.div>

        {/* Subtítulo "Mis Quince Años" */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base font-sans uppercase tracking-[0.35em] text-amber-200/90 font-light mb-2"
        >
          {subtitle}
        </motion.h2>

        {/* Nombre de la Quinceañera con tipografía caligráfica espectacular */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cursive text-6xl sm:text-8xl md:text-9xl py-2 font-normal rose-gradient-text drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)]"
        >
          {name}
        </motion.h1>

        {/* Separador decorativo con flor de lis / rombo */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 my-6 w-64 max-w-full"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400/60" />
          <div className="w-2 h-2 rotate-45 border border-amber-300 bg-amber-400/80 shadow-[0_0_8px_#f59e0b]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-400/60" />
        </motion.div>

        {/* Fecha del evento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center gap-2 text-rose-100/90 text-sm sm:text-base md:text-lg font-serif italic tracking-wide capitalize"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>{formattedDate}</span>
        </motion.div>
      </div>

      {/* Flecha indicadora de Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-rose-300/70"
      >
        <span className="text-[10px] uppercase tracking-widest font-sans">Desliza</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-amber-300" />
      </motion.div>
    </header>
  );
}
