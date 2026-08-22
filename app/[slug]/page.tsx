import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/data/events';
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
    <main className="min-h-screen bg-[#131313] text-gray-100 selection:bg-rosegold selection:text-[#131313]">
      {/* Reproductor de música de fondo flotante con autoplay */}
      <MusicPlayer musicUrl={event.musicUrl} musicTitle={event.musicTitle} />

      {/* PORTADA: Fotografía de Inicio a Pantalla Completa */}
      <HeroSection
        name={event.name}
        subtitle={event.subtitle}
        date={event.date}
        heroImage={event.heroImage}
      />

      {/* SECCIÓN 1: Fotografía 1 (dsc09665.jpg) a Pantalla Completa con Cuenta Regresiva & Frase */}
      <CountdownTimer
        targetDate={event.date}
        phrase={event.phrase}
        phraseAuthor={event.phraseAuthor}
        backgroundImage={event.gallery[0]?.url || '/fotos/gabriela-torres/dsc09665.jpg'}
      />

      {/* SECCIÓN 2: Fotografía 2 (dsc09668.jpg) a Pantalla Completa con Bendición de Padres */}
      <DedicationSection
        parents={event.parents}
        backgroundImage={event.gallery[1]?.url || '/fotos/gabriela-torres/dsc09668.jpg'}
      />

      {/* SECCIÓN 3: Fotografía 3 (dsc09709.jpg) a Pantalla Completa con Ceremonia & Recepción */}
      <LocationsSection
        ceremony={event.ceremony}
        party={event.party}
        backgroundImage={event.gallery[2]?.url || '/fotos/gabriela-torres/dsc09709.jpg'}
      />

      {/* SECCIÓN 4: Fotografía 4 (dsc09721.jpg) a Pantalla Completa con Itinerario de la Noche */}
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

      {/* SECCIÓN 7: Confirmación de Asistencia (RSVP) */}
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
