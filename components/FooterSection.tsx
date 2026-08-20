'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ChevronUp, Lock } from 'lucide-react';

interface FooterSectionProps {
  name: string;
  slug: string;
}

export default function FooterSection({ name, slug }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-rose-400/20 bg-black/80 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-300 hover:text-white hover:bg-rose-900 transition-colors mx-auto inline-flex items-center justify-center mb-4"
          title="Volver arriba"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <h3 className="font-cursive text-4xl sm:text-5xl rose-gradient-text">
          {name}
        </h3>

        <p className="font-serif italic text-gray-300 text-sm sm:text-base">
          ¡Gracias por ser parte de este momento tan especial en mi vida!
        </p>

        <div className="flex items-center justify-center gap-1 text-rose-400/60 text-xs font-sans">
          <span>Hecho con</span>
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
          <span>para una noche mágica</span>
        </div>

        {/* Acceso para los padres / anfitriones */}
        <div className="pt-6">
          <Link
            href={`/${slug}/admin`}
            className="inline-flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-rose-300 transition-colors font-sans"
          >
            <Lock className="w-3 h-3" />
            <span>Panel de Anfitriones (Control de Asistencia)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
