'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, GlassWater, Music, Utensils, Sparkles, Moon, Clock } from 'lucide-react';
import { EventData } from '@/types/event';

interface ItinerarySectionProps {
  itinerary: EventData['itinerary'];
}

export default function ItinerarySection({ itinerary }: ItinerarySectionProps) {
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
    <section className="py-28 sm:py-36 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block mb-3">
          Cronograma de la Noche
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-light">
          Itinerario
        </h2>
        <div className="w-12 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Línea vertical sutil */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-rosegold/30 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
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
                <div className="ml-14 md:ml-0 md:w-1/2 px-4 md:px-8">
                  <div className={`space-y-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="font-mono text-xs tracking-widest text-rosegold font-light block">
                      {item.time} hrs
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Ícono central minimalista */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#131313] border border-rosegold/40 flex items-center justify-center text-rosegold z-10 shadow-lg">
                  {getIcon(item.icon)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
