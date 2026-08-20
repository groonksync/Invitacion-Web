'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  musicTitle: string;
}

export default function MusicPlayer({ musicUrl, musicTitle }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Intento de reproducción suave al hacer clic en cualquier parte de la pantalla si no ha interactuado
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Autoplay bloqueado por el navegador
          });
      }
    };

    window.addEventListener('click', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      setHasInteracted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Banner con título de la canción cuando está sonando */}
        <div
          className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-rose-400/30 text-xs text-rose-200 shadow-xl transition-all duration-300 ${
            isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <div className="flex gap-0.5 items-end h-3">
            <span className="w-1 bg-rose-400 h-full animate-pulse"></span>
            <span className="w-1 bg-amber-400 h-2/3 animate-pulse delay-75"></span>
            <span className="w-1 bg-rose-300 h-4/5 animate-pulse delay-150"></span>
          </div>
          <span className="font-medium truncate max-w-[180px]">{musicTitle}</span>
        </div>

        {/* Botón flotante interactivo */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className={`group relative p-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-rose-500/30'
              : 'bg-black/80 text-rose-300 border border-rose-400/40 hover:border-amber-400 hover:text-white'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 animate-bounce" />
          ) : (
            <div className="relative">
              <VolumeX className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>
          )}
          <span className="sr-only">Música de fondo</span>
        </button>
      </div>
    </>
  );
}
