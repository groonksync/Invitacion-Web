'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, Sparkles, MapPin, Navigation } from 'lucide-react';
import { EventData } from '@/types/event';

interface LocationsSectionProps {
  ceremony: EventData['ceremony'];
  party: EventData['party'];
  backgroundImage?: string;
  imagePosition?: 'center' | 'top' | 'bottom' | 'contain';
}

export default function LocationsSection({
  ceremony,
  party,
  backgroundImage = '/fotos/gabriela-torres/dsc09709.jpg',
  imagePosition = 'top',
}: LocationsSectionProps) {
  const getBgPositionClass = () => {
    switch (imagePosition) {
      case 'top':
        return 'bg-[center_top]';
      case 'bottom':
        return 'bg-[center_bottom]';
      case 'contain':
        return 'bg-contain bg-no-repeat bg-center';
      default:
        return 'bg-center';
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-12 sm:py-20 px-3 sm:px-6">
      {/* Fotografía 3 a Pantalla Completa con Ajuste Móvil */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover transition-transform duration-1000 scale-100 sm:scale-105 ${getBgPositionClass()}`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* FUSIÓN SUAVE */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/70 via-20% to-transparent to-45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/75 via-25% to-transparent to-55%" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Contenido Superpuesto: Ceremonia & Recepción */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-8 sm:space-y-12 my-auto">
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
            Lugar & Hora
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-light drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            La Celebración
          </h2>
          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-2" />
        </div>

        {/* Tarjetas adaptadas a Smartphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {/* 1. Ceremonia Religiosa */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between p-5 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-rosegold/25 shadow-2xl space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-rosegold/40 bg-black/40 flex items-center justify-center text-rosegold shrink-0">
                  <Church className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-rosegold font-sans block">
                    Ceremonia Religiosa
                  </span>
                  <p className="text-rosegold-light text-xs font-sans font-semibold">
                    {ceremony.time} hrs
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg sm:text-2xl text-white font-normal leading-snug">
                  {ceremony.title}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-gray-200">{ceremony.locationName}</p>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{ceremony.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all truncate"
              >
                <MapPin className="w-3 h-3 text-rosegold shrink-0" />
                <span className="truncate">Google Maps</span>
              </a>
              <a
                href={ceremony.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all truncate"
              >
                <Navigation className="w-3 h-3 text-rosegold shrink-0" />
                <span className="truncate">Waze</span>
              </a>
            </div>
          </motion.div>

          {/* 2. Recepción & Fiesta */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-between p-5 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-rosegold/25 shadow-2xl space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-rosegold/40 bg-black/40 flex items-center justify-center text-rosegold shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] tracking-widest uppercase text-rosegold font-sans block">
                    Recepción & Fiesta
                  </span>
                  <p className="text-rosegold-light text-xs font-sans font-semibold">
                    {party.time} hrs
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-lg sm:text-2xl text-white font-normal leading-snug">
                  {party.title}
                </h3>
                <p className="font-serif italic text-sm sm:text-base text-gray-200">{party.locationName}</p>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">{party.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10">
              <a
                href={party.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all truncate"
              >
                <MapPin className="w-3 h-3 text-rosegold shrink-0" />
                <span className="truncate">Google Maps</span>
              </a>
              <a
                href={party.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all truncate"
              >
                <Navigation className="w-3 h-3 text-rosegold shrink-0" />
                <span className="truncate">Waze</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
