import { Game } from '../types/game';

export const GAMES_CATALOG: Game[] = [
  {
    id: 'basket-bros',
    title: 'Basket Bros',
    category: 'arcade',
    description: 'Fast-paced 1-on-1 arcade basketball: soar for rim-rocking dunks, stepback three-pointers, and high-flying basketball action!',
    longDescription: 'Basket Bros is a high-flying, fast-paced 1v1 arcade basketball game from Blue Wizard Digital. Drive to the hoop, unleash devastating dunks, pull off stepback jumpers, and defend your basket against rival bros. Features smooth ragdoll physics, customizable character ballers, and intense local single-player & multiplayer gameplay.',
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
      'Time your steals right when the opponent crosses over to force turnovers.',
      'Step back behind the 3-point arc for high-value long distance shots when trailing.'
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
    description: 'Fast-paced arcade baseball: strike out batters, time your swings, steal bases, and blast towering grand slams and home run nukes!',
    longDescription: 'Baseball Bros is a high-octane, fast-paced arcade baseball game from Blue Wizard Digital. Step into the batter\'s box, read the pitcher\'s delivery, and crush tape-measure home runs. When on the mound, mix up blazing fastballs, biting curveballs, and deceptive changeups to rack up strikeouts. Features responsive controls, fluid ragdoll animations, and offline single-player and 2-player modes.',
    src: './games/baseballbros/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Aim Pitch / Position Batter / Direct Runners' },
      { key: 'Spacebar', action: 'Swing Bat / Deliver Pitch / Command Base Steal' },
      { key: 'Mouse Click', action: 'Menu Navigation & Team Selection' }
    ],
    instructions: [
      'When batting: Move your batter into position using Arrow Keys/WASD and tap Spacebar right as the ball crosses the strike zone to launch a hit.',
      'When pitching: Aim your pitch trajectory across the strike zone edges and press Spacebar to deliver.',
      'When running: Press Spacebar while on base to initiate steals and advance to scoring position.'
    ],
    tips: [
      'Watch the pitch speed and elevation — swinging slightly underneath high fastballs yields majestic fly-ball homers.',
      'Vary your pitch placement toward the outside corners to induce weak grounders and pop flies.',
      'Steal second base on early pitch counts to keep pressure on the opposing defense.'
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
    longDescription: 'Scarwrit (Scarewit) is a dark gothic deckbuilder roguelite where every card keeps the record. Pick one of three Bindings, bind up to four veteran cards from your Codex, and descend fifteen perilous floors through The Margins, The Bindery, and The Inkpot. Spend Focus to lift cards and strike terrifying adversaries. Cards of the same faction chain together for massive score multipliers. Fell bosses to earn permanent Tempers for your cards, but beware: death demands a permanent Scar inscribed upon a card you choose.',
    src: './games/scarwrit/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Click / Tap', action: 'Lift Card / Target Enemy / Select Option' },
      { key: '1 - 9 / 0', action: 'Quick-Select Card from Hand' },
      { key: 'E / Enter', action: 'End Current Combat Turn' },
      { key: 'Backspace', action: 'Deselect / Lower Lifted Card' },
      { key: 'Arrow Left / Right', action: 'Cycle Enemy Targets' },
      { key: 'C', action: 'Open Codex & Permanent Card Records' },
      { key: 'M', action: 'Toggle Ambient Audio / Mute' },
      { key: 'P / Esc', action: 'Pause Menu / View Run Details' }
    ],
    instructions: [
      'Each turn you draw 5 cards and spend 3 Focus: tap a card to lift it, then tap an enemy to strike.',
      'Guard vanishes at the start of your next turn — use your defenses proactively before ending your turn.',
      'Cards of the same faction chain together when played consecutively, multiplying your score.',
      'Defeat 3 floor bosses to clear the run. Cards that help fell bosses earn permanent Tempers; dying forces a permanent Scar onto a card of your choice.'
    ],
    tips: [
      'A card\'s scars can never outnumber its tempers, meaning upgraded cards remain net-positive.',
      '40 Ink heals a scar at The Bindery — you can readily cleanse a mistake after a few runs.',
      'Chains grant tremendous combat score early in fights, but later links yield diminishing returns.',
      'Buy card removal early: a tight 14-card deck that reliably hits combos outplays a bloated 21-card deck.'
    ],
    plays: 580000,
    rating: 4.99,
    ratingCount: 22400,
    badge: 'Dark Deckbuilder Roguelite',
    iconName: 'Flame',
    accentColor: '#A32C3C',
    releaseYear: 2026,
    thumbnailUrl: './images/scarwrit.png'
  },
  {
    id: 'cyber-survivor',
    title: 'Cyber Survivor',
    category: 'action',
    description: 'Neon rogue-lite space arena shooter: feature-packed with Cadet, Veteran, & Nightmare difficulties, persistent Hangar tech upgrades, and diverse alien attacker archetypes.',
    longDescription: 'Cyber Survivor is an unblocked, 60fps rogue-lite neon space arena shooter. Choose your difficulty (Cadet, Veteran, or Nightmare), deploy custom vessel classes (Vanguard, Aegis, or Phantom), and invest persistent Nanite earnings into the permanent Hangar Tech Tree. Confront specialized attacker archetypes including sine-wave Strikers, orbiting Vortex spinners, long-range Railgun snipers with telegraph lasers, suicide Nova Mines, armored Goliaths, cloaked Phase Stalkers, and multi-phase Cyber Dreadnought bosses.',
    src: './cyber-survivor/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Navigate & Steer Quantum Fighter' },
      { key: 'Mouse Cursor', action: 'Aim Weapon Trajectory & Direction' },
      { key: 'Auto-Fire / Left Click', action: 'Unleash Plasma Blaster Volleys' },
      { key: 'Spacebar / Shift', action: 'Quantum Dash (Invulnerable Flash & Shockwave)' },
      { key: 'EMP Button', action: 'Trigger Emergency Screen-Clearing EMP Blast' },
      { key: 'P / Escape', action: 'Pause Systems / Recalibrate' }
    ],
    instructions: [
      'Choose your mission difficulty in the Main Menu: Cadet (1.0x), Veteran (1.6x), or Nightmare (2.5x multiplier).',
      'Select a vessel class tailored to your playstyle: Vanguard (balanced), Aegis (heavy defense), or Phantom (recon speed).',
      'Adapt your tactics against different attackers: dodge red sniper telegraph lines, flank armored Goliaths from behind, and burst down suicide Nova Mines before detonation.',
      'Collect XP shards to pick tiered in-run augments, and bank permanent Nanite credits to upgrade Hull Armor, Shields, and Core Damage in the Hangar Lab.'
    ],
    tips: [
      'When targeted by Railgun Snipers, watch the red tracking line — dash perpendicularly the instant it charges to full intensity.',
      'Flank armored Goliaths from behind; frontal hits take 80% damage reduction due to their heavy shield plates.',
      'Invest early Nanites into Hangar Nanite Harvester to dramatically accelerate future shard collection.'
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
    longDescription: 'Eaglercraft 1.8.8 delivers the genuine, authentic Minecraft 1.8.8 Java Edition directly in WebGL and WebAssembly. Mine underground caverns, harvest raw ores, construct towering castles, automate farms with redstone, and connect to live multiplayer communities straight from your browser with zero installation.',
    src: 'https://ubghyper.github.io/GameList.github.io/Eaglercraft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Walk / Sprint / Swim' },
      { key: 'Mouse Left Click', action: 'Mine / Attack / Break Block' },
      { key: 'Mouse Right Click', action: 'Place Block / Use Item / Open Chest' },
      { key: 'Spacebar', action: 'Jump / Ascend Water' },
      { key: 'Shift', action: 'Sneak / Crouch (Prevents Ledge Falling)' },
      { key: 'E', action: 'Open Inventory / Crafting Grid' },
      { key: '1 - 9', action: 'Select Hotbar Slot' },
      { key: 'Esc', action: 'Pause Menu / Release Mouse Pointer Lock' }
    ],
    instructions: [
      'Click inside the game frame to activate mouse pointer lock for full 3D camera navigation.',
      'Punch trees for wood logs, craft wooden planks, make a crafting table, and forge your first pickaxe.',
      'Delve into subterranean stone layers for coal and iron ore, craft torches, and fortify your base.',
      'Survive the wilderness against nighttime monsters and explore the Nether dimension.'
    ],
    tips: [
      'Press F or use the Fullscreen toggle for an edge-to-edge, ultra-smooth desktop experience.',
      'Always carry a water bucket on your hotbar to negate high fall damage and neutralize lava pools.',
      'Export and backup your singleplayer world files from the world selection screen to preserve your builds.'
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
    longDescription: 'Infinite Craft is the viral sandbox alchemy sensation. Start with the four classical elements — Water, Fire, Earth, and Wind — and drag them onto the crafting canvas. Combine elements to discover Steam, Lava, Plants, Philosophy, Galaxies, and infinite creations. All your discovered recipes are saved locally with zero installation.',
    src: './infinite-craft/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Drag & Drop', action: 'Drag elements onto canvas & combine' },
      { key: 'Double Click Element', action: 'Quick duplicate element on canvas' },
      { key: 'Search Bar', action: 'Filter discovered element collection' },
      { key: 'Clear / Broom', action: 'Wipe canvas clean while keeping discoveries' }
    ],
    instructions: [
      'Drag elemental cards from the right sidebar onto the interactive workspace.',
      'Drop one element directly on top of another to trigger an elemental reaction.',
      'Discover thousands of recipes from simple nature to mythical gods and technology.'
    ],
    tips: [
      'Combine matching elements (e.g. Earth + Earth = Mountain, Mountain + Mountain = Mountain Range).',
      'Use the search bar in the element drawer to quickly pull up past discoveries.'
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
    longDescription: 'Super Smash Flash is the premier browser platform fighting game bringing together titans of video game and anime history. Choose your champion, leap into chaotic 4-player battles, unleash signature special moves, build rival damage percentages, and blast opponents clean off the arena stage.',
    src: 'https://ubghyper.github.io/GameList.github.io/Super-Smash-Flash/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Movement / Crouch / Platform Drop / Up-Jump' },
      { key: 'O', action: 'Standard Attack / Rapid Jab / Tilt / Smash' },
      { key: 'P', action: 'Special Ability (Hadoken / Kamehameha / Spin Dash)' },
      { key: 'Spacebar', action: 'Jump / Mid-Air Recovery Double Jump' },
      { key: 'Backspace', action: 'Pause Match / View Move List' }
    ],
    instructions: [
      'Select your fighter from a roster including Mario, Sonic, Goku, Link, Kirby, Mega Man, and Fox.',
      'Land combos to raise rival damage meters — the higher their %, the farther they fly when hit.',
      'Deliver a charged smash attack to launch adversaries past screen blast zones for decisive KOs.'
    ],
    tips: [
      'Combine Up + Special (W + P) as your primary vertical recovery move to return to the platform.',
      'Use defensive shields and directional rolling dodges to bypass aggressive smash attacks.'
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
    longDescription: 'Trapped on an oceanic raft with nothing but a salvage hook made of plastic, you awaken stranded on an endless azure sea. Scavenge floating barrels and timber planks, craft spears and desalination filters, cook fresh catches, construct multi-tier floating cathedrals, and ward off the man-eating shark circling your hull.',
    src: 'https://ubghyper.github.io/GameList.github.io/Raft/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move / Swim / Navigate' },
      { key: 'Mouse Left Click', action: 'Cast Hook / Strike Shark / Place Structure' },
      { key: 'Mouse Right Click', action: 'Cancel Hook / Rotate Structural Piece' },
      { key: 'Spacebar', action: 'Jump / Surface from Dive' },
      { key: 'E', action: 'Interact / Pick Up Floating Debris' },
      { key: 'Tab', action: 'Open Blueprint Crafting & Inventory' },
      { key: '1 - 8', action: 'Hotbar Item Selection' },
      { key: 'Esc', action: 'Pause / Options Menu' }
    ],
    instructions: [
      'Click within the viewport to lock the pointer into the 3D marine environment.',
      'Aim and charge your salvage hook toward floating barrels, planks, and palm leaves.',
      'Desalinate seawater with a simple purifier to prevent dehydration, and grill captured mackerel.',
      'Craft a sturdy wooden spear to repel the shark whenever it attacks your raft perimeter.'
    ],
    tips: [
      'Install collection nets along your raft forward edge to capture drift materials automatically.',
      'Never dive into the open water when the shark fin is cutting the surface nearby.',
      'Reinforce boundary foundation tiles with iron plating to render them immune to shark attacks.'
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
    longDescription: 'Level Devil looks like a clean, innocent geometric platformer, but every level has a wicked mind of its own. Dash toward the golden exit door while surviving disappearing ground, flying gravity-defying spikes, teleporting hazards, moving doors, and inverted button controls designed to challenge your reflexes.',
    src: 'https://ubghyper.github.io/GameList.github.io/Level-Devil/',
    aspectRatio: '16/9',
    controls: [
      { key: 'A / D or Left / Right', action: 'Move Character Left / Right' },
      { key: 'W / Spacebar / Up', action: 'Jump / Leap Obstacles' },
      { key: 'R', action: 'Instant Restart Chamber' },
      { key: 'Esc', action: 'Level Select / Main Menu' }
    ],
    instructions: [
      'Navigate your character to the glowing golden doorway at the opposite side of each chamber.',
      'Anticipate treacherous tricks: floor tiles evaporate, ceilings drop, and goals actively flee.',
      'Learn from every trap and uncover the deceptive paths to outsmart the demonic game design.'
    ],
    tips: [
      'Do not sprint blindly; pause for a microsecond before stepping onto suspicious platform blocks.',
      'Pay close attention on inverted levels where the left key commands rightward movement.'
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
    longDescription: 'Clash of Crowns is an intense tactical kingdom battle simulation. Construct fortified defenses, train swordsmen and archers, deploy devastating siege catapults, and command battlefield tactics to claim royal crowns and dominate the medieval realm.',
    src: 'https://play.galatrix.com/play/clash-of-crowns?autologin=1',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select Units, Deploy Troops & Cast Spells' },
      { key: 'Click & Drag', action: 'Pan Battlefield Camera' },
      { key: '1 - 5', action: 'Quick-Deploy Unit Hotkeys' }
    ],
    instructions: [
      'Deploy units in strategic lanes to counter enemy frontline formations.',
      'Protect your royal crown tower while directing vanguard forces to breach the enemy keep.',
      'Harness magical elixir to cast fireballs and freeze spells at critical moments.'
    ],
    tips: [
      'Deploy tank units first to soak up archer fire while high-damage rangers advance behind them.',
      'Save area-of-effect spells for clustered swarms of enemy infantry.'
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
