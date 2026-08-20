'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
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
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 -mt-10 z-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-card-gold rounded-3xl p-6 sm:p-8 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-6 text-amber-300">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="font-serif italic text-sm tracking-wider uppercase">Faltan Solo</span>
        </div>

        {timeLeft.isFinished ? (
          <div className="py-4 text-2xl font-serif text-rose-300">
            ¡Hoy es el gran día de celebración! 🎉
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {timeBlocks.map((block, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/40 border border-rose-400/20 backdrop-blur-md shadow-inner"
              >
                <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold gold-gradient-text tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-rose-200/70 font-sans mt-1">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
