'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, Sparkles, MapPin, Navigation } from 'lucide-react';
import { EventData } from '@/types/event';

interface LocationsSectionProps {
  ceremony: EventData['ceremony'];
  party: EventData['party'];
}

export default function LocationsSection({ ceremony, party }: LocationsSectionProps) {
  return (
    <section className="py-28 sm:py-36 px-6 max-w-5xl mx-auto space-y-24">
      {/* Encabezado */}
      <div className="text-center">
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block mb-3">
          Lugar & Hora
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
          La Celebración
        </h2>
        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
        {/* Ceremonia Religiosa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group flex flex-col justify-between p-8 sm:p-10 rounded-3xl overflow-hidden bg-[#1A1A1A]/70 border border-rosegold/15"
        >
          {/* Fondo desenfocado y oscurecido que se funde con #131313 */}
          {ceremony.image && (
            <div className="absolute inset-0 z-0 opacity-20 filter blur-sm scale-105 pointer-events-none">
              <img src={ceremony.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#131313]/60" />
            </div>
          )}

          <div className="relative z-10 space-y-6">
            {/* Ícono minimalista en Oro Rosa */}
            <div className="w-12 h-12 rounded-full border border-rosegold/30 flex items-center justify-center text-rosegold">
              <Church className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-widest uppercase text-rosegold font-sans block">
                Ceremonia Religiosa
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {ceremony.title}
              </h3>
              <p className="text-rosegold-light text-sm font-sans font-medium">
                {ceremony.time}
              </p>
            </div>

            <div className="space-y-1 text-sm text-gray-300 font-light">
              <p className="font-serif italic text-base text-gray-200">{ceremony.locationName}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{ceremony.address}</p>
            </div>
          </div>

          {/* Botones Minimalistas */}
          <div className="relative z-10 grid grid-cols-2 gap-3 pt-8 mt-4 border-t border-white/5">
            <a
              href={ceremony.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-rosegold/20 text-rosegold-light hover:bg-rosegold/10 text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rosegold" />
              <span>Google Maps</span>
            </a>
            <a
              href={ceremony.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-rosegold/20 text-rosegold-light hover:bg-rosegold/10 text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-rosegold" />
              <span>Waze</span>
            </a>
          </div>
        </motion.div>

        {/* Recepción y Fiesta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group flex flex-col justify-between p-8 sm:p-10 rounded-3xl overflow-hidden bg-[#1A1A1A]/70 border border-rosegold/15"
        >
          {/* Fondo desenfocado y oscurecido que se funde con #131313 */}
          {party.image && (
            <div className="absolute inset-0 z-0 opacity-20 filter blur-sm scale-105 pointer-events-none">
              <img src={party.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#131313]/60" />
            </div>
          )}

          <div className="relative z-10 space-y-6">
            {/* Ícono minimalista en Oro Rosa */}
            <div className="w-12 h-12 rounded-full border border-rosegold/30 flex items-center justify-center text-rosegold">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-widest uppercase text-rosegold font-sans block">
                Recepción & Fiesta
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {party.title}
              </h3>
              <p className="text-rosegold-light text-sm font-sans font-medium">
                {party.time}
              </p>
            </div>

            <div className="space-y-1 text-sm text-gray-300 font-light">
              <p className="font-serif italic text-base text-gray-200">{party.locationName}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{party.address}</p>
            </div>
          </div>

          {/* Botones Minimalistas */}
          <div className="relative z-10 grid grid-cols-2 gap-3 pt-8 mt-4 border-t border-white/5">
            <a
              href={party.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-rosegold/20 text-rosegold-light hover:bg-rosegold/10 text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-rosegold" />
              <span>Google Maps</span>
            </a>
            <a
              href={party.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-rosegold/20 text-rosegold-light hover:bg-rosegold/10 text-xs font-sans tracking-wider uppercase transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-rosegold" />
              <span>Waze</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
