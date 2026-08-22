'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, Sparkles, MapPin, Navigation } from 'lucide-react';
import { EventData } from '@/types/event';

interface LocationsSectionProps {
  ceremony: EventData['ceremony'];
  party: EventData['party'];
  backgroundImage?: string;
}

export default function LocationsSection({
  ceremony,
  party,
  backgroundImage = '/fotos/gabriela-torres/dsc09709.jpg',
}: LocationsSectionProps) {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-20 px-6">
      {/* Fotografía 3 a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_top] sm:bg-center transition-transform duration-1000 scale-100 sm:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Capas de Contraste para la Información */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 to-[#131313]/60" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido Superpuesto: Ceremonia & Recepción */}
      <div className="relative z-10 w-full max-w-5xl mx-auto space-y-12 sm:space-y-16 my-auto">
        <div className="text-center space-y-3">
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
            Lugar & Hora
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            La Celebración
          </h2>
          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Ceremonia Religiosa */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-black/50 backdrop-blur-xl border border-rosegold/25 shadow-2xl shadow-black/80"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full border border-rosegold/40 bg-black/40 flex items-center justify-center text-rosegold">
                <Church className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] tracking-widest uppercase text-rosegold font-sans block">
                  Ceremonia Religiosa
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {ceremony.title}
                </h3>
                <p className="text-rosegold-light text-sm font-sans font-medium">
                  {ceremony.time} hrs
                </p>
              </div>

              <div className="space-y-1 text-sm text-gray-200 font-light">
                <p className="font-serif italic text-base text-white">{ceremony.locationName}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{ceremony.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-8 mt-4 border-t border-white/10">
              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-xs font-sans tracking-wider uppercase transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-rosegold" />
                <span>Google Maps</span>
              </a>
              <a
                href={ceremony.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-xs font-sans tracking-wider uppercase transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-rosegold" />
                <span>Waze</span>
              </a>
            </div>
          </motion.div>

          {/* Recepción & Fiesta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-black/50 backdrop-blur-xl border border-rosegold/25 shadow-2xl shadow-black/80"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full border border-rosegold/40 bg-black/40 flex items-center justify-center text-rosegold">
                <Sparkles className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] tracking-widest uppercase text-rosegold font-sans block">
                  Recepción & Fiesta
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {party.title}
                </h3>
                <p className="text-rosegold-light text-sm font-sans font-medium">
                  {party.time} hrs
                </p>
              </div>

              <div className="space-y-1 text-sm text-gray-200 font-light">
                <p className="font-serif italic text-base text-white">{party.locationName}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{party.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-8 mt-4 border-t border-white/10">
              <a
                href={party.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-xs font-sans tracking-wider uppercase transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-rosegold" />
                <span>Google Maps</span>
              </a>
              <a
                href={party.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 border border-rosegold/30 text-rosegold-light hover:bg-rosegold/20 text-xs font-sans tracking-wider uppercase transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-rosegold" />
                <span>Waze</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
