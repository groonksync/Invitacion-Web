'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Eye, Sparkles, LayoutGrid, Film } from 'lucide-react';
import { EventData } from '@/types/event';

interface PhotoGalleryProps {
  gallery: EventData['gallery'];
  name: string;
}

export default function PhotoGallery({ gallery, name }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'editorial' | 'carousel'>('editorial');
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Encabezado Editorial */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase shadow-lg">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Book Fotográfico Exclusivo</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal">
          Sesión de Fotos <span className="rose-gradient-text font-cursive block sm:inline text-4xl sm:text-6xl pt-1">Inolvidable</span>
        </h2>

        <p className="text-rose-200/80 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Cada fotografía captura la esencia, la belleza y la emoción de este momento irrepetible en la vida de {name}.
        </p>

        {/* Selector de Modo de Visualización */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="inline-flex p-1 rounded-2xl bg-black/60 border border-rose-400/20 backdrop-blur-md">
            <button
              onClick={() => setViewMode('editorial')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'editorial'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Mosaico Editorial</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                viewMode === 'carousel'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Pase Cinematográfico</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODO 1: Mosaico Editorial Asimétrico (Estilo Revista de Moda / Portafolio Fine Art) */}
      {viewMode === 'editorial' ? (
        <div className="space-y-8">
          {/* Fila 1: Foto Destacada Grande (Spotlight) + 2 Fotos Verticales */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Foto Destacada Principal (Ocupa 7 columnas) */}
            {gallery[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                onClick={() => openLightbox(0)}
                className="lg:col-span-7 group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-amber-400/30 shadow-2xl min-h-[420px] sm:min-h-[520px] flex flex-col justify-end p-6 sm:p-8"
              >
                <img
                  src={gallery[0].url}
                  alt={gallery[0].alt || 'Foto destacada'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Badge y datos editoriales */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-sans uppercase tracking-wider backdrop-blur-md">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Fotografía Destacada</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {gallery[0].caption || 'Momento Mágico'}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm max-w-md">
                    Toca para ampliar en máxima resolución
                  </p>
                </div>

                <div className="absolute top-6 right-6 p-3 rounded-full bg-black/60 border border-white/20 text-white group-hover:bg-rose-600 transition-colors backdrop-blur-sm">
                  <Eye className="w-5 h-5" />
                </div>
              </motion.div>
            )}

            {/* Dos Fotos Verticales en la columna derecha (Ocupa 5 columnas) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {gallery.slice(1, 3).map((item, idx) => (
                <motion.div
                  key={idx + 1}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  onClick={() => openLightbox(idx + 1)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-rose-400/20 shadow-xl min-h-[260px] sm:min-h-[250px] flex flex-col justify-end p-5"
                >
                  <img
                    src={item.url}
                    alt={item.alt || `Foto ${idx + 2}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  
                  <div className="relative z-10 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono text-amber-300 block uppercase tracking-widest">
                        0{idx + 2} / Sesión
                      </span>
                      <span className="font-serif text-base text-rose-100 font-medium">
                        {item.caption || 'Recuerdos de mis 15'}
                      </span>
                    </div>
                    <span className="p-2 rounded-full bg-black/50 border border-white/20 group-hover:bg-rose-600 transition-colors">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fila 2: Grid Dinámico de 3 o 4 Fotos con marcos de lujo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.slice(3).map((item, idx) => {
              const actualIndex = idx + 3;
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => openLightbox(actualIndex)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-950 border border-rose-400/20 hover:border-amber-400/50 shadow-xl aspect-[4/5] flex flex-col justify-end p-5 transition-all duration-300"
                >
                  <img
                    src={item.url}
                    alt={item.alt || `Foto ${actualIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                  {/* Número de foto en esquina superior */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-amber-300 backdrop-blur-sm">
                    {String(actualIndex + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-white">
                    <div>
                      <h4 className="font-serif text-lg text-white font-medium">
                        {item.caption || 'Mis Quince Años'}
                      </h4>
                      <span className="text-xs text-rose-300/80 font-sans">
                        Toca para pantalla completa
                      </span>
                    </div>
                    <span className="p-2.5 rounded-full bg-rose-600/80 text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MODO 2: Carrusel Cinematográfico en Gran Formato */
        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-black border border-amber-400/30 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={carouselIndex}
                src={gallery[carouselIndex].url}
                alt={gallery[carouselIndex].alt || 'Foto del carrusel'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openLightbox(carouselIndex)}
              />
            </AnimatePresence>

            {/* Overlay y Controles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10 pointer-events-auto">
              <div>
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block mb-1">
                  Foto {carouselIndex + 1} de {gallery.length}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium">
                  {gallery[carouselIndex].caption || 'Mis Quince Años'}
                </h3>
              </div>

              <button
                onClick={() => openLightbox(carouselIndex)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>Ver HD</span>
              </button>
            </div>

            {/* Botones de navegación del carrusel */}
            <button
              onClick={prevCarousel}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-rose-600 transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextCarousel}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:bg-rose-600 transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Miniaturas inferiores para saltar a cualquier foto */}
          <div className="flex items-center justify-center gap-2 mt-4 overflow-x-auto py-2">
            {gallery.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCarouselIndex(idx)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  carouselIndex === idx
                    ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/30'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VISOR MODAL LIGHTBOX HD DE ALTA CALIDAD */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6"
          >
            {/* Barra superior con título y botón de cierre */}
            <div className="w-full max-w-6xl flex items-center justify-between z-50">
              <div className="text-left">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Fotografía {selectedIndex + 1} de {gallery.length}
                </span>
                <h4 className="font-serif text-lg text-white font-medium">
                  {gallery[selectedIndex].caption || `Sesión de ${name}`}
                </h4>
              </div>

              <button
                onClick={closeLightbox}
                className="p-3 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors"
                title="Cerrar visor"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Imagen Principal en Pantalla Completa */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-5xl my-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                src={gallery[selectedIndex].url}
                alt={gallery[selectedIndex].alt || 'Foto en alta resolución'}
                className="max-w-full max-h-[70vh] sm:max-h-[76vh] object-contain rounded-2xl shadow-2xl border border-amber-400/20"
              />

              {/* Botones de Navegación Lateral */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-rose-600 border border-white/20 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-rose-600 border border-white/20 text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Tira inferior de miniaturas para navegar rápidamente */}
            <div
              className="w-full max-w-3xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {gallery.map((thumb, tIdx) => (
                <button
                  key={tIdx}
                  onClick={() => setSelectedIndex(tIdx)}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedIndex === tIdx
                      ? 'border-amber-400 scale-110 shadow-lg shadow-amber-400/40'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={thumb.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
