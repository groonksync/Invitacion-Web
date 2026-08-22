'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, GlassWater, Music, Utensils, Sparkles, Moon, Clock } from 'lucide-react';
import { EventData } from '@/types/event';

interface ItinerarySectionProps {
  itinerary: EventData['itinerary'];
  backgroundImage?: string;
  imagePosition?: 'center' | 'top' | 'bottom' | 'contain';
}

export default function ItinerarySection({
  itinerary,
  backgroundImage = '/fotos/gabriela-torres/dsc09721.jpg',
  imagePosition = 'top',
}: ItinerarySectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'church':
        return <Church className="w-3.5 h-3.5" />;
      case 'cheers':
        return <GlassWater className="w-3.5 h-3.5" />;
      case 'music':
        return <Music className="w-3.5 h-3.5" />;
      case 'utensils':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'moon':
        return <Moon className="w-3.5 h-3.5" />;
      default:
        return <Clock className="w-3.5 h-3.5" />;
    }
  };

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
      {/* Fotografía 4 a Pantalla Completa */}
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

      {/* Contenido Superpuesto: Itinerario */}
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 sm:space-y-12 my-auto">
        <div className="text-center space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
            Cronograma de la Noche
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white font-light drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
            Itinerario
          </h2>
          <div className="w-12 h-[1px] bg-rosegold/50 mx-auto mt-2" />
        </div>

        {/* Tarjeta de Cronograma Optimizada para Móvil */}
        <div className="relative p-5 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-rosegold/25 shadow-2xl">
          {/* Línea vertical izquierda en móvil */}
          <div className="absolute left-6 top-6 bottom-6 w-[1px] bg-gradient-to-b from-transparent via-rosegold/40 to-transparent" />

          <div className="space-y-6">
            {itinerary.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="relative flex items-start pl-8"
              >
                {/* Ícono circular a la izquierda */}
                <div className="absolute left-0 top-0.5 -translate-x-1/2 w-8 h-8 rounded-full bg-black/90 border border-rosegold/50 flex items-center justify-center text-rosegold z-10 shadow-md">
                  {getIcon(item.icon)}
                </div>

                {/* Texto del momento */}
                <div className="space-y-0.5 flex-1">
                  <span className="font-mono text-[11px] tracking-wider text-rosegold font-semibold block">
                    {item.time} hrs
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-white font-normal leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
