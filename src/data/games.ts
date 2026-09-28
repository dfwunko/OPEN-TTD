import { Game } from '../types/game';

export const GAMES_CATALOG: Game[] = [
  {
    id: 'kart-bros',
    title: 'Kart Bros',
    category: 'arcade',
    description: 'High-speed multiplayer 3D kart racing: drift around sharp corners, grab power-ups, and blast past rival drivers!',
    longDescription: 'Kart Bros is an action-packed 3D WebGL kart racing game from Blue Wizard Digital. Select your driver, step on the gas, power-slide through hairpin turns, and launch rockets and shields to claim 1st place across challenging tracks.',
    src: './games/kart/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Steer / Accelerate / Reverse' },
      { key: 'Spacebar / Shift', action: 'Drift / Power-slide' },
      { key: 'E / Ctrl', action: 'Use Power-up item' }
    ],
    instructions: [
      'Use WASD or Arrow Keys to steer and accelerate your kart.',
      'Hold Drift through turns to charge your mini-turbo boost.',
      'Collect item boxes along the track to acquire offensive and defensive power-ups.'
    ],
    tips: [
      'Release your drift right as your tires spark blue/orange for an explosive speed burst.',
      'Hold defensive items behind your kart to block incoming projectile attacks.'
    ],
    plays: 850000,
    rating: 4.99,
    ratingCount: 31200,
    badge: 'NEW 3D Racing',
    iconName: 'Trophy',
    accentColor: '#38bdf8',
    releaseYear: 2026,
    thumbnailUrl: './images/polytrack.jpg'
  },
  {
    id: 'basket-bros',
    title: 'Basket Bros',
    category: 'arcade',
    description: 'Fast-paced 1-on-1 arcade basketball: soar for rim-rocking dunks, stepback three-pointers, and high-flying basketball action!',
    longDescription: 'Basket Bros is a high-flying, fast-paced 1v1 arcade basketball game from Blue Wizard Digital. Drive to the hoop, unleash devastating dunks, pull off stepback jumpers, and defend your basket against rival bros.',
    src: './games/basket/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Drive / Move / Aim Jump' },
      { key: 'W / Up Arrow', action: 'Jump / Shoot / Dunk' },
      { key: 'Spacebar / Enter', action: 'Steal / Block / Knockdown' }
    ],
    instructions: [
      'Use WASD or Arrow Keys to position your baller on defense and offense.',
      'Press Up / W to leap for rebounds and jump shots. Time your release at the apex of your jump for perfect accuracy.',
      'Drive hard toward the hoop and press Jump while sprinting to throw down explosive dunks!'
    ],
    tips: [
      'Pump fake by tapping jump quickly to draw defender blocks before driving past them.',
      'Time your steals right when the opponent crosses over to force turnovers.'
    ],
    plays: 680000,
    rating: 4.99,
    ratingCount: 28900,
    badge: 'Trending #1 Sports',
    iconName: 'Trophy',
    accentColor: '#f97316',
    releaseYear: 2026,
    thumbnailUrl: './images/basketbros.jpg'
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    category: 'arcade',
    description: 'Fast-paced arcade baseball: strike out batters, time your swings, steal bases, and blast towering grand slams!',
    longDescription: 'Baseball Bros is a high-octane arcade baseball game from Blue Wizard Digital. Step into the batter\'s box, read the pitcher\'s delivery, and crush tape-measure home runs.',
    src: './games/baseballbros/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Aim Pitch / Position Batter / Direct Runners' },
      { key: 'Spacebar', action: 'Swing Bat / Deliver Pitch / Command Base Steal' }
    ],
    instructions: [
      'When batting: Move your batter into position and tap Spacebar right as the ball crosses the strike zone.',
      'When pitching: Aim your pitch trajectory across the strike zone edges and press Spacebar to deliver.'
    ],
    tips: [
      'Swinging slightly underneath high fastballs yields majestic fly-ball homers.',
      'Vary pitch placement to induce weak grounders.'
    ],
    plays: 430000,
    rating: 4.98,
    ratingCount: 18900,
    badge: 'Arcade Baseball',
    iconName: 'Trophy',
    accentColor: '#f97316',
    releaseYear: 2024,
    thumbnailUrl: './images/baseballbros.jpg'
  },
  {
    id: 'scarwrit',
    title: 'Scarwrit',
    category: 'skill',
    description: 'Atmospheric roguelite deckbuilder where cards remember: 108 cards, 28 Seals, 15 floors, and a Codex that permanently tempers and scars.',
    longDescription: 'Scarwrit is a dark gothic deckbuilder roguelite where every card keeps the record. Pick one of three Bindings, bind up to four veteran cards from your Codex, and descend fifteen perilous floors through The Margins, The Bindery, and The Inkpot.',
    src: './games/scarwrit/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Click / Tap', action: 'Lift Card / Target Enemy / Select Option' },
      { key: '1 - 9 / 0', action: 'Quick-Select Card from Hand' },
      { key: 'E / Enter', action: 'End Current Combat Turn' }
    ],
    instructions: [
      'Each turn you draw 5 cards and spend 3 Focus: tap a card to lift it, then tap an enemy to strike.',
      'Guard vanishes at the start of your next turn — use your defenses proactively.'
    ],
    tips: [
      'A card\'s scars can never outnumber its tempers.',
      'Buy card removal early to keep your deck tight and consistent.'
    ],
    plays: 580000,
    rating: 4.99,
    ratingCount: 22400,
    badge: 'Dark Deckbuilder',
    iconName: 'Flame',
    accentColor: '#A32C3C',
    releaseYear: 2026,
    thumbnailUrl: './images/scarwrit.png'
  },
  {
    id: 'cyber-survivor',
    title: 'Cyber Survivor',
    category: 'action',
    description: 'Neon rogue-lite space arena shooter: Cadet, Veteran, & Nightmare difficulties with persistent Hangar tech upgrades.',
    longDescription: 'Cyber Survivor is an unblocked, 60fps rogue-lite neon space arena shooter. Choose your difficulty, deploy custom vessel classes, and invest persistent Nanite earnings into the permanent Hangar Tech Tree.',
    src: './cyber-survivor/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Navigate Quantum Fighter' },
      { key: 'Mouse Cursor', action: 'Aim Weapon Trajectory' },
      { key: 'Spacebar / Shift', action: 'Quantum Dash' }
    ],
    instructions: [
      'Choose your mission difficulty in the Main Menu.',
      'Adapt your tactics against different attackers and collect XP shards for tiered augments.'
    ],
    tips: [
      'Dash perpendicularly the instant snipers lock their red tracking lines.',
      'Flank armored Goliaths from behind.'
    ],
    plays: 480000,
    rating: 4.99,
    ratingCount: 19800,
    badge: 'Enhanced & Exclusive',
    iconName: 'Zap',
    accentColor: '#38bdf8',
    releaseYear: 2026,
    thumbnailUrl: './images/cyber_survivor.jpg'
  },
  {
    id: 'eaglercraft-1-8',
    title: 'Minecraft 1.8.8',
    category: 'retro',
    description: 'Full unblocked Minecraft 1.8.8 in the browser with survival, creative sandbox, redstone engineering, and multiplayer servers.',
    longDescription: 'Eaglercraft 1.8.8 delivers authentic Minecraft 1.8.8 Java Edition directly in WebGL and WebAssembly. Mine underground caverns, harvest raw ores, construct towering castles, and connect to live multiplayer communities.',
    src: 'https://ubghyper.github.io/GameList.github.io/Eaglercraft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Walk / Sprint / Swim' },
      { key: 'Mouse Left Click', action: 'Mine / Attack / Break Block' },
      { key: 'Mouse Right Click', action: 'Place Block / Use Item' }
    ],
    instructions: [
      'Click inside the game frame to activate mouse pointer lock.',
      'Punch trees for wood logs, craft wooden planks, make a crafting table, and forge your first pickaxe.'
    ],
    tips: [
      'Press F for fullscreen mode.',
      'Always carry a water bucket on your hotbar.'
    ],
    plays: 520000,
    rating: 4.99,
    ratingCount: 21400,
    badge: 'Trending #1',
    iconName: 'Pickaxe',
    accentColor: '#22c55e',
    releaseYear: 2024,
    thumbnailUrl: './images/minecraft.jpg'
  },
  {
    id: 'infinite-craft',
    title: 'Infinite Craft',
    category: 'puzzle',
    description: 'Endless elemental alchemy: combine Water, Fire, Earth, and Wind to craft thousands of items, concepts, and discoveries.',
    longDescription: 'Infinite Craft is the viral sandbox alchemy sensation. Start with the four classical elements and drag them onto the crafting canvas to discover thousands of creations.',
    src: './infinite-craft/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Drag & Drop', action: 'Drag elements onto canvas & combine' },
      { key: 'Double Click', action: 'Duplicate element on canvas' }
    ],
    instructions: [
      'Drag elemental cards from the right sidebar onto the interactive workspace.',
      'Drop one element directly on top of another to trigger an elemental reaction.'
    ],
    tips: [
      'Combine matching elements (e.g. Earth + Earth = Mountain).'
    ],
    plays: 540000,
    rating: 4.99,
    ratingCount: 24500,
    badge: 'Viral Alchemy',
    iconName: 'Sparkles',
    accentColor: '#38bdf8',
    releaseYear: 2024,
    thumbnailUrl: './images/infinite_craft.jpg'
  },
  {
    id: 'super-smash-flash',
    title: 'Super Smash Flash',
    category: 'action',
    description: 'Iconic crossover fighting game: clash in frantic platform melees with Mario, Sonic, Link, Goku, Naruto, and Mega Man.',
    longDescription: 'Super Smash Flash is the premier browser platform fighting game bringing together titans of video game and anime history.',
    src: 'https://ubghyper.github.io/GameList.github.io/Super-Smash-Flash/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Movement / Crouch / Jump' },
      { key: 'O / P', action: 'Standard Attack / Special Ability' }
    ],
    instructions: [
      'Select your fighter and land combos to raise rival damage meters.',
      'Deliver a charged smash attack to launch adversaries past screen blast zones.'
    ],
    tips: [
      'Combine Up + Special as your primary vertical recovery move.'
    ],
    plays: 395000,
    rating: 4.98,
    ratingCount: 13800,
    badge: 'Brawler',
    iconName: 'Swords',
    accentColor: '#8b5cf6',
    releaseYear: 2024,
    thumbnailUrl: './images/smash.jpg'
  },
  {
    id: 'raft-survival',
    title: 'Raft',
    category: 'skill',
    description: 'Oceanic survival odyssey: cast your salvage hook, gather oceanic flotsam, expand your vessel, and defend against the great white shark.',
    longDescription: 'Trapped on an oceanic raft with nothing but a salvage hook made of plastic, scavenge floating barrels and timber planks, craft spears and filters, and construct multi-tier floating cathedrals.',
    src: 'https://ubghyper.github.io/GameList.github.io/Raft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move / Swim' },
      { key: 'Mouse Left Click', action: 'Cast Hook / Strike / Place' }
    ],
    instructions: [
      'Aim and charge your salvage hook toward floating barrels and planks.',
      'Desalinate seawater to prevent dehydration.'
    ],
    tips: [
      'Install collection nets along your raft forward edge.'
    ],
    plays: 289000,
    rating: 4.96,
    ratingCount: 9300,
    badge: 'Survival',
    iconName: 'Anchor',
    accentColor: '#0ea5e9',
    releaseYear: 2024,
    thumbnailUrl: './images/raft.jpg'
  },
  {
    id: 'level-devil',
    title: 'Level Devil',
    category: 'puzzle',
    description: 'Devious minimalist troll platformer where the floor crumbles, ceiling spikes plunge, and the exit door flees from you.',
    longDescription: 'Level Devil looks like a clean, innocent geometric platformer, but every level has a wicked mind of its own with disappearing ground and flying hazards.',
    src: 'https://ubghyper.github.io/GameList.github.io/Level-Devil/',
    aspectRatio: '16/9',
    controls: [
      { key: 'A / D or Arrow Keys', action: 'Move Left / Right' },
      { key: 'W / Spacebar', action: 'Jump' }
    ],
    instructions: [
      'Navigate your character to the golden doorway at the opposite side of each chamber.'
    ],
    tips: [
      'Do not sprint blindly; pause before stepping onto suspicious platform blocks.'
    ],
    plays: 318000,
    rating: 4.95,
    ratingCount: 8900,
    badge: 'Troll Platformer',
    iconName: 'Flame',
    accentColor: '#f97316',
    releaseYear: 2024,
    thumbnailUrl: './images/leveldevil.jpg'
  },
  {
    id: 'clash-of-crowns',
    title: 'Clash of Crowns',
    category: 'puzzle',
    description: 'Real-time kingdom warfare: command knight battalions, deploy siege weapons, cast arcane spells, and conquer rival fortresses.',
    longDescription: 'Clash of Crowns is an intense tactical kingdom battle simulation. Construct fortified defenses, train swordsmen, and deploy catapults.',
    src: 'https://play.galatrix.com/play/clash-of-crowns?autologin=1',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select Units / Deploy Troops' }
    ],
    instructions: [
      'Deploy units in strategic lanes to counter enemy frontline formations.'
    ],
    tips: [
      'Deploy tank units first to soak up archer fire.'
    ],
    plays: 410000,
    rating: 4.97,
    ratingCount: 14800,
    badge: 'Kingdom War',
    iconName: 'Shield',
    accentColor: '#a855f7',
    releaseYear: 2024,
    thumbnailUrl: './images/clash_of_crowns.jpg'
  }
];
