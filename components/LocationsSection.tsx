'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Church, PartyPopper } from 'lucide-react';
import { EventData } from '@/types/event';

interface LocationsSectionProps {
  ceremony: EventData['ceremony'];
  party: EventData['party'];
}

export default function LocationsSection({ ceremony, party }: LocationsSectionProps) {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-amber-300 font-sans block mb-2">
          ¿Dónde & Cuándo?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
          Ubicaciones de la Celebración
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta Ceremonia */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border-rose-400/20 hover:border-amber-400/40 transition-colors"
        >
          {ceremony.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={ceremony.image}
                alt={ceremony.locationName}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a141e] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-rose-300 text-xs border border-rose-400/30">
                <Church className="w-3.5 h-3.5 text-amber-300" />
                <span>Ceremonia</span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-white font-medium mb-2">
                {ceremony.title}
              </h3>
              
              <div className="flex items-center gap-2 text-amber-300 font-medium mb-4 text-sm">
                <Clock className="w-4 h-4" />
                <span>{ceremony.time}</span>
              </div>

              <p className="text-lg font-serif text-rose-100 mb-1">
                {ceremony.locationName}
              </p>
              
              <p className="text-sm text-gray-300 mb-6 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{ceremony.address}</span>
              </p>
            </div>

            {/* Botones de Navegación */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-rose-400/10">
              <a
                href={ceremony.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/70 border border-rose-400/30 text-rose-200 hover:text-white hover:bg-rose-900/60 transition-all text-xs sm:text-sm font-medium text-center"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Google Maps</span>
              </a>
              <a
                href={ceremony.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-950/70 border border-amber-400/30 text-amber-200 hover:text-white hover:bg-amber-900/60 transition-all text-xs sm:text-sm font-medium text-center"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Waze</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta Recepción */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border-rose-400/20 hover:border-amber-400/40 transition-colors"
        >
          {party.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={party.image}
                alt={party.locationName}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a141e] via-transparent to-black/30" />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 text-amber-300 text-xs border border-amber-400/30">
                <PartyPopper className="w-3.5 h-3.5 text-rose-400" />
                <span>Recepción</span>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl text-white font-medium mb-2">
                {party.title}
              </h3>
              
              <div className="flex items-center gap-2 text-amber-300 font-medium mb-4 text-sm">
                <Clock className="w-4 h-4" />
                <span>{party.time}</span>
              </div>

              <p className="text-lg font-serif text-rose-100 mb-1">
                {party.locationName}
              </p>
              
              <p className="text-sm text-gray-300 mb-6 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{party.address}</span>
              </p>
            </div>

            {/* Botones de Navegación */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-rose-400/10">
              <a
                href={party.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-950/70 border border-rose-400/30 text-rose-200 hover:text-white hover:bg-rose-900/60 transition-all text-xs sm:text-sm font-medium text-center"
              >
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Google Maps</span>
              </a>
              <a
                href={party.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-950/70 border border-amber-400/30 text-amber-200 hover:text-white hover:bg-amber-900/60 transition-all text-xs sm:text-sm font-medium text-center"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Waze</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
