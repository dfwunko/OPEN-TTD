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
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'action',
    description: 'The world\'s top egg-based 3D multiplayer first-person shooter with eggstraordinary arenas and weapons.',
    longDescription: 'Shell Shockers (Shellshock.io) is the smash-hit 3D multiplayer first-person shooter where you play as armed eggs battling across intense 3D maps. Crack your opponents with EggK-47s, Scramblers, and RPEGGs!',
    src: 'https://shellshock.io/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move / Strafe' },
      { key: 'Mouse Aim & Left Click', action: 'Aim & Fire Weapon' },
      { key: 'Spacebar', action: 'Jump' },
      { key: 'R', action: 'Reload Magazine' },
      { key: 'E / Q', action: 'Switch Weapons' },
      { key: 'Shift', action: 'Aim Down Sights' }
    ],
    instructions: [
      'Choose your loadout (EggK-47 assault rifle, CSG-1 shotgun, Crackshot sniper, or RPEGG launcher).',
      'Jump into Free-For-All, Teams, or King of the Coop match types.',
      'Aim for headshots (the top of the egg shell) for instant crack critical damage!',
      'Collect grenade pickups and ammo boxes scattered across the arena.'
    ],
    tips: [
      'Constantly bunny-hop and strafe to make your egg hitbox elusive to enemy snipers.',
      'Reload behind cover before pushing into high-traffic arena corridors.',
      'Throw grenades into doorways where opponents are grouping up.'
    ],
    plays: 245000,
    rating: 4.96,
    ratingCount: 7850,
    badge: 'Shell Shockers',
    iconName: 'Crosshair',
    accentColor: '#eab308',
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
  },
  {
    id: 'fmovies',
    title: 'FMovies Cinema',
    category: 'arcade',
    description: 'Direct streaming cinema player with movies, TV shows, and full player controls in an unblocked sandbox.',
    longDescription: 'FMovies Cinema provides access to movies and shows directly in an unblocked sandboxed player. Features full audio, popout playback, and fullscreen video support.',
    src: 'https://ww4.fmovies.co/23/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Left Click', action: 'Select Movie / Play Video' },
      { key: 'Spacebar', action: 'Play / Pause Video' },
      { key: 'F', action: 'Toggle Cinema Fullscreen' },
      { key: 'M', action: 'Mute / Unmute Audio' }
    ],
    instructions: [
      'Browse or search the cinema library to find movies or series.',
      'Click on any title to open the streaming player.',
      'Use the Nova Arcade fullscreen button for cinema-style full-display playback.',
      'If playback issues occur, click Reload in the toolbar or open in a stealth tab.'
    ],
    tips: [
      'Use the Fullscreen mode for an uninterrupted theater viewing experience.',
      'Hit the stealth Panic button (\']\') if you need to instantly disguise the screen as Google Classroom.'
    ],
    plays: 182400,
    rating: 4.9,
    ratingCount: 5600,
    badge: 'Cinema Player',
    iconName: 'Film',
    accentColor: '#ec4899',
    releaseYear: 2024
  },
  {
    id: 'interstellar-proxy',
    title: 'Interstellar Proxy',
    category: 'arcade',
    description: 'Next-generation stealth web proxy and privacy browser for bypassing web filters seamlessly.',
    longDescription: 'Interstellar is a modern, ultra-fast web proxy and unblocker service with built-in tab cloaking, custom search engines, tab masking, and unrestricted web navigation directly within an unblocked sandbox.',
    src: 'https://gointerstellar.app/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Address Bar', action: 'Search or Enter Web URL' },
      { key: 'Enter', action: 'Navigate to Destination' },
      { key: 'F', action: 'Fullscreen Browser' },
      { key: 'Esc', action: 'Return / Exit' }
    ],
    instructions: [
      'Enter any website URL or search term in the Interstellar navigation bar.',
      'Browse with accelerated speeds and evasion protocols.',
      'Use fullscreen mode for a full desktop browser experience.',
      'Hit the panic key (\']\') at any time to instantly mask with Google Classroom.'
    ],
    tips: [
      'Interstellar provides built-in stealth evasion and tab masquerading.',
      'Open links in popout mode or stealth about:blank for maximum bypass reliability.'
    ],
    plays: 312000,
    rating: 4.97,
    ratingCount: 8900,
    badge: 'Web Proxy',
    iconName: 'Globe',
    accentColor: '#38bdf8',
    releaseYear: 2024
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL Reloaded',
    category: 'action',
    description: 'Fast-paced 3D competitive third-person shooter and building simulator battle royale.',
    longDescription: '1v1.LOL Reloaded is the premier competitive 3D building and shooting game. Practice box fights, edit walls, place ramps, duel opponents in 1v1 arenas, and out-build your rivals in high-speed tactical combat.',
    src: 'https://1v1lolreloaded.com/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move Character' },
      { key: 'Mouse Left Click', action: 'Shoot Weapon / Place Build' },
      { key: 'Spacebar', action: 'Jump' },
      { key: 'Z / X / C / V', action: 'Wall / Floor / Ramp / Cone' },
      { key: 'R', action: 'Reload / Rotate Build' },
      { key: 'F / E', action: 'Edit Building Structure' }
    ],
    instructions: [
      'Choose your game mode: 1v1 Box Fights, Free Build Practice, Battle Royale, or Zone Wars.',
      'Swap between weapons (shotgun, assault rifle, sniper) and building mode rapidly.',
      'Erect walls and ramps to gain the high ground on opponents before taking your shot.',
      'Practice editing openings in walls for swift counter-attacks.'
    ],
    tips: [
      'High ground grants superior angles and headshot multiplier damage.',
      'Place a ramp immediately after shooting to protect yourself from return fire.',
      'Keep your crosshair centered on the enemy head when aiming through edit peeks.'
    ],
    plays: 289400,
    rating: 4.94,
    ratingCount: 6840,
    badge: '1v1.LOL',
    iconName: 'Crosshair',
    accentColor: '#3b82f6',
    releaseYear: 2024
  },
  {
    id: 'infinite-craft',
    title: 'Infinite Craft',
    category: 'puzzle',
    description: 'Synthesize elements starting with Water, Fire, Wind, and Earth to discover endless items, people, and universes.',
    longDescription: 'Infinite Craft is the viral sandbox alchemy game where four basic elements expand into an infinite universe of concepts, pop culture, technologies, and wonders. Drag and combine elements to unlock new discoveries.',
    src: '/infinite-craft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Left Click Drag', action: 'Drag Element onto Canvas' },
      { key: 'Drop on Element', action: 'Synthesize / Combine Elements' },
      { key: 'Search Bar', action: 'Filter Discovered Elements' },
      { key: 'Clear Board', action: 'Wipe Canvas Clean' }
    ],
    instructions: [
      'Start with the four primordial elements: Water, Fire, Wind, and Earth.',
      'Drag elements onto the canvas from the inventory sidebar.',
      'Drop an element directly over another to synthesize a brand-new creation.',
      'Every new item you synthesize is permanently added to your personal discovery almanac!'
    ],
    tips: [
      'Combine elemental opposites like Fire + Water to create Steam, or Earth + Water for Mud.',
      'Combine Life with human concepts like Tools to discover Professions and Civilizations.',
      'Click "Live Server" at the top right inside the game if you want to connect to Neal.fun\'s live AI model.'
    ],
    plays: 198000,
    rating: 4.98,
    ratingCount: 9420,
    badge: 'Infinite Craft',
    iconName: 'Sparkles',
    accentColor: '#a855f7',
    releaseYear: 2024
  },
  {
    id: 'eaglercraft-1-8',
    title: 'Eaglercraft 1.8.8',
    category: 'retro',
    description: 'Full unblocked Minecraft 1.8.8 in the browser with survival, creative mode, and multiplayer servers.',
    longDescription: 'Eaglercraft 1.8.8 brings the complete Minecraft 1.8.8 experience straight to the web. Mine resources, craft tools, build massive architectural creations, explore caves and the Nether, and connect to live multiplayer servers directly from your browser without any installation.',
    src: 'https://ubghyper.github.io/GameList.github.io/Eaglercraft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move / Walk' },
      { key: 'Mouse Left Click', action: 'Mine / Attack / Destroy Block' },
      { key: 'Mouse Right Click', action: 'Place Block / Use Item' },
      { key: 'Spacebar', action: 'Jump / Swim Up' },
      { key: 'Shift', action: 'Sneak / Crouch' },
      { key: 'E', action: 'Open Inventory' },
      { key: '1 - 9', action: 'Select Hotbar Slot' },
      { key: 'Esc', action: 'Pause Menu / Release Pointer Lock' }
    ],
    instructions: [
      'Click into the game frame to activate mouse pointer lock for full 3D camera control.',
      'Gather wood by punching trees, craft a crafting table, and forge your first wooden pickaxe.',
      'Mine stone to upgrade to stone tools, discover coal for torches, and find iron ore.',
      'Build a shelter before nightfall to survive against zombies, skeletons, and creepers!'
    ],
    tips: [
      'Use Fullscreen mode for the best immersive desktop experience and smoother mouse locking.',
      'Press F11 or Nova Arcade\'s Fullscreen button for true edge-to-edge Minecraft gameplay.',
      'Save your singleplayer worlds by exporting them from the world selection screen.'
    ],
    plays: 340000,
    rating: 4.99,
    ratingCount: 14500,
    badge: 'Minecraft 1.8',
    iconName: 'Pickaxe',
    accentColor: '#22c55e',
    releaseYear: 2024
  },
  {
    id: 'raft-survival',
    title: 'Raft',
    category: 'skill',
    description: 'Oceanic survival adventure: throw your hook, gather floating materials, craft tools, expand your raft, and survive against the great white shark.',
    longDescription: 'Trapped on an oceanic raft with nothing but a hook made of old plastic, you awake on an endless blue sea. Hook floating flotsam, scavenge barrels, craft spears, purify seawater, cook fish, build multi-story floating fortresses, and defend against the relentless man-eating shark circling your raft.',
    src: 'https://ubghyper.github.io/GameList.github.io/Raft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move / Swim' },
      { key: 'Mouse Left Click', action: 'Throw Hook / Attack / Build' },
      { key: 'Mouse Right Click', action: 'Cancel Hook / Rotate Block' },
      { key: 'Spacebar', action: 'Jump' },
      { key: 'E', action: 'Interact / Pickup Item' },
      { key: 'Tab', action: 'Crafting & Inventory' },
      { key: '1 - 8', action: 'Hotbar Selection' },
      { key: 'Esc', action: 'Pause / Menu' }
    ],
    instructions: [
      'Click inside the frame to lock mouse pointer into the 3D marine environment.',
      'Aim your hook at floating barrels, wood planks, and leaves to pull supplies toward your raft.',
      'Purify seawater using the simple purifier to keep your hydration bar full.',
      'Forge a wooden spear quickly to fend off the shark whenever it bites your raft foundations.'
    ],
    tips: [
      'Never swim into the open water when the shark is circling close to your raft.',
      'Craft net collectors along the front perimeter to automatically collect floating debris while you build.'
    ],
    plays: 245000,
    rating: 4.96,
    ratingCount: 8120,
    badge: 'Ocean Survival',
    iconName: 'Anchor',
    accentColor: '#0ea5e9',
    releaseYear: 2024
  },
  {
    id: 'cuphead',
    title: 'Cuphead',
    category: 'action',
    description: 'Legendary 1930s cartoon run-and-gun platformer featuring intense multi-phase boss battles and original jazz.',
    longDescription: 'Cuphead is the acclaimed run-and-gun action game celebrated for its hand-drawn cel animation, watercolor backgrounds, and original jazz recordings. Play as Cuphead or Mugman as you traverse strange worlds, acquire new weapons, learn powerful super moves, and battle gargantuan bosses to repay your debt to the devil!',
    src: 'https://ubghyper.github.io/GameList.github.io/Cuphead/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Move & Aim Direction' },
      { key: 'Z', action: 'Jump / Parry Pink Objects' },
      { key: 'X', action: 'Shoot Peashooter / Spread' },
      { key: 'C', action: 'Dash Dodge' },
      { key: 'V', action: 'EX Move / Super Blast' },
      { key: 'Tab / Shift', action: 'Switch Weapon' }
    ],
    instructions: [
      'Dodge bullets, projectiles, and incoming hazards by constantly jumping and dashing.',
      'Slap any bright pink projectile or enemy by pressing Jump again mid-air to execute a Parry and build up your Super meter card deck.',
      'Memorize boss attack phases and patterns to time your offensive blasts.'
    ],
    tips: [
      'Master the jump parry on pink objects — it charges your super meter rapidly and resets your mid-air jump.',
      'Smoke bomb dash gives you invulnerability frames to phase straight through boss attacks.'
    ],
    plays: 382000,
    rating: 4.98,
    ratingCount: 12400,
    badge: 'Boss Rush',
    iconName: 'Coffee',
    accentColor: '#ef4444',
    releaseYear: 2024
  },
  {
    id: 'level-devil',
    title: 'Level Devil',
    category: 'puzzle',
    description: 'Hilarious and infuriating troll platformer where the floor vanishes, spikes fly, and doors move when you approach.',
    longDescription: 'Level Devil is a deceptively simple platformer with a sinister twist: the game is actively trolling you! Navigate each level toward the exit door while dodging disappearing platforms, surprise crushing ceilings, shifting gravity, flying spikes, and inverted controls.',
    src: 'https://ubghyper.github.io/GameList.github.io/Level-Devil/',
    aspectRatio: '16/9',
    controls: [
      { key: 'A / D or Left / Right', action: 'Move Left / Right' },
      { key: 'W / Space / Up', action: 'Jump' },
      { key: 'R', action: 'Quick Restart Room' },
      { key: 'Esc', action: 'Level Select Menu' }
    ],
    instructions: [
      'Run toward the golden door at the end of each room.',
      'Expect the unexpected: steps will crumble, ceilings will drop, and doors will run away from you.',
      'Learn from each trap and find the secret alternate route to triumph over the devil\'s trickery.'
    ],
    tips: [
      'Don\'t rush blindly; pause for a split second before stepping on suspicious floor tiles.',
      'Watch out for reversed controls on later stages where right moves left!'
    ],
    plays: 290000,
    rating: 4.95,
    ratingCount: 7600,
    badge: 'Troll Platformer',
    iconName: 'Flame',
    accentColor: '#f97316',
    releaseYear: 2024
  },
  {
    id: 'idle-mining-empire',
    title: 'Idle Mining Empire',
    category: 'arcade',
    description: 'Addictive management simulation: dig shafts, hire elevator operators, automate transports, and mine rare gems.',
    longDescription: 'Idle Mining Empire is a deep incremental tycoon simulator where you start with a single underground mining shaft and scale up to an automated subterranean empire. Hire specialized managers to automate digging, upgrade elevators to haul ore to the surface, and warehouse collectors to maximize profits.',
    src: 'https://ubghyper.github.io/GameList.github.io/Idle-Mining-Empire/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Click to Dig / Collect Ore / Upgrade' },
      { key: 'Scroll Wheel', action: 'Pan Up / Down Deep Shafts' },
      { key: 'Spacebar', action: 'Fast Forward / Quick Collect' }
    ],
    instructions: [
      'Click on your miners to manually dig coal and minerals from underground shafts.',
      'Click the elevator operator to lift the mined ore up to the surface facility.',
      'Direct warehouse workers to transport ore to the distribution bank for instant cash.',
      'Hire managers for each station to fully automate the production line even while idle!'
    ],
    tips: [
      'Keep your elevator capacity and warehouse transport balanced with your shaft extraction rate to prevent bottlenecks.',
      'Unlock deeper mine shafts to discover high-value minerals like Gold, Rubies, and Diamonds.'
    ],
    plays: 215000,
    rating: 4.92,
    ratingCount: 5400,
    badge: 'Tycoon',
    iconName: 'Coins',
    accentColor: '#eab308',
    releaseYear: 2024
  },
  {
    id: 'super-smash-flash',
    title: 'Super Smash Flash',
    category: 'action',
    description: 'The legendary browser crossover fighting game: battle with Mario, Sonic, Mega Man, Goku, Naruto, and Link!',
    longDescription: 'Super Smash Flash is the iconic platform brawler that brings together characters from Nintendo, anime, and classic gaming history. Pick your favorite fighter, jump into frantic 4-player melees, unleash signature specials, smash opponents off the stage, and climb the classic arcade ladder.',
    src: 'https://ubghyper.github.io/GameList.github.io/Super-Smash-Flash/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Movement / Crouch / Up-Jump' },
      { key: 'O', action: 'Standard Attack / Jab / Smash' },
      { key: 'P', action: 'Special Attack (Hadoken, Kamehameha, Spin)' },
      { key: 'Spacebar', action: 'Jump / Double Jump' },
      { key: 'Backspace', action: 'Pause Match' }
    ],
    instructions: [
      'Pick your hero from legendary rosters including Mario, Sonic, Goku, Naruto, Link, Kirby, and Fox.',
      'Deal damage to build up enemy damage percentages — the higher their %, the farther they fly when hit.',
      'Land a powerful smash attack to launch enemies beyond the screen blast zones for KOs.'
    ],
    tips: [
      'Combine Up + Special (W + P) as your primary recovery move to get back onto the platform when knocked off-stage.',
      'Use shields and rolling dodges to slip behind heavy attacks and counter-strike.'
    ],
    plays: 360000,
    rating: 4.98,
    ratingCount: 11200,
    badge: 'Smash Brawler',
    iconName: 'Swords',
    accentColor: '#8b5cf6',
    releaseYear: 2024
  }
];
