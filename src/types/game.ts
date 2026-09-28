export type GameCategory =
  | 'all'
  | 'favorites'
  | 'arcade'
  | 'action'
  | 'puzzle'
  | 'skill'
  | 'retro'
  | 'driving'
  | 'custom';

export interface GameControl {
  key: string;
  action: string;
}

export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  description: string;
  longDescription: string;
  src: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
  controls: GameControl[];
  instructions: string[];
  tips: string[];
  plays: number;
  rating: number;
  ratingCount: number;
  badge?: string;
  iconName: string;
  accentColor: string;
  releaseYear: number;
  thumbnailUrl?: string;
  isCustom?: boolean;
  rawHtml?: string;
  customHtml?: string;
  iframeTitle?: string;
  iframeStyle?: Record<string, any>;
}

export type CloakPreset = 'google' | 'classroom' | 'drive' | 'docs' | 'wikipedia';

export interface CloakConfig {
  preset: CloakPreset;
  title: string;
  faviconUrl: string;
}
