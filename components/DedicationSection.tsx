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
    <section className="py-28 sm:py-36 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="space-y-12"
      >
        {/* Encabezado con mucho aire */}
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
          Un Momento Inolvidable
        </span>

        {/* Frase / Pensamiento en Playfair Display */}
        <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-200 font-light leading-relaxed px-4">
          &ldquo;{phrase}&rdquo;
        </blockquote>

        <div className="text-xs sm:text-sm tracking-widest uppercase text-rosegold-light font-sans font-light">
          — {phraseAuthor} —
        </div>

        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto my-12" />

        {/* Mención a los Padres */}
        <div className="space-y-4 pt-4">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 font-sans font-light block">
            Con la bendición de mis padres
          </span>
          <p className="font-serif text-lg sm:text-2xl text-gray-200 font-normal leading-relaxed">
            {parents.mother} <br />
            <span className="text-sm font-sans font-light text-rosegold/70 block my-1">&</span>
            {parents.father}
          </p>
        </div>

        {parents.godparents && (
          <div className="space-y-2 pt-6">
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-gray-400 font-sans font-light block">
              Y mis padrinos
            </span>
            <p className="font-serif text-base sm:text-xl text-gray-300 font-light">
              {parents.godparents}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
