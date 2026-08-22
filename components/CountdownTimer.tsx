'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  phrase?: string;
  phraseAuthor?: string;
  backgroundImage?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export default function CountdownTimer({
  targetDate,
  phrase = 'Hay momentos en la vida que son irrepetibles, pero compartirlos con las personas que más amo los hace inolvidables.',
  phraseAuthor = 'Gabriela Torres',
  backgroundImage = '/fotos/gabriela-torres/dsc09665.jpg',
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#131313] py-20 px-6">
      {/* Fotografía 1 a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-[center_top] sm:bg-center transition-transform duration-1000 scale-100 sm:scale-105"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* FUSIÓN SUAVE: Difuminado superior e inferior para eliminar líneas duras */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/65 via-20% to-transparent to-45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 via-25% to-transparent to-55%" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Contenido Superpuesto: Contador + Frase */}
      <div className="relative z-10 w-full max-w-3xl mx-auto my-auto text-center flex flex-col items-center space-y-12 sm:space-y-16">
        {/* Bloque del Contador */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-6 w-full"
        >
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block drop-shadow-md">
            Cada Segundo Cuenta
          </span>

          {timeLeft.isFinished ? (
            <div className="py-4 font-serif text-3xl text-rosegold drop-shadow-lg">
              ¡Hoy es el gran día!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
              {timeBlocks.map((block, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-rosegold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {String(block.value).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-300 font-sans font-light mt-2 drop-shadow">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <div className="w-16 h-[1px] bg-rosegold/50 mx-auto" />

        {/* Bloque de la Frase Emotiva */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 max-w-2xl px-2"
        >
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold-light/80 font-sans font-light block">
            Un Momento Inolvidable
          </span>

          <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            &ldquo;{phrase}&rdquo;
          </blockquote>

          <div className="text-xs sm:text-sm tracking-widest uppercase text-rosegold font-sans font-light drop-shadow">
            — {phraseAuthor} —
          </div>
        </motion.div>
      </div>
    </section>
  );
}
