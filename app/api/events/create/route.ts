import { NextResponse } from 'next/server';
import { createNewStoredEvent, getStoredEventBySlug } from '@/lib/eventStorage';
import { EVENTS } from '@/data/events';
import { EventData } from '@/types/event';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, templateSlug, date, subtitle } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'El nombre y el slug son obligatorios' },
        { status: 400 }
      );
    }

    // Normalizar slug (minúsculas, guiones, sin caracteres raros)
    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    if (!cleanSlug) {
      return NextResponse.json(
        { error: 'El slug generado no es válido' },
        { status: 400 }
      );
    }

    // Usar plantilla base seleccionada o por defecto
    const baseTemplate: EventData =
      getStoredEventBySlug(templateSlug) ||
      EVENTS[templateSlug] ||
      EVENTS['gabriela-torres'] ||
      Object.values(EVENTS)[0];

    const newEvent: EventData = {
      ...JSON.parse(JSON.stringify(baseTemplate)),
      id: `evt-${Date.now()}`,
      slug: cleanSlug,
      name: name.trim(),
      subtitle: subtitle?.trim() || 'Mis Quince Años',
      date: date || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19),
      phraseAuthor: name.trim(),
    };

    const success = createNewStoredEvent(cleanSlug, newEvent);

    if (!success) {
      return NextResponse.json(
        { error: 'No se pudo guardar la nueva invitación' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug: cleanSlug,
      message: '¡Nueva invitación creada exitosamente!',
    });
  } catch (error: any) {
    console.error('API /events/create error:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
