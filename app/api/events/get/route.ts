import { NextResponse } from 'next/server';
import { getStoredEventBySlug } from '@/lib/eventStorage';
import { EVENTS } from '@/data/events';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug no proporcionado' }, { status: 400 });
    }

    const event = getStoredEventBySlug(slug) || EVENTS[slug];

    if (!event) {
      return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error al obtener evento' }, { status: 500 });
  }
}
