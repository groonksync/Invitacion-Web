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
  secondaryImage?: string;
  layout?: 'fullscreen' | 'album-duo' | 'floating-glass' | 'spotlight' | 'mosaic';
}

export default function DedicationSection({
  parents,
  backgroundImage = '/fotos/gabriela-torres/dsc09668.jpg',
  secondaryImage = '/fotos/gabriela-torres/dsc09709.jpg',
  layout = 'fullscreen',
}: DedicationSectionProps) {
  // MODO 2: ÁLBUM DÚO (2 FOTOS)
  if (layout === 'album-duo') {
    return (
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-16 px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          <div className="md:col-span-4 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-rosegold/20">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
          </div>

          <div className="md:col-span-4 text-center space-y-6 p-6 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-rosegold/30 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rosegold/10 text-rosegold text-[10px] tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>Nuestra Familia</span>
            </div>
            <h2 className="font-serif text-2xl text-white font-light">Con la Bendición de Mis Padres</h2>
            <div className="w-10 h-[1px] bg-rosegold/40 mx-auto" />
            <div className="text-gray-200 font-serif text-lg leading-relaxed">
              {parents.mother} <br />
              <span className="text-xs font-sans text-rosegold">&</span> <br />
              {parents.father}
            </div>
            {parents.godparents && (
              <div className="pt-2">
                <span className="text-[9px] uppercase tracking-widest text-rosegold-light font-sans block">Mis Padrinos</span>
                <p className="font-serif text-sm text-gray-300">{parents.godparents}</p>
              </div>
            )}
          </div>

          <div className="md:col-span-4 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-rosegold/20 hidden md:block">
            <img src={secondaryImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
          </div>
        </div>
      </section>
    );
  }

  // MODO 3: TARJETA FLOTANTE FINE-ART
  if (layout === 'floating-glass') {
    return (
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-16 px-4">
        <div className="absolute inset-0 opacity-40 blur-2xl scale-110" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#131313]/80" />

        <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-black/60 backdrop-blur-2xl border border-rosegold/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-rosegold shadow-xl">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Con la Bendición de Mis Padres
          </h2>
          <div className="w-12 h-[1px] bg-rosegold/40 mx-auto" />

          <p className="font-serif text-2xl sm:text-3xl text-gray-100 font-normal leading-relaxed">
            {parents.mother} <br />
            <span className="text-sm font-sans font-light text-rosegold block my-1">&</span>
            {parents.father}
          </p>

          {parents.godparents && (
            <div className="space-y-1 pt-4">
              <span className="text-[10px] tracking-widest uppercase text-rosegold font-sans block">Mis Padrinos</span>
              <p className="font-serif text-lg text-gray-200">{parents.godparents}</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // MODO 1: FULLSCREEN (DEFAULT)
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-20 px-6">
      {/* Fotografía a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_top] sm:bg-center transition-transform duration-1000 scale-100 sm:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/65 via-20% to-transparent to-45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 via-25% to-transparent to-55%" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Contenido Superpuesto */}
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
