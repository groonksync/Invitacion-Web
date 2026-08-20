'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  musicUrl: string;
  musicTitle: string;
}

export default function MusicPlayer({ musicUrl, musicTitle }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    // 1. Intento de reproducción automática inmediata al cargar la página
    const attemptAutoplay = () => {
      if (isManuallyPaused) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // El navegador bloqueó el autoplay sin interacción, se activará al primer toque/scroll
            setIsPlaying(false);
          });
      }
    };

    // 2. Eventos para reproducir al primer gesto del usuario (scroll, toque, clic o tecla)
    const handleUserInteraction = () => {
      if (!isManuallyPaused && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {
            // Silencioso
          });
      }
    };

    const interactionEvents = [
      'touchstart',
      'touchend',
      'pointerdown',
      'mousedown',
      'scroll',
      'wheel',
      'click',
      'keydown',
    ];

    const addInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, handleUserInteraction, { once: true, passive: true, capture: true });
      });
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction, { capture: true });
      });
    };

    attemptAutoplay();
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
    };
  }, [isManuallyPaused]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsManuallyPaused(true);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsManuallyPaused(false);
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        autoPlay
        playsInline
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Banner con título de la canción cuando está sonando */}
        <div
          className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-rose-400/30 text-xs text-rose-200 shadow-2xl transition-all duration-300 ${
            isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <div className="flex gap-0.5 items-end h-3">
            <span className="w-1 bg-rose-400 h-full animate-pulse"></span>
            <span className="w-1 bg-amber-400 h-2/3 animate-pulse delay-75"></span>
            <span className="w-1 bg-rose-300 h-4/5 animate-pulse delay-150"></span>
          </div>
          <span className="font-medium truncate max-w-[200px]">{musicTitle}</span>
        </div>

        {/* Botón flotante interactivo */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className={`group relative p-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-tr from-rose-600 to-amber-500 text-white shadow-rose-500/40 ring-2 ring-rose-400/30'
              : 'bg-black/90 text-rose-300 border border-rose-400/50 hover:border-amber-400 hover:text-white'
          }`}
          title={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        >
          {isPlaying ? (
            <Volume2 className="w-6 h-6 animate-pulse" />
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
