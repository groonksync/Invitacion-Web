'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
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
    return initialEvent || EVENTS[slug] || getClientStoredEventBySlug(slug);
  });

  useEffect(() => {
    if (!event) {
      const stored = getClientStoredEventBySlug(slug);
      if (stored) {
        setEvent(stored);
      }
    }
  }, [slug, event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
        <h1 className="font-serif text-3xl text-rosegold">Cargando Invitación...</h1>
        <p className="text-xs text-gray-400">Si acabas de crear esta invitación, la estamos sincronizando.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#131313] text-gray-100 selection:bg-rosegold selection:text-[#131313]">
      {/* Reproductor de música de fondo flotante con autoplay */}
      <MusicPlayer musicUrl={event.musicUrl} musicTitle={event.musicTitle} />

      {/* PORTADA */}
      <HeroSection
        name={event.name}
        subtitle={event.subtitle}
        date={event.date}
        heroImage={event.heroImage}
      />

      {/* SECCIÓN 1: Cuenta Regresiva & Frase */}
      <CountdownTimer
        targetDate={event.date}
        phrase={event.phrase}
        phraseAuthor={event.phraseAuthor}
        backgroundImage={event.gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg'}
      />

      {/* SECCIÓN 2: Bendición de Padres */}
      <DedicationSection
        parents={event.parents}
        backgroundImage={event.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
      />

      {/* SECCIÓN 3: Ceremonia & Recepción */}
      <LocationsSection
        ceremony={event.ceremony}
        party={event.party}
        backgroundImage={event.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
      />

      {/* SECCIÓN 4: Itinerario */}
      <ItinerarySection
        itinerary={event.itinerary}
        backgroundImage={event.gallery[3]?.url || '/fotos/gabriela-torres/dsc09721.jpg'}
      />

      {/* SECCIÓN 5: Código de Vestimenta */}
      <DressCodeSection
        dressCode={event.dressCode}
      />

      {/* SECCIÓN 6: Mesa de Regalos */}
      <GiftSection
        giftRegistry={event.giftRegistry}
      />

      {/* SECCIÓN 7: Confirmación RSVP */}
      <RsvpSection
        slug={event.slug}
        name={event.name}
        rsvpDeadline={event.rsvpDeadline}
      />

      {/* Pie de página */}
      <FooterSection
        name={event.name}
        slug={event.slug}
      />
    </main>
  );
}
