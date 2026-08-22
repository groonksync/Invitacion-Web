'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import DedicationSection from '@/components/DedicationSection';
import LocationsSection from '@/components/LocationsSection';
import ItinerarySection from '@/components/ItinerarySection';
import DressCodeSection from '@/components/DressCodeSection';
import GiftSection from '@/components/GiftSection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';
import { EventData } from '@/types/event';

interface EditorCanvasProps {
  eventData: EventData;
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  deviceMode: 'mobile' | 'tablet' | 'desktop';
}

export default function EditorCanvas({
  eventData,
  activeSection,
  setActiveSection,
  deviceMode,
}: EditorCanvasProps) {
  // Ancho del contenedor según el dispositivo
  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[390px] min-w-[390px]';
      case 'tablet':
        return 'w-[768px] min-w-[768px]';
      case 'desktop':
        return 'w-full max-w-5xl';
    }
  };

  return (
    <main className="flex-1 bg-[#0f0f0f] overflow-y-auto p-4 sm:p-8 flex justify-center items-start">
      {/* Marco del Dispositivo */}
      <div
        className={`${getContainerWidth()} bg-[#131313] transition-all duration-300 rounded-[36px] overflow-hidden border-4 border-[#262626] shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative flex flex-col`}
      >
        {/* Notch / Barra Superior del Móvil */}
        {deviceMode === 'mobile' && (
          <div className="h-6 bg-[#131313] w-full flex items-center justify-center relative z-40">
            <div className="w-28 h-4 bg-black rounded-b-xl" />
          </div>
        )}

        {/* 1. SECCIÓN PORTADA (HERO) */}
        <div
          onClick={() => setActiveSection('hero')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'hero'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'hero' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Portada
            </div>
          )}
          <HeroSection
            name={eventData.name}
            subtitle={eventData.subtitle}
            date={eventData.date}
            heroImage={eventData.heroImage}
          />
        </div>

        {/* 2. SECCIÓN CUENTA REGRESIVA & FRASE */}
        <div
          onClick={() => setActiveSection('countdown')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'countdown'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'countdown' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Cuenta Regresiva & Frase
            </div>
          )}
          <CountdownTimer
            targetDate={eventData.date}
            phrase={eventData.phrase}
            phraseAuthor={eventData.phraseAuthor}
            backgroundImage={eventData.gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg'}
          />
        </div>

        {/* 3. SECCIÓN DEDICATORIA (PADRES) */}
        <div
          onClick={() => setActiveSection('dedication')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'dedication'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'dedication' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Bendición de Padres
            </div>
          )}
          <DedicationSection
            parents={eventData.parents}
            backgroundImage={eventData.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
          />
        </div>

        {/* 4. SECCIÓN UBICACIONES (MISA & RECEPCIÓN) */}
        <div
          onClick={() => setActiveSection('locations')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'locations'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'locations' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Lugares de Celebración
            </div>
          )}
          <LocationsSection
            ceremony={eventData.ceremony}
            party={eventData.party}
            backgroundImage={eventData.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
          />
        </div>

        {/* 5. SECCIÓN ITINERARIO */}
        <div
          onClick={() => setActiveSection('itinerary')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'itinerary'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'itinerary' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Itinerario
            </div>
          )}
          <ItinerarySection
            itinerary={eventData.itinerary}
            backgroundImage={eventData.gallery[3]?.url || '/fotos/gabriela-torres/dsc09721.jpg'}
          />
        </div>

        {/* 6. SECCIÓN DRESS CODE */}
        <div
          onClick={() => setActiveSection('dressCode')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'dressCode'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'dressCode' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Código de Vestimenta
            </div>
          )}
          <DressCodeSection dressCode={eventData.dressCode} />
        </div>

        {/* 7. SECCIÓN MESA DE REGALOS */}
        <div
          onClick={() => setActiveSection('giftRegistry')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'giftRegistry'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'giftRegistry' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Mesa de Regalos
            </div>
          )}
          <GiftSection giftRegistry={eventData.giftRegistry} />
        </div>

        {/* 8. SECCIÓN RSVP */}
        <div
          onClick={() => setActiveSection('rsvp')}
          className={`relative cursor-pointer transition-all ${
            activeSection === 'rsvp'
              ? 'ring-2 ring-rosegold ring-inset'
              : 'hover:outline hover:outline-1 hover:outline-rosegold/40'
          }`}
        >
          {activeSection === 'rsvp' && (
            <div className="absolute top-2 left-4 z-40 px-2 py-0.5 rounded bg-rosegold text-[#131313] text-[9px] font-bold uppercase tracking-wider shadow">
              Capa Activa: Confirmación RSVP
            </div>
          )}
          <RsvpSection
            slug={eventData.slug}
            name={eventData.name}
            rsvpDeadline={eventData.rsvpDeadline}
          />
        </div>

        <FooterSection name={eventData.name} slug={eventData.slug} />
      </div>
    </main>
  );
}
