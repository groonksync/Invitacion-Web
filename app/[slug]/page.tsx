import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/data/events';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import DedicationSection from '@/components/DedicationSection';
import LocationsSection from '@/components/LocationsSection';
import PhotoGallery from '@/components/PhotoGallery';
import ItinerarySection from '@/components/ItinerarySection';
import DressCodeSection from '@/components/DressCodeSection';
import GiftSection from '@/components/GiftSection';
import RsvpSection from '@/components/RsvpSection';
import FooterSection from '@/components/FooterSection';
import MusicPlayer from '@/components/MusicPlayer';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = getEventBySlug(params.slug);
  if (!event) {
    return {
      title: 'Invitación no encontrada',
    };
  }

  return {
    title: `${event.name} | ${event.subtitle}`,
    description: `Te invito a celebrar mis 15 años. Conoce todos los detalles del evento y confirma tu asistencia.`,
    openGraph: {
      title: `${event.name} | ${event.subtitle}`,
      description: `Te invito a celebrar mis 15 años. Conoce todos los detalles del evento y confirma tu asistencia.`,
      images: [{ url: event.heroImage }],
    },
  };
}

export default function InvitationPage({ params }: PageProps) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0a0f] text-gray-100 selection:bg-rose-500 selection:text-white sparkle-bg">
      {/* Reproductor de música de fondo flotante */}
      <MusicPlayer musicUrl={event.musicUrl} musicTitle={event.musicTitle} />

      {/* Portada Hero */}
      <HeroSection
        name={event.name}
        subtitle={event.subtitle}
        date={event.date}
        heroImage={event.heroImage}
      />

      {/* Contador regresivo en tiempo real */}
      <CountdownTimer targetDate={event.date} />

      {/* Dedicatoria y bendición de padres */}
      <DedicationSection
        phrase={event.phrase}
        phraseAuthor={event.phraseAuthor}
        parents={event.parents}
      />

      {/* Ubicaciones de misa y salón */}
      <LocationsSection
        ceremony={event.ceremony}
        party={event.party}
      />

      {/* Galería de fotos interactiva con visor */}
      <PhotoGallery
        gallery={event.gallery}
        name={event.name}
      />

      {/* Itinerario y cronograma */}
      <ItinerarySection
        itinerary={event.itinerary}
      />

      {/* Código de vestimenta */}
      <DressCodeSection
        dressCode={event.dressCode}
      />

      {/* Mesa de regalos y datos bancarios */}
      <GiftSection
        giftRegistry={event.giftRegistry}
      />

      {/* Confirmación de Asistencia (RSVP) */}
      <RsvpSection
        slug={event.slug}
        name={event.name}
        rsvpDeadline={event.rsvpDeadline}
      />

      {/* Pie de página y acceso al panel */}
      <FooterSection
        name={event.name}
        slug={event.slug}
      />
    </main>
  );
}
