'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DedicationSectionProps {
  phrase: string;
  phraseAuthor: string;
  parents: {
    mother: string;
    father: string;
    godparents?: string;
  };
}

export default function DedicationSection({ phrase, phraseAuthor, parents }: DedicationSectionProps) {
  return (
    <section className="py-24 sm:py-36 px-6 max-w-4xl mx-auto text-center space-y-16 sm:space-y-24">
      {/* Transición de Texto: Un Momento Inolvidable */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="space-y-8 sm:space-y-10"
      >
        <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
          Un Momento Inolvidable
        </span>

        <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-200 font-light leading-relaxed px-2 sm:px-6">
          &ldquo;{phrase}&rdquo;
        </blockquote>

        <div className="text-xs sm:text-sm tracking-widest uppercase text-rosegold-light/80 font-sans font-light">
          — {phraseAuthor} —
        </div>

        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto" />
      </motion.div>

      {/* Retrato Inmersivo Desvanecido en el Fondo Oscuro (Sin cuadros, 100% fundido) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="relative w-[92%] sm:w-[85%] max-w-2xl mx-auto aspect-[3/4] sm:aspect-[4/5] overflow-hidden flex items-center justify-center my-8"
      >
        <img
          src="/fotos/gabriela-torres/dsc09709.jpg"
          alt="Quinceañera"
          className="w-full h-full object-cover feather-mask-portrait scale-105"
          loading="lazy"
        />
        {/* Capas perimetrales para fusión perfecta en todos los bordes */}
        <div className="absolute inset-0 feather-overlay-all pointer-events-none" />
        <div className="absolute inset-0 feather-overlay-vertical pointer-events-none" />
      </motion.div>

      {/* Mención a los Padres con Mucho Aire */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="space-y-6 pt-4"
      >
        <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 font-sans font-light block">
          Con la bendición y el amor de mis padres
        </span>
        <p className="font-serif text-xl sm:text-3xl text-gray-100 font-normal leading-relaxed">
          {parents.mother} <br />
          <span className="text-sm font-sans font-light text-rosegold/70 block my-1">&</span>
          {parents.father}
        </p>

        {parents.godparents && (
          <div className="space-y-1 pt-6">
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 font-sans font-light block">
              Y mis queridos padrinos
            </span>
            <p className="font-serif text-base sm:text-xl text-gray-300 font-light">
              {parents.godparents}
            </p>
          </div>
        )}

        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-12" />
      </motion.div>
    </section>
  );
}
