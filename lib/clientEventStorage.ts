import { EventData } from '@/types/event';
import { EVENTS as DEFAULT_EVENTS } from '@/data/events';

const STORAGE_KEY = 'studio_xv_custom_events_v1';

export function getClientStoredEvents(): Record<string, EventData> {
  if (typeof window === 'undefined') {
    return DEFAULT_EVENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EVENTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_EVENTS, ...parsed };
  } catch (e) {
    console.error('Error reading localStorage events:', e);
    return DEFAULT_EVENTS;
  }
}

export function getClientStoredEventBySlug(slug: string): EventData | undefined {
  const events = getClientStoredEvents();
  return events[slug] || DEFAULT_EVENTS[slug];
}

export function saveClientStoredEvent(slug: string, eventData: EventData): void {
  if (typeof window === 'undefined') return;

  try {
    const events = getClientStoredEvents();
    events[slug] = {
      ...eventData,
      slug,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}
