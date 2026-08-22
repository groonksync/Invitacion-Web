'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-8"
      >
        <span className="text-[11px] sm:text-xs tracking-widest-xl uppercase text-rosegold font-sans font-light block">
          Cada Segundo Cuenta
        </span>

        {timeLeft.isFinished ? (
          <div className="py-4 font-serif text-2xl text-rosegold">
            ¡Hoy es el gran día!
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12">
            {timeBlocks.map((block, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-rosegold tracking-tight">
                  {String(block.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-400 font-sans font-light mt-2">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="w-16 h-[1px] bg-rosegold/30 mx-auto mt-6" />
      </motion.div>
    </section>
  );
}
