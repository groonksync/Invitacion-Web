'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronUp, Lock } from 'lucide-react';

interface FooterSectionProps {
  name: string;
  slug: string;
}

export default function FooterSection({ name, slug }: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 px-6 text-center bg-[#131313] border-t border-white/5 space-y-8">
      <div className="max-w-xl mx-auto space-y-6">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full border border-rosegold/30 text-rosegold hover:bg-rosegold/10 transition-colors mx-auto inline-flex items-center justify-center"
          title="Volver arriba"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <h3 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-widest uppercase">
          {name}
        </h3>

        <p className="font-serif italic text-gray-400 text-sm sm:text-base font-light">
          Gracias por acompañarme en el inicio de esta nueva etapa.
        </p>

        {/* Acceso para los anfitriones */}
        <div className="pt-8">
          <Link
            href={`/${slug}/admin`}
            className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-gray-500 hover:text-rosegold transition-colors font-sans"
          >
            <Lock className="w-3 h-3" />
            <span>Panel de Anfitriones</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
