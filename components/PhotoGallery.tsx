'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import { EventData } from '@/types/event';

interface PhotoGalleryProps {
  gallery: EventData['gallery'];
  name: string;
}

export default function PhotoGallery({ gallery, name }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Las 4 imágenes principales solicitadas para la galería
  const showcaseImages = [
    {
      url: gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg',
      number: '01',
      tag: 'SESIÓN EN EL JARDÍN',
      title: 'Un Sueño Hecho Realidad',
      description: 'El comienzo de una noche mágica, llena de ilusiones, sonrisas y momentos que quedarán por siempre en el corazón.',
      align: 'left', // Foto a la izquierda, texto a la derecha
    },
    {
      url: gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg',
      number: '02',
      tag: 'ALEGRÍA & EMOCIÓN',
      title: 'Sonrisas Inolvidables',
      description: 'Celebrar mis 15 años rodeada de las personas que más amo es el regalo más hermoso de la vida.',
      align: 'right', // Foto a la derecha, texto a la izquierda
    },
    {
      url: gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg',
      number: '03',
      tag: 'ELEGANCIA & BRILLO',
      title: 'Corona de Recuerdos',
      description: 'Cada detalle y cada destello brillan con la promesa de una velada única e irrepetible.',
      align: 'left', // Foto a la izquierda, texto a la derecha
    },
    {
      url: gallery[3]?.url || '/fotos/gabriela-torres/dsc09721.jpg',
      number: '04',
      tag: 'LA GRAN NOCHE',
      title: 'Esperando el Gran Momento',
      description: 'Lista para bailar el vals, brindar con todos ustedes y celebrar juntos hasta el amanecer.',
      align: 'right', // Foto a la derecha, texto a la izquierda
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % showcaseImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + showcaseImages.length) % showcaseImages.length);
  };

  return (
    <section className="py-24 sm:py-36 w-full overflow-hidden bg-[#131313]">
      {/* Título de la Galería */}
      <div className="text-center mb-24 sm:mb-32 px-6">
        <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block mb-3">
          Sesión Fotográfica
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-wide">
          Galería de Recuerdos
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm font-light max-w-md mx-auto mt-4 leading-relaxed">
          Los momentos más hermosos de la sesión de fotos de {name}
        </p>
        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </div>

      {/* SECUENCIA EN ZIGZAG: Foto 1 (Izq) -> Foto 2 (Der) -> Foto 3 (Izq) -> Foto 4 (Der) */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 space-y-28 sm:space-y-40">
        {showcaseImages.map((item, index) => {
          const isLeft = item.align === 'left';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className={`flex flex-col ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center justify-between gap-8 sm:gap-12 md:gap-16`}
            >
              {/* Contenedor de la Fotografía con Desvanecimiento a Negro en los 4 Bordes */}
              <div
                onClick={() => openLightbox(index)}
                className="group relative w-full md:w-[54%] aspect-[3/4] sm:aspect-[4/5] cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover feather-all-edges scale-100 sm:scale-105 transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Capas Cuádruples de Desvanecimiento Suave (Arriba, Abajo, Izquierda y Derecha) */}
                <div className="absolute inset-0 vignette-fade-4ways pointer-events-none" />

                {/* Botón sutil de visualización al pasar el cursor */}
                <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-rosegold-light opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Contenedor de Textos en el espacio libre */}
              <div
                className={`w-full md:w-[46%] text-center ${
                  isLeft ? 'md:text-left' : 'md:text-right'
                } space-y-4 px-4 sm:px-6`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-rosegold block font-light">
                    {item.number} / {item.tag}
                  </span>
                  <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-gray-100 font-light leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed max-w-md mx-auto md:mx-0">
                  {item.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-rosegold/70 font-sans font-light">
                    <Sparkles className="w-3 h-3 text-rosegold" />
                    <span>{name} — XV Años</span>
                  </span>
                </div>
              </div>
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
                {selectedIndex + 1} / {showcaseImages.length}
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
                src={showcaseImages[selectedIndex].url}
                alt={showcaseImages[selectedIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />

              {showcaseImages.length > 1 && (
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
                {showcaseImages[selectedIndex].title} — {name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
