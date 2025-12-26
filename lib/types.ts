export type ContentType =
  | 'youtube-community'
  | 'facebook-post'
  | 'instagram-story'
  | 'random-tiktok'
  | 'instagram-reel'
  | 'youtube-long-clip'
  | 'facebook-reel'
  | 'podcast-tiktok'
  | 'street-tiktok'
  | 'youtube-street-long'
  | 'youtube-podcast-long';

export interface ContentTypeConfig {
  id: ContentType;
  label: string;
  fuelValue: number;
}

export interface FireState {
  fireLevel: number;
  streakDays: number;
  lastActionDate: string | null;
  lastDecayCheck: string | null;
}

export const CONTENT_TYPES: ContentTypeConfig[] = [
  { id: 'youtube-community', label: 'YouTube Community Post', fuelValue: 1 },
  { id: 'facebook-post', label: 'Facebook Post', fuelValue: 2 },
  { id: 'instagram-story', label: 'Instagram Story', fuelValue: 3 },
  { id: 'random-tiktok', label: 'Random TikTok', fuelValue: 4 },
  { id: 'instagram-reel', label: 'Instagram Reel', fuelValue: 5 },
  { id: 'youtube-long-clip', label: 'YouTube Long Clip', fuelValue: 6 },
  { id: 'facebook-reel', label: 'Facebook Reel', fuelValue: 7 },
  { id: 'podcast-tiktok', label: 'Podcast TikTok', fuelValue: 8 },
  { id: 'street-tiktok', label: 'Street TikTok', fuelValue: 9 },
  { id: 'youtube-street-long', label: 'YouTube Street Long', fuelValue: 10 },
  { id: 'youtube-podcast-long', label: 'YouTube Podcast Long', fuelValue: 11 },
];

export const MAX_FIRE_LEVEL = 100;
export const INITIAL_FIRE_LEVEL = 10;
export const DECAY_PER_DAY = 5;
