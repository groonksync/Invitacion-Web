import fs from 'fs';
import path from 'path';
import { EventData } from '@/types/event';
import { EVENTS as DEFAULT_EVENTS } from '@/data/events';

const DATA_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

function ensureDataFile(): Record<string, EventData> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(EVENTS_FILE)) {
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(DEFAULT_EVENTS, null, 2), 'utf-8');
      return DEFAULT_EVENTS;
    }
    const content = fs.readFileSync(EVENTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading events.json:', error);
    return DEFAULT_EVENTS;
  }
}

export function getStoredEvents(): Record<string, EventData> {
  return ensureDataFile();
}

export function getStoredEventBySlug(slug: string): EventData | undefined {
  const events = ensureDataFile();
  return events[slug];
}

export function saveStoredEvent(slug: string, eventData: EventData): boolean {
  try {
    const events = ensureDataFile();
    events[slug] = {
      ...events[slug],
      ...eventData,
      slug,
    };
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving event:', error);
    return false;
  }
}
