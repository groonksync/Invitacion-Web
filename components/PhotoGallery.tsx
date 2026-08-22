'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { EventData } from '@/types/event';

interface PhotoGalleryProps {
  gallery: EventData['gallery'];
  name: string;
}

export default function PhotoGallery({ gallery, name }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length);
  };

  // Crear pares de imágenes para la composición de doble profundidad (Diseño 4)
  const imagePairs = [];
  for (let i = 0; i < gallery.length; i += 2) {
    imagePairs.push({
      bg: gallery[i],
      bgIndex: i,
      fg: gallery[i + 1] || gallery[0],
      fgIndex: i + 1 < gallery.length ? i + 1 : 0,
    });
  }

  return (
    <section className="py-24 sm:py-36 w-full overflow-hidden bg-[#131313]">
      {/* Título de la Galería */}
      <div className="text-center mb-20 sm:mb-28 px-6">
        <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block mb-3">
          Sesión de Fotografías
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide">
          Galería de Recuerdos
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md mx-auto mt-4 leading-relaxed">
          Momentos capturados para revivir la magia de mis 15 años
        </p>
        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </div>

      {/* DÚOS DE DOBLE PROFUNDIDAD (Estilo Diseño 4: Atmósfera de Fondo + Retrato Spotlight) */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-36 sm:space-y-48">
        {imagePairs.map((pair, pIdx) => (
          <div key={pIdx} className="relative w-full flex flex-col items-center">
            {/* 1. Fotografía de Fondo (Plano Amplio / Atmósfera en penumbra con bordes difuminados) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              onClick={() => openLightbox(pair.bgIndex)}
              className="group relative w-[95%] sm:w-[90%] mx-auto aspect-[4/5] sm:aspect-[16/10] cursor-pointer overflow-hidden flex items-center justify-center opacity-75 hover:opacity-90 transition-opacity"
            >
              <img
                src={pair.bg.url}
                alt={pair.bg.alt || 'Foto de fondo'}
                className="w-full h-full object-cover feather-mask-deep transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 feather-overlay-all pointer-events-none" />
              <div className="absolute inset-0 feather-overlay-vertical pointer-events-none" />

              {/* Indicador sutil de toque */}
              <div className="absolute top-6 right-6 p-2.5 rounded-full bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </motion.div>

            {/* 2. Fotografía de Primer Plano (Retrato Spotlight Nítido superpuesto en el centro) */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, delay: 0.25, ease: 'easeOut' }}
              onClick={() => openLightbox(pair.fgIndex)}
              className="group relative -mt-32 sm:-mt-48 md:-mt-56 z-10 w-[82%] sm:w-[68%] md:w-[60%] mx-auto aspect-[4/5] cursor-pointer overflow-hidden flex items-center justify-center"
            >
              <img
                src={pair.fg.url}
                alt={pair.fg.alt || 'Retrato Spotlight'}
                className="w-full h-full object-cover feather-mask-deep drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-transform duration-1000 group-hover:scale-108"
                loading="lazy"
              />
              {/* Niebla suave de luz y difuminado hacia #131313 */}
              <div className="absolute inset-0 feather-overlay-all pointer-events-none" />
              <div className="absolute inset-0 feather-overlay-vertical pointer-events-none" />

              {/* Indicador de toque */}
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </motion.div>

            {/* 3. Textos y Detalles bajo la Composición */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 text-center space-y-1 z-10"
            >
              <h3 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-gray-100 font-light tracking-wide">
                {pair.fg.caption || pair.bg.caption || 'Mis Quince Años'}
              </h3>
              <p className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light">
                {name} — Sesión Exclusiva
              </p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Visor Lightbox a Pantalla Completa */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#131313]/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Barra superior */}
            <div className="w-full max-w-5xl flex items-center justify-between z-50">
              <span className="text-xs font-serif italic text-rosegold tracking-widest">
                {selectedIndex + 1} / {gallery.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2.5 rounded-full text-gray-400 hover:text-white transition-colors"
                title="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Imagen Principal */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-4xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={gallery[selectedIndex].url}
                alt={gallery[selectedIndex].alt || 'Foto'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Pie de foto */}
            <div className="w-full text-center pb-2">
              <p className="font-serif italic text-gray-200 text-sm sm:text-base">
                {gallery[selectedIndex].caption || `Sesión de ${name}`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
