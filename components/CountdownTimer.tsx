'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  phrase?: string;
  phraseAuthor?: string;
  backgroundImage?: string;
  secondaryImage?: string;
  layout?: 'fullscreen' | 'album-duo' | 'floating-glass' | 'spotlight' | 'mosaic';
  imagePosition?: 'center' | 'top' | 'bottom' | 'contain';
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
  secondaryImage = '/fotos/gabriela-torres/dsc09668.jpg',
  layout = 'fullscreen',
  imagePosition = 'top',
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

  // MODO 2: ÁLBUM DÚO EDITORIAL (2 FOTOS)
  if (layout === 'album-duo') {
    return (
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-12 sm:py-16 px-3 sm:px-6">
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center z-10">
          <div className="md:col-span-4 relative aspect-[3/4] max-w-[280px] mx-auto md:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-rosegold/20">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
          </div>

          <div className="md:col-span-4 text-center space-y-5 p-5 sm:p-8 rounded-3xl bg-black/60 backdrop-blur-xl border border-rosegold/30 shadow-2xl">
            <span className="text-[10px] tracking-widest-xl uppercase text-rosegold font-sans font-light block">
              Cada Segundo Cuenta
            </span>

            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {timeBlocks.map((block, idx) => (
                <div key={idx} className="flex flex-col items-center p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-serif text-xl sm:text-2xl font-light text-rosegold">
                    {String(block.value).padStart(2, '0')}
                  </span>
                  <span className="text-[7px] sm:text-[8px] tracking-widest text-gray-400 font-sans mt-1">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-12 h-[1px] bg-rosegold/40 mx-auto" />

            <blockquote className="font-serif italic text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
              &ldquo;{phrase}&rdquo;
            </blockquote>

            <div className="text-[10px] sm:text-[11px] tracking-widest uppercase text-rosegold font-sans">
              — {phraseAuthor} —
            </div>
          </div>

          <div className="md:col-span-4 relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-rosegold/20 hidden md:block">
            <img src={secondaryImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
          </div>
        </div>
      </section>
    );
  }

  // MODO 3: TARJETA FLOTANTE FINE-ART
  if (layout === 'floating-glass') {
    return (
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#131313] py-12 sm:py-16 px-3 sm:px-4">
        <div className="absolute inset-0 opacity-40 blur-2xl scale-110" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#131313]/80" />

        <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-black/60 backdrop-blur-2xl border border-rosegold/30 p-6 sm:p-12 text-center space-y-6 sm:space-y-8 shadow-2xl">
          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-rosegold shadow-xl">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans block">
              Cuenta Regresiva Especial
            </span>
            <div className="flex justify-center gap-4 sm:gap-6">
              {timeBlocks.map((block, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-serif text-2xl sm:text-4xl text-rosegold font-light">
                    {String(block.value).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[9px] tracking-widest text-gray-400 font-sans mt-1">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-12 h-[1px] bg-rosegold/40 mx-auto" />

          <blockquote className="font-serif italic text-sm sm:text-lg text-white font-light leading-relaxed">
            &ldquo;{phrase}&rdquo;
          </blockquote>

          <div className="text-xs tracking-widest uppercase text-rosegold font-sans">
            — {phraseAuthor} —
          </div>
        </div>
      </section>
    );
  }

  // MODO 1: FULLSCREEN (DEFAULT)
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#131313] py-16 sm:py-20 px-4 sm:px-6">
      {/* Fotografía a Pantalla Completa */}
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover transition-transform duration-1000 scale-100 sm:scale-105 ${getBgPositionClass()}`}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#131313]/65 via-20% to-transparent to-45%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/70 via-25% to-transparent to-55%" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Contenido Superpuesto: Contador + Frase */}
      <div className="relative z-10 w-full max-w-3xl mx-auto my-auto text-center flex flex-col items-center space-y-8 sm:space-y-16">
        {/* Bloque del Contador */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-4 sm:space-y-6 w-full"
        >
          <span className="text-[10px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block drop-shadow-md">
            Cada Segundo Cuenta
          </span>

          {timeLeft.isFinished ? (
            <div className="py-4 font-serif text-2xl sm:text-3xl text-rosegold drop-shadow-lg">
              ¡Hoy es el gran día!
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-12">
              {timeBlocks.map((block, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="font-serif text-2xl sm:text-5xl md:text-6xl font-light text-rosegold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {String(block.value).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] sm:text-[10px] tracking-[0.25em] text-gray-300 font-sans font-light mt-1 sm:mt-2 drop-shadow">
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
          className="space-y-4 sm:space-y-6 max-w-2xl px-2"
        >
          <span className="text-[9px] sm:text-xs tracking-widest-xl uppercase text-rosegold-light/80 font-sans font-light block">
            Un Momento Inolvidable
          </span>

          <blockquote className="font-serif italic text-lg sm:text-2xl md:text-3xl text-white font-light leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            &ldquo;{phrase}&rdquo;
          </blockquote>

          <div className="text-[11px] sm:text-sm tracking-widest uppercase text-rosegold font-sans font-light drop-shadow">
            — {phraseAuthor} —
          </div>
        </motion.div>
      </div>
    </section>
  );
}
