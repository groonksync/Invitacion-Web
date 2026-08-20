'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';
import { EventData } from '@/types/event';

interface DressCodeSectionProps {
  dressCode: EventData['dressCode'];
}

export default function DressCodeSection({ dressCode }: DressCodeSectionProps) {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-gold rounded-3xl p-8 sm:p-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Código de Vestimenta</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-3">
          {dressCode.style}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto mb-8">
          {dressCode.description}
        </p>

        {/* Muestras de colores recomendados */}
        {dressCode.colors && dressCode.colors.length > 0 && (
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-rose-300 font-sans block mb-3">
              Gama sugerida
            </span>
            <div className="flex items-center justify-center gap-3">
              {dressCode.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full border-2 border-white/20 shadow-md transform hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={`Color sugerido ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Nota de color reservado */}
        {dressCode.colorNotes && (
          <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-rose-950/40 border border-rose-400/30 text-rose-200 text-xs sm:text-sm max-w-md mx-auto">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-left leading-relaxed">{dressCode.colorNotes}</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
