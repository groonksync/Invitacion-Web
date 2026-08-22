'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface DedicationSectionProps {
  parents: {
    mother: string;
    father: string;
    godparents?: string;
  };
  backgroundImage?: string;
}

export default function DedicationSection({
  parents,
  backgroundImage = '/fotos/gabriela-torres/dsc09668.jpg',
}: DedicationSectionProps) {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-20 px-6">
      {/* Fotografía 2 a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_top] sm:bg-center transition-transform duration-1000 scale-100 sm:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Capas de Contraste para Lectura Nítida */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-[#131313]/60" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Contenido Superpuesto: Bendición de Padres */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-rosegold/30 text-rosegold text-[11px] tracking-widest uppercase backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rosegold" />
            <span>Nuestra Familia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            Con la Bendición de Mis Padres
          </h2>

          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-4" />

          {/* Nombres de los Padres */}
          <div className="pt-4 space-y-2">
            <p className="font-serif text-2xl sm:text-4xl text-gray-100 font-normal leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {parents.mother} <br />
              <span className="text-base font-sans font-light text-rosegold block my-1">&</span>
              {parents.father}
            </p>
          </div>

          {/* Padrinos */}
          {parents.godparents && (
            <div className="space-y-2 pt-6">
              <span className="text-[10px] sm:text-xs tracking-widest uppercase text-rosegold-light/80 font-sans font-light block">
                Y de mis queridos padrinos
              </span>
              <p className="font-serif text-xl sm:text-2xl text-gray-200 font-light drop-shadow-md">
                {parents.godparents}
              </p>
            </div>
          )}

          <div className="pt-8 flex items-center justify-center gap-2 text-rosegold/80">
            <Heart className="w-5 h-5 fill-current text-rosegold animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
