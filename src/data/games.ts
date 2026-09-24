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
      { key: 'Spacebar', action: 'Pause / Resume Simulation' },
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
    id: 'football-bros',
    title: 'Football Bros',
    category: 'action',
    description: 'Fast-paced multiplayer American football with touchdowns, spin moves, deep passes, and field goals.',
    longDescription: 'Football Bros is a fast-paced unblocked football game by Blue Wizard Digital. Play quick matches, call offensive routes, dodge defensive tackles with jukes, and throw deep passes into the end zone for thrilling touchdowns!',
    src: 'https://footballbros.io/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move Quarterback / Runner' },
      { key: 'Spacebar', action: 'Snap Ball / Throw Pass / Tackle' },
      { key: 'Left Click', action: 'Select Play / Juke' },
      { key: 'Esc', action: 'Pause Menu' }
    ],
    instructions: [
      'Choose your offensive or defensive playbook before each down.',
      'On offense: Press Spacebar to snap the ball to the QB, move to avoid the blitz, and press Space again to throw to an open receiver.',
      'On defense: Switch to the closest defender and dive/tackle the ball carrier before they gain first down yardage.',
      'Score touchdowns and kick extra points to lead your team to victory!'
    ],
    tips: [
      'Watch your receivers\' routes on the field before throwing to lead them into open grass.',
      'Pumping the throw meter gives you bullet passes that pierce tight coverage.',
      'Use spin and juke moves when one-on-one with the safety for breakaway touchdowns.'
    ],
    plays: 95400,
    rating: 4.95,
    ratingCount: 3120,
    badge: 'Football Bros',
    iconName: 'Trophy',
    accentColor: '#f97316',
    releaseYear: 2024
  },
  {
    id: 'basket-bros',
    title: 'Basket Bros',
    category: 'action',
    description: 'High-flying arcade basketball action with monster dunks, three-pointers, steals, and intense 1v1 matchups.',
    longDescription: 'Basket Bros is an explosive arcade basketball game by Blue Wizard Digital. Customize your hooper, unlock gear, unleash slam dunks, swat opponent shots, and drain buzzer-beaters from deep behind the arc.',
    src: 'https://basketbros.io/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Dribble / Jump' },
      { key: 'Spacebar / L', action: 'Shoot Basketball / Steal' },
      { key: 'Shift / K', action: 'Sprint / Turbo Dunk' },
      { key: 'Esc', action: 'Pause Menu' }
    ],
    instructions: [
      'Pick your favorite basketball character and arena.',
      'Hold the shoot key to jump, then release at the peak of your elevation for high shooting accuracy.',
      'Time your jump near the rim while holding turbo to trigger a backboard-shattering slam dunk!',
      'Play defense by staying in front of the ball-handler and swiping for the steal when they cross over.'
    ],
    tips: [
      'Release the shoot button right when your player reaches maximum jump height for green shot releases.',
      'Save your turbo meter for fast-break transition dunks and defensive chase-down blocks.',
      'Step-back jumpers create massive separation from aggressive defenders.'
    ],
    plays: 114200,
    rating: 4.92,
    ratingCount: 4210,
    badge: 'Basket Bros',
    iconName: 'Flame',
    accentColor: '#f59e0b',
    releaseYear: 2023
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    category: 'action',
    description: 'Classic arcade baseball with moonshot home runs, curveballs, blazing fastballs, and stellar fielding.',
    longDescription: 'Baseball Bros brings retro arcade baseball to life. Step up to the plate, time the pitch to hit grand slams over the fences, pitch nasty breaking balls with full control, and turn double plays on defense.',
    src: 'https://baseballbros.io/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse / Left Click', action: 'Swing Bat / Aim & Throw Pitch' },
      { key: 'Spacebar', action: 'Power Swing / Pitch Release' },
      { key: 'WASD / Arrow Keys', action: 'Base Running / Move Fielder' },
      { key: 'Esc', action: 'Pause Game' }
    ],
    instructions: [
      'When batting, watch the ball release from the pitcher\'s hand and swing when it reaches the strike zone.',
      'When pitching, select your pitch type (fastball, curveball, changeup) and click the target location.',
      'Command your fielders to field ground balls and throw to the correct base to force out runners.',
      'Score runs by knocking line drives into the gaps and clearing the bases with home runs.'
    ],
    tips: [
      'Timing is everything—swing slightly earlier on fastballs and wait patiently on off-speed curveballs.',
      'Mix up your pitch locations between high fastballs and low-and-away sliders to keep batters guessing.',
      'Send aggressive runners home on fly balls with tag-up plays.'
    ],
    plays: 86500,
    rating: 4.88,
    ratingCount: 2470,
    badge: 'Baseball Bros',
    iconName: 'Activity',
    accentColor: '#ef4444',
    releaseYear: 2024
  },
  {
    id: 'dig-out-of-prison',
    title: 'Dig Out of Prison',
    category: 'puzzle',
    description: 'Excavate escape tunnels, avoid guards, overcome obstacles, and dig your way to freedom.',
    longDescription: 'Dig Out of Prison is an addictive puzzle and skill arcade challenge. Plan your digging path underground, dodge searchlights, dismantle security obstacles, collect valuable hidden contraband, and guide your inmate to the getaway vehicle.',
    src: 'https://html5.gamedistribution.com/6b91889aa08e40ffbc1c09be1a8e81ce/?gd_sdk_referrer_url=https://www.onlinegames.io/dig-out-of-prison/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Left Click / Drag', action: 'Dig Soil & Carve Escape Path' },
      { key: 'WASD / Arrow Keys', action: 'Move Character / Steer Cart' },
      { key: 'Spacebar', action: 'Interact / Dig / Boost' },
      { key: 'Esc', action: 'Pause / Restart Level' }
    ],
    instructions: [
      'Study the prison underground map to identify guards, stone barriers, and the getaway route.',
      'Drag your cursor or use controls to dig tunnels through soft dirt while bypassing hard bedrock.',
      'Avoid triggering motion sensors, underground security lasers, and guard patrol zones.',
      'Reach the surface extraction point safely to complete each prison breakout level!'
    ],
    tips: [
      'Always look ahead before digging to avoid trapping yourself in a dead end.',
      'Collect keys and golden lockpicks scattered underground to unlock shortcut gates.',
      'Trigger environmental traps to distract guards while slipping through unnoticed.'
    ],
    plays: 67300,
    rating: 4.85,
    ratingCount: 1840,
    badge: 'Dig Out of Prison',
    iconName: 'Compass',
    accentColor: '#8b5cf6',
    releaseYear: 2023
  }
];
