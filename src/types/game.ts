export type GameCategory =
  | 'all'
  | 'arcade'
  | 'retro'
  | 'puzzle'
  | 'action'
  | 'driving'
  | 'skill'
  | 'favorites'
  | 'custom';

export interface GameControlItem {
  key: string;
  action: string;
}

export interface Game {
  id: string;
  title: string;
  category: 'arcade' | 'retro' | 'puzzle' | 'action' | 'driving' | 'skill';
  description: string;
  longDescription: string;
  src: string; // iframe URL or path
  aspectRatio?: '16/9' | '4/3' | '1/1' | '16/10' | 'auto';
  controls: GameControlItem[];
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
  customHtml?: string;
  isCustom?: boolean;
  iframeStyle?: React.CSSProperties;
  iframeTitle?: string;
}

export type CloakPreset = 'classroom' | 'drive' | 'docs' | 'wikipedia' | 'canvas';

export interface CloakConfig {
  enabled: boolean;
  preset: CloakPreset;
  hotkey: string; // e.g. "]" or "~"
}
