import { getEventBySlug } from '@/data/events';
import InvitationClientView from '@/components/InvitationClientView';
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
      title: 'Invitación Mis Quince Años',
      description: 'Te invito a celebrar mis 15 años. Conoce todos los detalles del evento y confirma tu asistencia.',
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
  const initialEvent = getEventBySlug(params.slug);

  return (
    <InvitationClientView
      initialEvent={initialEvent}
      slug={params.slug}
    />
  );
}
