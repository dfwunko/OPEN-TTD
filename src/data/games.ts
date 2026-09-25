import { Game } from '../types/game';

export const GAMES_CATALOG: Game[] = [
  {
    id: 'polytrack',
    title: 'PolyTrack',
    category: 'driving',
    description: 'Fast-paced low-poly racing game inspired by TrackMania featuring high-speed loops, banked turns, custom track builder, and asynchronous ghost time trials.',
    longDescription: "PolyTrack is a minimalist 3D racing phenomenon. Pilot customizable low-poly sports cars across death-defying roller-coaster tracks featuring vertical loops, wall-rides, and mountain-clearing jumps where every millisecond counts. Build your own tracks in the integrated 3D level editor, share track codes with friends, and challenge global leaderboard ghosts.",
    src: 'https://games.crazygames.com/en_US/polytrack/index.html?isFirstSession=true&czyExpClientSuppressFirstDayPreroll_CZY_20818=enabled&czyExpClientAdsDummyAA=disabled&czyExpClientGamera=disabled&czyExpClientVastVideoCache=local_cache_prebid_url&czyExpClientAdsConsentGate=disabled&czyExpClientLiveIntent=enabled&czyExpClientGooglePPID=enabled&czyExpClientContentSignals=disabled&czyExpDisableInterstitialsFirst12h_CZY_18471=disabled&czyExpGamePageReco_CZY_19213=enabled&czyExpNewSaveProgressNotice_CZY_19240=disabled&czyExpClientSideLogging_CZY_19610=enabled&czyExpGameThumbHover_CZY_19482=enabled&czyExpProgressSaveNudge_CZY_18842=enabled&czyExpMetaPixel=enabled&czyExpModelGamePage=knn_v3&v=2.10',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Accelerate, Steer, Brake & Reverse' },
      { key: 'Spacebar / Shift', action: 'Handbrake / Drift Initiation' },
      { key: 'R', action: 'Instant Restart Lap / Time Trial' },
      { key: 'Left Click', action: 'Place Track Pieces & Obstacles (Editor)' },
      { key: 'Right Click + Drag', action: 'Orbit 3D Camera / Inspect Layout' },
      { key: 'Esc', action: 'Pause Menu / Return to Track Select' }
    ],
    instructions: [
      'Master 17+ official tracks across Summer, Winter, and Desert biomes, or load community circuit codes.',
      'Race against the clock to set record lap times, utilizing banked turns, turbo pads, and jump arcs.',
      'Challenge leaderboard rivals asynchronously by loading verified driver ghost cars directly into your run.',
      'Construct custom courses with the 3D level editor and export shareable track codes.'
    ],
    tips: [
      'Tap the handbrake lightly right before corner entry to initiate a smooth drift without bleeding momentum.',
      'Hit R instantly if you miss an apex or spin out to restart your time trial with zero downtime.',
      'Watch opponent ghost lines to discover cutting-edge braking points and shortcut vectors.'
    ],
    plays: 384000,
    rating: 4.98,
    ratingCount: 16200,
    badge: 'Trending #1',
    iconName: 'Car',
    accentColor: '#06b6d4',
    releaseYear: 2022,
    thumbnailUrl: '/images/polytrack.jpg'
  },
  {
    id: 'basketbros',
    title: 'BasketBros',
    category: 'action',
    description: 'Fast-paced 1v1 cartoon basketball action: dunk over defenders, hit step-back threes, and unlock custom ballers.',
    longDescription: 'BasketBros brings high-energy 1v1 arcade basketball to your browser. Choose your favorite baller, execute jaw-dropping slam dunks, shoot clutch three-pointers, steal the ball from opponents, and unlock wild costumes, hairstyles, and accessories in solo or head-to-head competition.',
    src: 'https://assets.shuttlemath.com/basketbros-io/',
    iframeTitle: 'Education Game',
    iframeStyle: {
      borderRadius: '0px 0px 10px 10px',
      transformOrigin: 'left top',
      transform: 'scale(0.85)',
      width: '117.647%',
      height: '117.647%'
    },
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Jump / Position' },
      { key: 'Spacebar / L', action: 'Shoot / Dunk / Steal' }
    ],
    instructions: [
      'Dribble across the court and time your jump to unleash an unstoppable high-flying slam dunk.',
      'Contest outside jump shots and snatch critical rebounds off the backboard.',
      'Win consecutive tournament matches to unlock new characters with upgraded dunk and speed attributes.'
    ],
    tips: [
      'Release your shot right at the apex of your jump for the highest shooting accuracy percentage.',
      'Use quick directional cuts to break defender ankles and create open driving lanes.'
    ],
    plays: 356000,
    rating: 4.97,
    ratingCount: 12400,
    badge: '1v1 Arcade',
    iconName: 'Flame',
    accentColor: '#f97316',
    releaseYear: 2024,
    thumbnailUrl: '/images/basketbros.jpg'
  },
  {
    id: 'retro-bowl-college',
    title: 'Retro Bowl College',
    category: 'retro',
    description: 'Manage your collegiate football dynasty: recruit star athletes, call clutch offensive plays, and win national championships.',
    longDescription: 'Retro Bowl College brings the acclaimed retro pixel-art football management simulation to the college gridiron. Manage scholarships, scout high school prospects, balance team GPA and morale, and take direct control on the field throwing bullet passes, evading linebackers, and scoring game-winning touchdowns.',
    src: 'https://retrobowl26.college/game/rb-college/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Click / Drag', action: 'Aim & Throw Bullet / Lob Passes' },
      { key: 'WASD / Arrow Keys', action: 'Sidestep / Evade Tackles / Juke' },
      { key: 'Spacebar', action: 'Snap Ball / Confirm Play / Advance' }
    ],
    instructions: [
      'Click and drag backward from your quarterback to set pass trajectory, then release to fire a pass to your wideout.',
      'Swipe or steer your ball carrier with WASD or mouse to sidestep oncoming defensive backs and dive for extra yardage.',
      'Recruit 5-star student athletes during the offseason and balance training facility upgrades with academic eligibility.'
    ],
    tips: [
      'Lead your wide receivers into open space rather than throwing directly at their current defender-covered position.',
      'Dive forward on 3rd down to secure crucial first-down conversions before stepping out of bounds.'
    ],
    plays: 430000,
    rating: 4.99,
    ratingCount: 19500,
    badge: 'College Dynasty',
    iconName: 'Trophy',
    accentColor: '#e11d48',
    releaseYear: 2024,
    thumbnailUrl: '/images/retrobowl.jpg'
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
      'Press F11 or use the Fullscreen toggle for an edge-to-edge, ultra-smooth desktop experience.',
      'Always carry a water bucket on your hotbar to negate high fall damage and neutralize lava pools.',
      'Export and backup your singleplayer world files from the world selection screen to preserve your builds.'
    ],
    plays: 412000,
    rating: 4.99,
    ratingCount: 18400,
    badge: 'Classic Voxel',
    iconName: 'Pickaxe',
    accentColor: '#22c55e',
    releaseYear: 2024,
    thumbnailUrl: '/images/minecraft.jpg'
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
    thumbnailUrl: '/images/raft.jpg'
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
    thumbnailUrl: '/images/smash.jpg'
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
    thumbnailUrl: '/images/leveldevil.jpg'
  },
  {
    id: 'idle-mining-empire',
    title: 'Idle Mining Empire',
    category: 'arcade',
    description: 'Deep subterranean tycoon management: dig shafts, operate industrial elevators, automate logistics, and unearth precious gems.',
    longDescription: 'Idle Mining Empire is an engrossing incremental tycoon simulation. Start with a single pickaxe miner in a shallow shaft, extract coal and gold, and expand into an automated underground enterprise. Hire elevator engineers to haul ore to the surface, dispatch logistics handlers, and automate shafts to amass fortune even while idle.',
    src: 'https://ubghyper.github.io/GameList.github.io/Idle-Mining-Empire/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Click to Dig / Collect Ore / Upgrade Systems' },
      { key: 'Scroll Wheel', action: 'Pan Up & Down Deep Subterranean Shafts' },
      { key: 'Spacebar', action: 'Fast Forward / Instant Collection Pulse' }
    ],
    instructions: [
      'Direct your miners to excavate mineral deposits from subterranean levels.',
      'Click the elevator operator to hoist buckets of extracted ore to ground-level processing.',
      'Command surface warehouse personnel to deliver cargo to the treasury for instant revenue.',
      'Hire departmental managers to automate every level so profits accumulate autonomously.'
    ],
    tips: [
      'Balance elevator lift capacity and surface warehouse throughput with mining shaft generation.',
      'Excavate deeper subterranean tiers to unlock lucrative gold veins, rubies, and diamond clusters.'
    ],
    plays: 242000,
    rating: 4.93,
    ratingCount: 6800,
    badge: 'Tycoon Tycoon',
    iconName: 'Coins',
    accentColor: '#eab308',
    releaseYear: 2024,
    thumbnailUrl: '/images/mining.jpg'
  },
  {
    id: 'basketball-legends-2020',
    title: 'Basketball Legends 2020',
    category: 'action',
    description: 'Legendary 2-player arcade basketball: unleash supersonic supershots, steal the rock, and win the championship trophy.',
    longDescription: 'Basketball Legends 2020 is the premier two-player head-to-head arcade basketball classic. Pick your iconic basketball superstar, charge up your game-changing Supershot ability, perform gravity-defying dunks, and compete in Quick Match or full Tournament brackets solo or with a friend on shared keyboard.',
    src: 'https://basketball-legends-2020.gamestores.fun/',
    iframeTitle: 'Basketball Legends game',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move, Jump & Pump Fake' },
      { key: 'B / L', action: 'Shoot / Dunk / Steal Ball' },
      { key: 'V / K', action: 'Unleash Supershot Special Ability' },
      { key: 'D + D / Right + Right', action: 'Turbo Dash Sprint' }
    ],
    instructions: [
      'Fill your Supershot gauge by scoring baskets and stealing to trigger an unblockable flaming dunk.',
      'Pump fake to force defenders into the air before pulling up for an open baseline three.',
      'Play 1v1, 2v2, or full tournament brackets in single player or 2-player local versus.'
    ],
    tips: [
      'Time your jump right as your opponent shoots to deliver an emphatic rejection swat.',
      'Double tap directional keys to sprint past defenders on fast-break opportunities.'
    ],
    plays: 512000,
    rating: 4.98,
    ratingCount: 22800,
    badge: '2-Player Versus',
    iconName: 'Trophy',
    accentColor: '#ea580c',
    releaseYear: 2020,
    thumbnailUrl: '/images/basketball_legends.jpg'
  },
  {
    id: 'golf-bit',
    title: 'Golf Bit',
    category: 'skill',
    description: 'Charming 16-bit arcade golf: master ball physics, ricochet off hazards, and sink hole-in-ones across challenging mini courses.',
    longDescription: 'Golf Bit delivers retro arcade mini-golf bliss with pixel-perfect physics and clever environmental puzzle courses. Aim your shot, gauge power and backspin, calculate bank angles off bumpers, avoid water hazards, and sink clutch putts with the lowest possible stroke count.',
    src: 'https://cloud.onlinegames.io/games/2026/construct/328/golf-bit/game.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Click + Drag', action: 'Aim Trajectory & Charge Power' },
      { key: 'Release Mouse', action: 'Strike Golf Ball' },
      { key: 'R', action: 'Reset Shot / Restart Hole' },
      { key: 'Esc', action: 'Pause Menu' }
    ],
    instructions: [
      'Click and drag backward from your golf ball to set shot angle and power gauge.',
      'Bank shots off surrounding stone bumpers to navigate tight doglegs and avoid sand traps.',
      'Sink the ball under par on each hole to earn maximum rating stars and unlock custom ball skins.'
    ],
    tips: [
      'Bank shots off cushioned barriers are often much safer than high-risk direct lines.',
      'Ease back on power when putting down steep slopes to prevent overshooting past the cup.'
    ],
    plays: 285000,
    rating: 4.96,
    ratingCount: 9400,
    badge: 'Pixel Golf',
    iconName: 'Compass',
    accentColor: '#10b981',
    releaseYear: 2024,
    thumbnailUrl: '/images/golf_bit.jpg'
  },
  {
    id: 'nova-craft',
    title: 'Nova Craft',
    category: 'retro',
    description: 'Voxel sandbox exploration: mine rare minerals, build architectural wonders, and craft survival tools in an infinite block world.',
    longDescription: 'Nova Craft invites you into an expansive 3D voxel sandbox adventure. Mine crystalline ores, craft weapons and construction blocks, explore towering mountains and caverns, and design elaborate fortresses in creative sandbox or survival mode straight in your browser.',
    src: 'https://cloud.onlinegames.io/games/2024/more2/nova-craft/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Walk, Sprint & Swim' },
      { key: 'Spacebar', action: 'Jump / Ascend Water' },
      { key: 'Mouse Left Click', action: 'Mine / Attack / Break Blocks' },
      { key: 'Mouse Right Click', action: 'Place Block / Build' },
      { key: '1 - 9', action: 'Select Hotbar Inventory Slot' },
      { key: 'E', action: 'Open Crafting & Inventory' },
      { key: 'Esc', action: 'Release Mouse Pointer Lock' }
    ],
    instructions: [
      'Click inside the game window to lock mouse cursor for fluid 3D first-person control.',
      'Harvest raw materials from terrain layers to craft refined stone, brick, and wooden structures.',
      'Build your dream castle or explore deep subterranean caverns for rare glowing ores.'
    ],
    tips: [
      'Build a sheltered base before dusk to protect against nocturnal creatures.',
      'Stack jumping blocks underneath your feet (Spacebar + Right Click) to rapidly reach high vantage points.'
    ],
    plays: 380000,
    rating: 4.97,
    ratingCount: 15300,
    badge: '3D Voxel Sandbox',
    iconName: 'Boxes',
    accentColor: '#8b5cf6',
    releaseYear: 2024,
    thumbnailUrl: '/images/nova_craft.jpg'
  },
  {
    id: 'football-king',
    title: 'Football King',
    category: 'action',
    description: 'High-energy arcade soccer: execute curling free kicks, dribble past defenders, and score championship goals.',
    longDescription: 'Football King brings exhilarating top-tier arcade football to your screen. Pick your international team, dribble past aggressive defenders, bend shots around the goalkeeper, time headers off crosses, and lift the championship cup.',
    src: 'https://www.onlinegames.io/games/2024/construct/226/football-king/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Dribble, Steer & Sprint' },
      { key: 'Mouse / Spacebar', action: 'Shoot, Pass, Tackle & Curve' }
    ],
    instructions: [
      'Dribble down the pitch and calculate shooting trajectory toward the corners of the goal.',
      'Time your sliding tackles to dispossess attacking strikers cleanly.',
      'Curve your free kicks around defensive walls to beat the keeper.'
    ],
    tips: [
      'Aim for the top corners of the net where goalkeepers have the slowest dive recovery.',
      'Pass to open wingers to stretch opponent defensive backlines.'
    ],
    plays: 340000,
    rating: 4.96,
    ratingCount: 11200,
    badge: 'Arcade Soccer',
    iconName: 'Trophy',
    accentColor: '#22c55e',
    releaseYear: 2024,
    thumbnailUrl: '/images/football_king.jpg'
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
    thumbnailUrl: '/images/clash_of_crowns.jpg'
  },
  {
    id: 'tennis-masters',
    title: 'Tennis Masters',
    category: 'action',
    description: 'Fast-paced 2-player arcade tennis: unleash super smashes, drop shots, and diving returns in solo or versus matches.',
    longDescription: 'Tennis Masters puts you center court in a wild arcade tennis tournament. Play 1v1 against challenging AI or share a keyboard with a friend in 2-player mode. Charge your power smash, collect court power-ups, and unleash devastating cross-court winners.',
    src: 'https://html5.gamedistribution.com/ab2f156d72894fd8a5dedb85b34a05e4/?gd_sdk_referrer_url=https://www.onlinegames.io/tennis-masters-2026',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move, Jump & Position' },
      { key: 'X / L', action: 'Hit, Return & Power Smash' },
      { key: 'Z / K', action: 'Super Smash / Special Shot' }
    ],
    instructions: [
      'Position your player behind the bounce and time your swing for maximum velocity.',
      'Hit floating power-up bubbles on the court to trigger mini-ball, giant racquet, or frozen court effects.',
      'Compete in Quick Match or World Tournament mode across clay, grass, and hard courts.'
    ],
    tips: [
      'Use lob shots when your rival charges the net to send the ball over their head.',
      'Time your jump at the net to intercept high bounces with an unreturnable smash.'
    ],
    plays: 460000,
    rating: 4.98,
    ratingCount: 17600,
    badge: '2-Player Sports',
    iconName: 'Zap',
    accentColor: '#06b6d4',
    releaseYear: 2024,
    thumbnailUrl: '/images/tennis_masters.jpg'
  }
];
