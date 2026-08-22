'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, GlassWater, Music, Utensils, Sparkles, Moon, Clock } from 'lucide-react';
import { EventData } from '@/types/event';

interface ItinerarySectionProps {
  itinerary: EventData['itinerary'];
  backgroundImage?: string;
}

export default function ItinerarySection({
  itinerary,
  backgroundImage = '/fotos/gabriela-torres/dsc09721.jpg',
}: ItinerarySectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'church':
        return <Church className="w-4 h-4" />;
      case 'cheers':
        return <GlassWater className="w-4 h-4" />;
      case 'music':
        return <Music className="w-4 h-4" />;
      case 'utensils':
        return <Utensils className="w-4 h-4" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'moon':
        return <Moon className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-20 px-6">
      {/* Fotografía 4 a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_top] sm:bg-center transition-transform duration-1000 scale-100 sm:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* FUSIÓN SUAVE: Difuminado superior e inferior para eliminar cortes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/65 via-20% to-transparent to-45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 via-25% to-transparent to-55%" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Contenido Superpuesto: Itinerario */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12 sm:space-y-16 my-auto">
        <div className="text-center space-y-3">
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
            Cronograma de la Noche
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            Itinerario
          </h2>
          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-4" />
        </div>

        <div className="relative max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-black/50 backdrop-blur-xl border border-rosegold/25 shadow-2xl">
          {/* Línea vertical sutil */}
          <div className="absolute left-6 md:left-1/2 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-rosegold/40 to-transparent -translate-x-1/2" />

          <div className="space-y-10">
            {itinerary.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Contenido */}
                  <div className="ml-14 md:ml-0 md:w-1/2 px-2 md:px-6">
                    <div className={`space-y-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="font-mono text-xs tracking-widest text-rosegold font-medium block">
                        {item.time} hrs
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Ícono central minimalista */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/80 border border-rosegold/50 flex items-center justify-center text-rosegold z-10 shadow-lg">
                    {getIcon(item.icon)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
