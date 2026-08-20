'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Church, GlassWater, Music, Utensils, Sparkles, Moon, Calendar, Clock } from 'lucide-react';
import { EventData } from '@/types/event';

interface ItinerarySectionProps {
  itinerary: EventData['itinerary'];
}

export default function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'church':
        return <Church className="w-5 h-5" />;
      case 'cheers':
        return <GlassWater className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'utensils':
        return <Utensils className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'moon':
        return <Moon className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 text-xs tracking-widest uppercase mb-2">
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>Cronograma</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal">
          Itinerario de la Noche
        </h2>
        <p className="text-rose-200/70 text-sm mt-2 max-w-md mx-auto">
          Cada minuto ha sido preparado con mucho amor para disfrutarlo juntos
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-rose-500 to-amber-400 mx-auto mt-4" />
      </div>

      <div className="relative">
        {/* Línea vertical central */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-500 via-amber-400 to-rose-600 -translate-x-1/2 opacity-30" />

        <div className="space-y-8">
          {itinerary.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Contenido de la tarjeta */}
                <div className="ml-14 md:ml-0 md:w-1/2 px-4 md:px-8">
                  <div className={`glass-card p-5 rounded-2xl border-rose-400/20 hover:border-amber-400/40 transition-colors ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <div className={`inline-block px-3 py-1 rounded-full bg-rose-950/80 border border-amber-400/30 text-amber-300 font-serif font-bold text-sm mb-2`}>
                      {item.time} hrs
                    </div>
                    <h3 className="font-serif text-xl text-white font-medium">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Ícono central en la línea */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-rose-700 to-amber-500 border-2 border-[#0d0a0f] flex items-center justify-center text-white shadow-lg shadow-rose-950/80 z-10">
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
