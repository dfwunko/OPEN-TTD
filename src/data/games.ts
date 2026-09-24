import { Game } from '../types/game';

export const GAMES_CATALOG: Game[] = [
  {
    id: 'openttd-online',
    title: 'OpenTTD Online',
    category: 'retro',
    description: 'Play OpenTTD (Transport Tycoon Deluxe) online directly in your browser. Build roads, rails, airports, and shipping networks.',
    longDescription: 'OpenTTD Online is the complete open-source simulation based on Chris Sawyer\'s classic Transport Tycoon Deluxe. Set up intricate rail networks with path signals, dispatch steam and high-speed electric trains, manage airports, connect growing cities, and out-maneuver competing freight companies.',
    src: 'https://openttdonline.com/play',
    aspectRatio: '16/9',
    controls: [
      { key: 'Left Click', action: 'Select Tool / Place Tracks & Depots' },
      { key: 'Right Click / Drag', action: 'Pan Map / Cancel Placement' },
      { key: 'Mouse Wheel', action: 'Zoom Map In / Out' },
      { key: 'Space', action: 'Pause / Resume Simulation' },
      { key: 'Esc', action: 'Close Active Window' },
      { key: 'F1 - F12', action: 'Toolbar Shortcuts & Financials' }
    ],
    instructions: [
      'Survey the map for primary industries (such as Coal Mines, Forests, or Oil Wells).',
      'Construct a railway station or truck bay near the producer and another at the processing factory or power plant.',
      'Lay tracks connecting them, build a train depot, and buy a locomotive with cargo wagons.',
      'Assign orders for the train to load cargo at the source and unload at the destination to start generating cash!',
      'Connect growing towns with passenger trains and buses to unlock massive long-term transit profits.'
    ],
    tips: [
      'Rail transport delivers the highest profit margins over medium and long distances.',
      'Build two parallel tracks (one for each direction) and place one-way path signals so multiple trains can run safely.',
      'Watch for town subsidies in the news ticker—fulfilling them pays a 3x profit bonus for a full year!',
      'Use the fast-forward speed button in the top menu to quickly accumulate capital for major expansions.'
    ],
    plays: 48920,
    rating: 5.0,
    ratingCount: 1250,
    badge: 'OpenTTD Online',
    iconName: 'Train',
    accentColor: '#10b981',
    releaseYear: 1994
  }
];
