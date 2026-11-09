export type ThemeMode = 'morning' | 'latte' | 'dusk';

export interface GratitudeReason {
  id: string;
  number: string;
  title: string;
  preview: string;
  detail: string;
  quote?: string;
  tag: string;
}

export interface MemoryMoment {
  id: string;
  image: string;
  title: string;
  caption: string;
  location: string;
  timeframe: string;
  aspect: string;
}

export interface PersonalizationData {
  recipientName: string;
  senderName: string;
  relationshipTitle: string;
  heroHeadline: string;
  heroSubhead: string;
  letterGreeting: string;
  letterBody: string[];
  letterSignoff: string;
  secretNote: string;
}

export interface ReplyNote {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  latteArt: string;
}
