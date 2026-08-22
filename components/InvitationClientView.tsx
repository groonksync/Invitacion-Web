'use client';

import React, { useState, useEffect } from 'react';
import { EventData } from '@/types/event';
import { getClientStoredEventBySlug } from '@/lib/clientEventStorage';
import { EVENTS } from '@/data/events';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import DedicationSection from '@/components/DedicationSection';
import LocationsSection from '@/components/LocationsSection';
import ItinerarySection from '@/components/ItinerarySection';
import DressCodeSection from '@/components/DressCodeSection';
import GiftSection from '@/components/GiftSection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';

interface InvitationClientViewProps {
  initialEvent?: EventData;
  slug: string;
}

export default function InvitationClientView({ initialEvent, slug }: InvitationClientViewProps) {
  const [event, setEvent] = useState<EventData | undefined>(() => {
    return getClientStoredEventBySlug(slug) || initialEvent || EVENTS[slug];
  });

  useEffect(() => {
    // Sincronizar con localStorage o consultar el endpoint en caso de cambios
    const local = getClientStoredEventBySlug(slug);
    if (local) {
      setEvent(local);
    } else {
      fetch(`/api/events/get?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.event) {
            setEvent(data.event);
          }
        })
        .catch(() => {});
    }
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
        <h1 className="font-serif text-3xl text-rosegold">Cargando Invitación...</h1>
        <p className="text-xs text-gray-400">Preparando una experiencia mágica de 15 años.</p>
      </div>
    );
  }

  const defaultOrder = ['hero', 'countdown', 'dedication', 'locations', 'itinerary', 'dressCode', 'giftRegistry', 'rsvp'];
  const order = event.sectionOrder || defaultOrder;
  const hidden = event.hiddenSections || [];
  const layouts = event.sectionLayouts || {};

  const renderSection = (secId: string) => {
    if (hidden.includes(secId)) return null;

    switch (secId) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            name={event.name}
            subtitle={event.subtitle}
            date={event.date}
            heroImage={event.heroImage}
          />
        );

      case 'countdown':
        return (
          <CountdownTimer
            key="countdown"
            targetDate={event.date}
            phrase={event.phrase}
            phraseAuthor={event.phraseAuthor}
            backgroundImage={event.gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg'}
            secondaryImage={event.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
            layout={layouts.countdown || 'fullscreen'}
          />
        );

      case 'dedication':
        return (
          <DedicationSection
            key="dedication"
            parents={event.parents}
            backgroundImage={event.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
            secondaryImage={event.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
            layout={layouts.dedication || 'fullscreen'}
          />
        );

      case 'locations':
        return (
          <LocationsSection
            key="locations"
            ceremony={event.ceremony}
            party={event.party}
            backgroundImage={event.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
          />
        );

      case 'itinerary':
        return (
          <ItinerarySection
            key="itinerary"
            itinerary={event.itinerary}
            backgroundImage={event.gallery[3]?.url || '/fotos/gabriela-torres/dsc09721.jpg'}
          />
        );

      case 'dressCode':
        return <DressCodeSection key="dressCode" dressCode={event.dressCode} />;

      case 'giftRegistry':
        return <GiftSection key="giftRegistry" giftRegistry={event.giftRegistry} />;

      case 'rsvp':
        return (
          <RsvpSection
            key="rsvp"
            slug={event.slug}
            name={event.name}
            rsvpDeadline={event.rsvpDeadline}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#131313] text-gray-100 selection:bg-rosegold selection:text-[#131313]">
      {/* Reproductor de música de fondo flotante con autoplay */}
      <MusicPlayer musicUrl={event.musicUrl} musicTitle={event.musicTitle} />

      {/* Renderizado de Secciones Ordenadas Dinámicamente */}
      <div className="flex flex-col">
        {order.map((secId) => renderSection(secId))}
        <FooterSection name={event.name} slug={event.slug} />
      </div>
    </main>
  );
}
