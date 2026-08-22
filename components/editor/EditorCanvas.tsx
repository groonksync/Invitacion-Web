'use client';

import React from 'react';
import { EventData } from '@/types/event';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import DedicationSection from '@/components/DedicationSection';
import LocationsSection from '@/components/LocationsSection';
import ItinerarySection from '@/components/ItinerarySection';
import DressCodeSection from '@/components/DressCodeSection';
import GiftSection from '@/components/GiftSection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';

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
  // Ajuste de ancho según el dispositivo
  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'w-[390px] min-h-[844px] rounded-[48px] border-[10px] border-[#222222] shadow-2xl shadow-black ring-1 ring-white/10 my-8';
      case 'tablet':
        return 'w-[768px] min-h-[1024px] rounded-[36px] border-[12px] border-[#222222] shadow-2xl shadow-black ring-1 ring-white/10 my-8';
      case 'desktop':
        return 'w-full min-h-full rounded-none border-none shadow-none my-0';
    }
  };

  const defaultOrder = ['hero', 'countdown', 'dedication', 'locations', 'itinerary', 'dressCode', 'giftRegistry', 'rsvp'];
  const order = eventData.sectionOrder || defaultOrder;
  const hidden = eventData.hiddenSections || [];
  const layouts = eventData.sectionLayouts || {};

  const renderSection = (secId: string) => {
    if (hidden.includes(secId)) return null;

    const isActive = activeSection === secId;
    const highlightClass = isActive
      ? 'ring-2 ring-rosegold ring-offset-4 ring-offset-[#131313] transition-all relative z-10'
      : 'hover:outline hover:outline-1 hover:outline-rosegold/40 transition-all cursor-pointer';

    switch (secId) {
      case 'hero':
        return (
          <div key="hero" onClick={() => setActiveSection('hero')} className={highlightClass}>
            <HeroSection
              name={eventData.name}
              subtitle={eventData.subtitle}
              date={eventData.date}
              heroImage={eventData.heroImage}
            />
          </div>
        );

      case 'countdown':
        return (
          <div key="countdown" onClick={() => setActiveSection('countdown')} className={highlightClass}>
            <CountdownTimer
              targetDate={eventData.date}
              phrase={eventData.phrase}
              phraseAuthor={eventData.phraseAuthor}
              backgroundImage={eventData.gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg'}
              secondaryImage={eventData.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
              layout={layouts.countdown || 'fullscreen'}
            />
          </div>
        );

      case 'dedication':
        return (
          <div key="dedication" onClick={() => setActiveSection('dedication')} className={highlightClass}>
            <DedicationSection
              parents={eventData.parents}
              backgroundImage={eventData.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
              secondaryImage={eventData.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
              layout={layouts.dedication || 'fullscreen'}
            />
          </div>
        );

      case 'locations':
        return (
          <div key="locations" onClick={() => setActiveSection('locations')} className={highlightClass}>
            <LocationsSection
              ceremony={eventData.ceremony}
              party={eventData.party}
              backgroundImage={eventData.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
            />
          </div>
        );

      case 'itinerary':
        return (
          <div key="itinerary" onClick={() => setActiveSection('itinerary')} className={highlightClass}>
            <ItinerarySection
              itinerary={eventData.itinerary}
              backgroundImage={eventData.gallery[3]?.url || '/fotos/gabriela-torres/dsc09721.jpg'}
            />
          </div>
        );

      case 'dressCode':
        return (
          <div key="dressCode" onClick={() => setActiveSection('dressCode')} className={highlightClass}>
            <DressCodeSection dressCode={eventData.dressCode} />
          </div>
        );

      case 'giftRegistry':
        return (
          <div key="giftRegistry" onClick={() => setActiveSection('giftRegistry')} className={highlightClass}>
            <GiftSection giftRegistry={eventData.giftRegistry} />
          </div>
        );

      case 'rsvp':
        return (
          <div key="rsvp" onClick={() => setActiveSection('rsvp')} className={highlightClass}>
            <RsvpSection
              slug={eventData.slug}
              name={eventData.name}
              rsvpDeadline={eventData.rsvpDeadline}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="flex-1 bg-[#0d0d0d] overflow-y-auto flex items-center justify-center p-0 sm:p-6 relative select-text">
      {/* Marco del Dispositivo */}
      <div className={`bg-[#131313] overflow-hidden transition-all duration-300 ${getContainerWidth()}`}>
        {/* Notificación Superior del Celular si es Móvil */}
        {deviceMode === 'mobile' && (
          <div className="h-6 w-full bg-[#181818] flex items-center justify-between px-6 text-[10px] text-gray-400 font-mono select-none sticky top-0 z-40">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto" />
            <span>5G 100%</span>
          </div>
        )}

        {/* Renderizado de Secciones Ordenadas Dinámicamente */}
        <div className="flex flex-col">
          {order.map((secId) => renderSection(secId))}
          <FooterSection name={eventData.name} slug={eventData.slug} />
        </div>
      </div>
    </main>
  );
}
