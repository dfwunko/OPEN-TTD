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
  },
  {
    id: 'atari-breakout',
    title: 'Atari Breakout',
    category: 'arcade',
    description: 'The legendary Atari arcade classic. Deflect the energy ball with your paddle to smash through multi-colored brick walls.',
    longDescription: 'Atari Breakout is one of the most influential arcade games in computing history. Control the bottom paddle, angle each ricochet, and clear all brick layers while the ball progressively speeds up! Embedded with full sandbox permissions and fluid canvas rendering.',
    src: 'https://1600512085-atari-embeds.googleusercontent.com/embeds/30b5756fcd9698c3289bde61e1aae8ae/inner-frame-minified.html?jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en.gh7qIZtzO5w.O%2Fd%3D1%2Frs%3DAHpOoo84YKT1RVy0T6hcXi5rH3LooB1WCw%2Fm%3D__features__',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse / Arrow Keys', action: 'Move Paddle Left & Right' },
      { key: 'Spacebar / Left Click', action: 'Launch Ball / Serve' },
      { key: 'P', action: 'Pause / Resume Game' }
    ],
    instructions: [
      'Position your paddle underneath the bouncing ball to keep it in play.',
      'Smash all the bricks at the top of the screen to advance.',
      'Hitting bricks near the sides or corners angles the ball into deep wall ricochets.',
      'Break a pathway through to the top ceiling to let the ball bounce rapidly behind the brick layer!'
    ],
    tips: [
      'The ball speeds up each time it strikes the higher orange and red brick tiers.',
      'Paddle size shrinks when the ball hits the top wall—focus on sharp precision movements.',
      'Hitting the ball with the outer edges of the paddle creates steep deflection angles.'
    ],
    plays: 68430,
    rating: 4.9,
    ratingCount: 1840,
    badge: 'Atari Classic',
    iconName: 'Gamepad2',
    accentColor: '#f59e0b',
    releaseYear: 1976
  }
];
