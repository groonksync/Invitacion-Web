'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Heart, Sparkles } from 'lucide-react';

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
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative glass-card-gold rounded-3xl p-8 sm:p-14 shadow-2xl border border-amber-400/30 overflow-hidden"
      >
        {/* Adornos de fondo sutiles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ícono de comillas decorativas con destello */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-600 flex items-center justify-center text-white shadow-xl shadow-rose-950/60 border-2 border-[#0d0a0f]">
          <Quote className="w-6 h-6 rotate-180" />
        </div>

        <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-rose-100 leading-relaxed pt-6 pb-6 font-light">
          &ldquo;{phrase}&rdquo;
        </p>

        <div className="font-cursive text-3xl sm:text-5xl text-amber-300 mb-8 font-normal">
          - {phraseAuthor}
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent my-8" />

        {/* Padres y Padrinos */}
        <div className="space-y-6 pt-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block mb-2 font-medium">
              Con la bendición y el amor de mis padres
            </span>
            <p className="font-serif text-lg sm:text-xl text-white font-medium">
              {parents.mother} <br />
              <span className="text-sm font-sans font-light text-rose-300">&</span> <br />
              {parents.father}
            </p>
          </div>

          {parents.godparents && (
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block mb-2 font-medium">
                Y de mis queridos padrinos
              </span>
              <p className="font-serif text-base sm:text-lg text-rose-100/90">
                {parents.godparents}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-rose-400/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <Heart className="w-4 h-4 fill-current text-rose-500 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
      </motion.div>
    </section>
  );
}
