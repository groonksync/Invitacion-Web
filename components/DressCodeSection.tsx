'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EventData } from '@/types/event';

interface DressCodeSectionProps {
  dressCode: EventData['dressCode'];
}

export default function DressCodeSection({ dressCode }: DressCodeSectionProps) {
  return (
    <section className="py-24 sm:py-32 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
          Código de Vestimenta
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light">
          {dressCode.style}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed">
          {dressCode.description}
        </p>

        {/* Paleta de Colores Sugerida */}
        {dressCode.colors && dressCode.colors.length > 0 && (
          <div className="pt-4 space-y-3">
            <span className="text-[10px] tracking-widest uppercase text-gray-400 font-sans block">
              Gama sugerida
            </span>
            <div className="flex items-center justify-center gap-3">
              {dressCode.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-7 h-7 rounded-full border border-white/20 shadow-md"
                  style={{ backgroundColor: color }}
                  title={`Tono ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Nota de color reservado */}
        {dressCode.colorNotes && (
          <p className="text-xs sm:text-sm text-rosegold/80 font-serif italic max-w-md mx-auto pt-2">
            *{dressCode.colorNotes}
          </p>
        )}

        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-8" />
      </motion.div>
    </section>
  );
}
