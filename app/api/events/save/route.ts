import { NextResponse } from 'next/server';
import { saveStoredEvent } from '@/lib/eventStorage';
import { EventData } from '@/types/event';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, eventData } = body;

    if (!slug || !eventData) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos (slug o eventData)' },
        { status: 400 }
      );
    }

    const success = saveStoredEvent(slug, eventData as EventData);

    if (!success) {
      return NextResponse.json(
        { error: 'No se pudo guardar la configuración del evento' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Invitación guardada y actualizada exitosamente',
    });
  } catch (error: any) {
    console.error('API /events/save error:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
