'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

      {/* Flujo Cinematográfico de Fotos GRANDES con Bordes 100% Difuminados */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-28 sm:space-y-40">
        {gallery.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              onClick={() => openLightbox(index)}
              className="group relative w-[95%] sm:w-[90%] md:w-[88%] mx-auto cursor-pointer flex flex-col items-center"
            >
              {/* Contenedor de Fotografía en Gran Formato sin Cuadros */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/11] overflow-hidden flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.alt || `Fotografía ${index + 1}`}
                  className="w-full h-full object-cover feather-mask-deep scale-100 sm:scale-105 transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Triple Capa de Fusión Perimetral (Bordes completamente desvanecidos hacia #131313) */}
                <div className="absolute inset-0 feather-overlay-all pointer-events-none" />
                <div className="absolute inset-0 feather-overlay-vertical pointer-events-none" />
                <div className="absolute inset-0 feather-overlay-horizontal pointer-events-none" />
              </div>

              {/* Pie de Foto Minimalista en Playfair Display */}
              {item.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-6 text-center space-y-1"
                >
                  <p className="font-serif italic text-lg sm:text-2xl text-gray-200 font-light tracking-wide">
                    {item.caption}
                  </p>
                  <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-rosegold/70 font-sans font-light block">
                    Toca para ver en pantalla completa
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
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
