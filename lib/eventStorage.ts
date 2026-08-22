import fs from 'fs';
import path from 'path';
import { EventData } from '@/types/event';
import { EVENTS as DEFAULT_EVENTS } from '@/data/events';

// Cache en memoria para Serverless
declare global {
  var __EVENTS_STORE__: Record<string, EventData> | undefined;
}

if (!global.__EVENTS_STORE__) {
  global.__EVENTS_STORE__ = { ...DEFAULT_EVENTS };
}

// En Vercel Serverless, solo /tmp es escribible
const TMP_FILE = path.join('/tmp', 'events_xv.json');
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_EVENTS_FILE = path.join(LOCAL_DATA_DIR, 'events.json');

function loadEvents(): Record<string, EventData> {
  // 1. Intentar leer de /tmp (serverless)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const content = fs.readFileSync(TMP_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      const combined = { ...DEFAULT_EVENTS, ...(global.__EVENTS_STORE__ || {}), ...parsed };
      global.__EVENTS_STORE__ = combined;
      return combined;
    }
  } catch (e) {
    // Ignorar si no se puede leer
  }

  // 2. Intentar leer de data/events.json local
  try {
    if (fs.existsSync(LOCAL_EVENTS_FILE)) {
      const content = fs.readFileSync(LOCAL_EVENTS_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      const combined = { ...DEFAULT_EVENTS, ...(global.__EVENTS_STORE__ || {}), ...parsed };
      global.__EVENTS_STORE__ = combined;
      return combined;
    }
  } catch (e) {
    // Ignorar si no existe
  }

  return global.__EVENTS_STORE__ || DEFAULT_EVENTS;
}

function persistEvents(events: Record<string, EventData>): void {
  global.__EVENTS_STORE__ = { ...events };

  // Intentar guardar en /tmp (funciona 100% en Vercel)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(events, null, 2), 'utf-8');
  } catch (e) {
    // Si falla /tmp, mantenemos en memoria
  }

  // Intentar guardar en data/events.json (funciona en entorno local)
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_EVENTS_FILE, JSON.stringify(events, null, 2), 'utf-8');
  } catch (e) {
    // Ignorar si el sistema de archivos es read-only (Vercel)
  }
}

export function getStoredEvents(): Record<string, EventData> {
  return loadEvents();
}

export function getStoredEventBySlug(slug: string): EventData | undefined {
  const events = loadEvents();
  return events[slug];
}

export function saveStoredEvent(slug: string, eventData: EventData): boolean {
  try {
    const events = loadEvents();
    events[slug] = {
      ...events[slug],
      ...eventData,
      slug,
    };
    persistEvents(events);
    return true;
  } catch (error) {
    console.error('Error saving event:', error);
    if (global.__EVENTS_STORE__) {
      global.__EVENTS_STORE__[slug] = { ...eventData, slug };
      return true;
    }
    return false;
  }
}

export function createNewStoredEvent(slug: string, eventData: EventData): boolean {
  try {
    const events = loadEvents();
    events[slug] = {
      ...eventData,
      id: `evt-${Date.now()}`,
      slug,
    };
    persistEvents(events);
    return true;
  } catch (error) {
    console.error('Error creating new event:', error);
    if (global.__EVENTS_STORE__) {
      global.__EVENTS_STORE__[slug] = {
        ...eventData,
        id: `evt-${Date.now()}`,
        slug,
      };
      return true;
    }
    return false;
  }
}
