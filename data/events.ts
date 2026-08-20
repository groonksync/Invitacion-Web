import { EventData } from '@/types/event';

export const EVENTS: Record<string, EventData> = {
  'valeria-15': {
    id: 'evt-001',
    slug: 'valeria-15',
    name: 'Valeria Sofía',
    age: 15,
    subtitle: 'Mis Quince Años',
    date: '2026-11-28T19:00:00',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-wedding-waltz-221.mp3',
    musicTitle: 'Vals de Ensueño - Piano & Cuerdas',
    phrase: 'Hay momentos en la vida que son irrepetibles, pero compartirlos con las personas que más amas los hace inolvidables. Gracias por ser parte de mi historia.',
    phraseAuthor: 'Valeria Sofía',
    parents: {
      mother: 'Carolina Mendoza de Castillo',
      father: 'Roberto Castillo Ruiz',
      godparents: 'Elena Mendoza & Gabriel Morales',
    },
    ceremony: {
      title: 'Misa de Acción de Gracias',
      time: '18:00 hrs',
      locationName: 'Parroquia Nuestra Señora de la Asunción',
      address: 'Av. Las Gardenias 1420, Ciudad Central',
      mapsUrl: 'https://maps.google.com/?q=Parroquia+Nuestra+Señora+de+la+Asuncion',
      wazeUrl: 'https://waze.com/ul?q=Parroquia+Nuestra+Señora+de+la+Asuncion',
      image: 'https://images.unsplash.com/photo-1548625361-19616de376e1?q=80&w=800&auto=format&fit=crop',
    },
    party: {
      title: 'Gran Fiesta & Recepción',
      time: '20:30 hrs',
      locationName: 'Salón de Eventos El Bosque Real',
      address: 'Carretera Real Km 8.5, Jardines del Prado',
      mapsUrl: 'https://maps.google.com/?q=Salon+de+Eventos+El+Bosque+Real',
      wazeUrl: 'https://waze.com/ul?q=Salon+de+Eventos+El+Bosque+Real',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Retrato',
        caption: 'Sesión al atardecer',
      },
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Sonrisa',
        caption: 'Momentos mágicos',
      },
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Elegancia',
        caption: 'Esperando la gran noche',
      },
      {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Jardines',
        caption: 'Alegría y juventud',
      },
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Flores',
        caption: 'Un sueño hecho realidad',
      },
      {
        url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=900&auto=format&fit=crop',
        alt: 'Sesión Fotográfica Valeria - Noche',
        caption: 'Celebrando 15 primaveras',
      },
    ],
    itinerary: [
      {
        time: '18:00',
        title: 'Misa de Acción de Gracias',
        description: 'Bendición y gratitud en el templo.',
        icon: 'church',
      },
      {
        time: '20:30',
        title: 'Recepción & Cocktail',
        description: 'Bienvenida a todos los invitados y aperitivos.',
        icon: 'cheers',
      },
      {
        time: '21:30',
        title: 'Entrada Triunfal & Vals',
        description: 'El emotivo vals con sus padres y chambelanes.',
        icon: 'music',
      },
      {
        time: '22:15',
        title: 'Brindis & Cena de Gala',
        description: 'Exquisito menú servido de 3 tiempos.',
        icon: 'utensils',
      },
      {
        time: '23:30',
        title: 'Apertura de Pista & Fiesta',
        description: '¡Música en vivo, DJ y celebración sin fin!',
        icon: 'sparkles',
      },
      {
        time: '01:30',
        title: 'Hora Loca & Sorpresas',
        description: 'Cotillón temático, luces neón y mucha diversión.',
        icon: 'moon',
      },
    ],
    dressCode: {
      style: 'Rigurosa Etiqueta / Formal Elegante',
      description: 'Hombres: Traje formal o esmoquin. Mujeres: Vestido largo de noche.',
      colorNotes: 'Agradecemos reservar los tonos Rosa Pastel y Rose Gold exclusivamente para la quinceañera.',
      colors: ['#2A2A2A', '#1E3A8A', '#065F46', '#831843', '#4C1D95'],
    },
    giftRegistry: {
      title: 'Lluvia de Sobres / Mesa de Regalos',
      description: 'Tu presencia es mi mayor regalo, pero si deseas hacerme un presente especial para mis proyectos y futuros estudios, pongo a tu disposición:',
      bankName: 'Banco Nacional / Mercantil',
      accountHolder: 'Valeria Sofía Castillo Mendoza',
      accountNumber: '4152-3134-8901-2291',
      clabeOrCbu: '012180004152313489',
      alias: 'VALERIA.15.FIESTA',
      wishListUrl: 'https://amazon.com',
    },
    rsvpDeadline: '15 de Noviembre de 2026',
    adminPin: '1515',
    theme: {
      palette: 'rose-gold',
    },
  },

  'plantilla-en-blanco': {
    id: 'evt-002',
    slug: 'plantilla-en-blanco',
    name: '[Nombre de la Quinceañera]',
    age: 15,
    subtitle: 'Mis Quince Años',
    date: '2026-12-31T20:00:00',
    heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop',
    musicUrl: 'https://assets.mixkit.co/music/preview/mixkit-wedding-waltz-221.mp3',
    musicTitle: 'Música de Fondo Personalizable',
    phrase: 'Escribe aquí una frase emotiva o dedicatoria para todos tus invitados y familiares.',
    phraseAuthor: '[Nombre de la Quinceañera]',
    parents: {
      mother: 'Nombre de la Mamá',
      father: 'Nombre del Papá',
      godparents: 'Nombres de los Padrinos (Opcional)',
    },
    ceremony: {
      title: 'Ceremonia Religiosa',
      time: '18:00 hrs',
      locationName: 'Nombre de la Iglesia / Parroquia',
      address: 'Calle y Número, Colonia, Ciudad',
      mapsUrl: 'https://maps.google.com',
      wazeUrl: 'https://waze.com',
      image: 'https://images.unsplash.com/photo-1548625361-19616de376e1?q=80&w=800&auto=format&fit=crop',
    },
    party: {
      title: 'Recepción y Fiesta',
      time: '20:30 hrs',
      locationName: 'Nombre del Salón o Quinta',
      address: 'Dirección del Salón de Eventos',
      mapsUrl: 'https://maps.google.com',
      wazeUrl: 'https://waze.com',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop',
        alt: 'Foto 1 de la sesión',
        caption: 'Foto de muestra 1',
      },
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop',
        alt: 'Foto 2 de la sesión',
        caption: 'Foto de muestra 2',
      },
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop',
        alt: 'Foto 3 de la sesión',
        caption: 'Foto de muestra 3',
      },
    ],
    itinerary: [
      {
        time: '18:00',
        title: 'Misa de Acción de Gracias',
        description: 'Horario y detalle de la ceremonia.',
        icon: 'church',
      },
      {
        time: '20:00',
        title: 'Llegada al Salón',
        description: 'Recepción de invitados.',
        icon: 'cheers',
      },
      {
        time: '21:00',
        title: 'Vals Principal',
        description: 'El esperado baile de 15 años.',
        icon: 'music',
      },
      {
        time: '22:00',
        title: 'Cena',
        description: 'Banquete para los invitados.',
        icon: 'utensils',
      },
      {
        time: '23:00',
        title: 'Gran Fiesta',
        description: 'Música y baile toda la noche.',
        icon: 'sparkles',
      },
    ],
    dressCode: {
      style: 'Formal / Elegante',
      description: 'Especifica aquí las indicaciones de vestimenta para tus invitados.',
      colorNotes: 'Puedes indicar colores reservados o sugeridos.',
      colors: ['#1F2937', '#374151', '#4B5563', '#6B7280'],
    },
    giftRegistry: {
      title: 'Lluvia de Sobres / Transferencia',
      description: 'Información sobre mesa de regalos o cuenta bancaria.',
      bankName: 'Nombre del Banco',
      accountHolder: 'Titular de la Cuenta',
      accountNumber: '0000-0000-0000-0000',
      clabeOrCbu: '000000000000000000',
      alias: 'ALIAS.EJEMPLO',
    },
    rsvpDeadline: 'Indicar fecha límite de confirmación',
    adminPin: '1234',
    theme: {
      palette: 'champagne',
    },
  },
};

export function getEventBySlug(slug: string): EventData | undefined {
  return EVENTS[slug];
}

export function getAllEvents(): EventData[] {
  return Object.values(EVENTS);
}
