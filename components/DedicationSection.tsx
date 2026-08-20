'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

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
    <section className="relative py-20 px-4 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative glass-card rounded-3xl p-8 sm:p-12"
      >
        {/* Ícono de comillas decorativas */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-950/50">
          <Quote className="w-5 h-5 rotate-180" />
        </div>

        <p className="font-serif italic text-lg sm:text-2xl text-rose-100/90 leading-relaxed pt-4 pb-6">
          &ldquo;{phrase}&rdquo;
        </p>

        <div className="font-cursive text-3xl sm:text-4xl text-amber-300 mb-8">
          - {phraseAuthor}
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-rose-400/30 to-transparent my-6" />

        {/* Padres y Padrinos */}
        <div className="space-y-6 pt-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300/80 font-sans block mb-2">
              Con la bendición de mis amados padres
            </span>
            <p className="font-serif text-base sm:text-lg text-white font-medium">
              {parents.mother} <br />
              <span className="text-sm font-sans font-light text-rose-300">&</span> <br />
              {parents.father}
            </p>
          </div>

          {parents.godparents && (
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-amber-300/80 font-sans block mb-2">
                Y mis queridos padrinos
              </span>
              <p className="font-serif text-base sm:text-lg text-rose-100/90">
                {parents.godparents}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center text-rose-400/60">
          <Heart className="w-4 h-4 fill-current animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
