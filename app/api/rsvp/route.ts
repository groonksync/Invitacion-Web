import { NextRequest, NextResponse } from 'next/server';
import { getRsvpsBySlug, saveRsvp, calculateStats } from '@/lib/rsvpStorage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Falta el parámetro slug' }, { status: 400 });
    }

    const rsvps = getRsvpsBySlug(slug);
    const stats = calculateStats(rsvps);

    return NextResponse.json({ rsvps, stats });
  } catch (error) {
    console.error('Error en GET /api/rsvp:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, fullName, attending, guestsCount, phone, dietaryRestrictions, message } = body;

    if (!slug || !fullName || typeof attending !== 'boolean') {
      return NextResponse.json(
        { error: 'Datos incompletos. Se requiere slug, nombre y confirmación.' },
        { status: 400 }
      );
    }

    const saved = saveRsvp({
      slug,
      fullName: fullName.trim(),
      attending,
      guestsCount: attending ? Number(guestsCount) || 1 : 0,
      phone: (phone || '').trim(),
      dietaryRestrictions: (dietaryRestrictions || '').trim(),
      message: (message || '').trim(),
    });

    return NextResponse.json({ success: true, rsvp: saved }, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/rsvp:', error);
    return NextResponse.json({ error: 'Error al procesar la confirmación' }, { status: 500 });
  }
}
