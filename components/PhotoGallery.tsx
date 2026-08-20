'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-2">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Sesión Fotográfica</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
          Galería de Recuerdos
        </h2>
        <p className="text-rose-200/70 text-sm mt-2 max-w-md mx-auto">
          Un vistazo a los momentos mágicos de la sesión pre-15 de {name}
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 mx-auto mt-4" />
      </div>

      {/* Grid de fotos editorial */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {gallery.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-rose-400/20 shadow-lg"
          >
            <img
              src={item.url}
              alt={item.alt || `Foto ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-xs font-serif italic text-amber-200">{item.caption || 'Ver fotografía'}</span>
                <span className="p-1.5 rounded-full bg-rose-600/80 backdrop-blur-sm">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visor Modal Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            {/* Botón Cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Contenedor de la Imagen */}
            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={gallery[selectedIndex].url}
                alt={gallery[selectedIndex].alt || 'Foto ampliada'}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-rose-500/30"
              />

              {/* Pie de foto y contador */}
              <div className="mt-4 text-center">
                <p className="font-serif italic text-rose-200 text-lg">
                  {gallery[selectedIndex].caption || 'Mis Quince Años'}
                </p>
                <span className="text-xs text-amber-400/80 font-sans tracking-widest uppercase">
                  {selectedIndex + 1} de {gallery.length}
                </span>
              </div>
            </div>

            {/* Botones de Navegación */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
