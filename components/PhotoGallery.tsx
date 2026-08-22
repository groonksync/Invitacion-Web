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
    <section className="py-24 sm:py-32 w-full overflow-hidden bg-[#131313]">
      {/* Título de la Sección de Fotografías */}
      <div className="text-center mb-16 sm:mb-24 px-6">
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block mb-3">
          Sesión Fotográfica
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide">
          Galería de Recuerdos
        </h2>
        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </div>

      {/* Galería Inmersiva con Viñeta Radial (Fotos al 85-90% de ancho sin marcos) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 space-y-24 sm:space-y-36">
        {gallery.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            onClick={() => openLightbox(index)}
            className="group relative w-[90%] sm:w-[85%] mx-auto cursor-pointer flex flex-col items-center"
          >
            {/* Contenedor de la Imagen con Máscara Radial de Viñeta */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] overflow-hidden flex items-center justify-center">
              <img
                src={item.url}
                alt={item.alt || `Fotografía ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 vignette-radial-mask"
                loading="lazy"
              />
              {/* Capa adicional para fusión perfecta con #131313 */}
              <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
            </div>

            {/* Pie de Foto Minimalista en Playfair Display */}
            {item.caption && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="font-serif italic text-base sm:text-xl text-gray-300 font-light tracking-wide">
                  {item.caption}
                </p>
                <span className="text-[9px] tracking-widest uppercase text-rosegold/70 font-sans mt-1 block">
                  Toca para ampliar
                </span>
              </motion.div>
            )}
          </motion.div>
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
            {/* Barra superior con cierre */}
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
                className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/80 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Pie de foto en visor */}
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
