'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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
            setIsPlaying(false);
          });
      }
    };

    const handleUserInteraction = () => {
      if (!isManuallyPaused && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch(() => {});
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
        {/* Banner minimalista con título */}
        <div
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A]/90 backdrop-blur-md border border-rosegold/20 text-xs text-rosegold-light shadow-2xl transition-all duration-300 ${
            isPlaying ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          <div className="flex gap-0.5 items-end h-3">
            <span className="w-1 bg-rosegold h-full animate-pulse"></span>
            <span className="w-1 bg-rosegold-light h-2/3 animate-pulse delay-75"></span>
            <span className="w-1 bg-rosegold-dark h-4/5 animate-pulse delay-150"></span>
          </div>
          <span className="font-light tracking-wide truncate max-w-[200px]">{musicTitle}</span>
        </div>

        {/* Botón flotante en Oro Rosa */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className={`group relative p-3.5 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-[#E2A4AD] text-[#131313] shadow-rosegold/30'
              : 'bg-[#1A1A1A]/90 text-rosegold border border-rosegold/30 hover:border-rosegold'
          }`}
          title={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <div className="relative">
              <VolumeX className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rosegold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rosegold"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
