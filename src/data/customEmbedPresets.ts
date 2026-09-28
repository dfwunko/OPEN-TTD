import { Game } from '../types/game';

export const CURATED_PRESET_EMBEDS: Game[] = [
  {
    id: 'preset-2048',
    title: '2048 Classic',
    category: 'custom',
    description: 'Join the numbers and get to the 2048 tile in this timeless puzzle game!',
    longDescription: '2048 is a single-player sliding block puzzle game. The objective of the game is to slide numbered tiles on a grid to combine them to create a tile with the number 2048.',
    src: 'https://play2048.co/',
    aspectRatio: '1/1',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Slide tiles on grid' }
    ],
    instructions: [
      'Use arrow keys or WASD to slide tiles.',
      'When two tiles with the same number touch, they merge into one!'
    ],
    tips: [
      'Keep your largest tile in a corner.',
      'Build a chain of descending values around your primary tile.'
    ],
    plays: 120000,
    rating: 4.9,
    ratingCount: 3400,
    badge: 'Offline Preset',
    iconName: 'Grid',
    accentColor: '#edc22e',
    releaseYear: 2024,
    isCustom: true
  }
];

export const DEFAULT_CUSTOM_EMBED_PRESETS = CURATED_PRESET_EMBEDS;
