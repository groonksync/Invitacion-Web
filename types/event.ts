export interface EventData {
  id: string;
  slug: string;
  name: string;
  age: number;
  subtitle: string;
  date: string; // Formato ISO ej: 2026-11-28T19:00:00
  heroImage: string;
  heroImagePosition?: 'center' | 'top' | 'bottom' | 'contain';
  musicUrl: string;
  musicTitle: string;
  phrase: string;
  phraseAuthor: string;
  parents: {
    mother: string;
    father: string;
    godparents?: string;
  };
  ceremony: {
    title: string;
    time: string;
    locationName: string;
    address: string;
    mapsUrl: string;
    wazeUrl: string;
    image?: string;
  };
  party: {
    title: string;
    time: string;
    locationName: string;
    address: string;
    mapsUrl: string;
    wazeUrl: string;
    image?: string;
  };
  gallery: Array<{
    url: string;
    alt?: string;
    caption?: string;
    position?: 'center' | 'top' | 'bottom' | 'contain';
  }>;
  itinerary: Array<{
    time: string;
    title: string;
    description: string;
    icon: string;
  }>;
  dressCode: {
    style: string;
    description: string;
    colorNotes: string;
    colors: string[];
  };
  giftRegistry: {
    title: string;
    description: string;
    bankName?: string;
    accountHolder?: string;
    accountNumber?: string;
    clabeOrCbu?: string;
    alias?: string;
    wishListUrl?: string;
  };
  rsvpDeadline: string;
  adminPin: string;
  theme?: {
    palette?: string;
    fontFamily?: string;
    animation?: string;
  };
  sectionLayouts?: Record<string, 'fullscreen' | 'album-duo' | 'floating-glass' | 'spotlight' | 'mosaic'>;
  sectionOrder?: string[];
  hiddenSections?: string[];
}
