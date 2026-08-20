import fs from 'fs';
import path from 'path';
import { RsvpEntry, RsvpStats } from '@/types/rsvp';

const DATA_FILE = path.join(process.cwd(), 'data', 'rsvps.json');

function ensureFile(): void {
  if (!fs.existsSync(DATA_FILE)) {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

export function getAllRsvps(): RsvpEntry[] {
  try {
    ensureFile();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data) as RsvpEntry[];
  } catch (error) {
    console.error('Error al leer RSVPs:', error);
    return [];
  }
}

export function getRsvpsBySlug(slug: string): RsvpEntry[] {
  const all = getAllRsvps();
  return all.filter((r) => r.slug === slug);
}

export function saveRsvp(entry: Omit<RsvpEntry, 'id' | 'createdAt'>): RsvpEntry {
  const all = getAllRsvps();
  const newEntry: RsvpEntry = {
    ...entry,
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };

  all.unshift(newEntry);

  try {
    ensureFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar RSVP en disco:', error);
  }

  return newEntry;
}

export function calculateStats(rsvps: RsvpEntry[]): RsvpStats {
  const totalResponses = rsvps.length;
  const totalAttending = rsvps.filter((r) => r.attending).length;
  const totalDeclined = rsvps.filter((r) => !r.attending).length;
  const totalConfirmedGuests = rsvps
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guestsCount || 1), 0);

  return {
    totalResponses,
    totalAttending,
    totalDeclined,
    totalConfirmedGuests,
  };
}
