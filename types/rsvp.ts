export interface RsvpEntry {
  id: string;
  slug: string;
  fullName: string;
  attending: boolean;
  guestsCount: number;
  phone: string;
  dietaryRestrictions?: string;
  message?: string;
  createdAt: string;
}

export interface RsvpStats {
  totalResponses: number;
  totalAttending: number;
  totalDeclined: number;
  totalConfirmedGuests: number;
}
