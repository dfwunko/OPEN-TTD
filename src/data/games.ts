import { Game } from '../types/game';

export const GAMES_CATALOG: Game[] = [
  {
    id: 'balatro',
    title: 'Balatro',
    category: 'skill',
    description: 'Poker-inspired roguelite deckbuilder: combine valid poker hands with unique Joker cards to trigger explosive scoring synergies!',
    longDescription: 'Balatro is a hypnotic poker-inspired roguelite deck builder where you play illegal poker hands, discover game-changing jokers, and trigger adrenaline-fueled combos to beat escalating blinds.',
    src: './games/balatro/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select Cards / Play Hand / Discard' }
    ],
    instructions: [
      'Select up to 5 cards to form valid poker hands (Pairs, Flushes, Straights, Full Houses, etc.).',
      'Purchase Joker cards between rounds to multiply your chip multipliers and build game-breaking synergy combos.'
    ],
    tips: [
      'Focus on upgrading specific hand types in the shop to reliably score high chips.',
      'Order your Jokers strategically: place additive mult Jokers before multiplicative mult Jokers!'
    ],
    plays: 920000,
    rating: 4.99,
    ratingCount: 41200,
    badge: 'VIRAL ROGUELITE',
    iconName: 'Sparkles',
    accentColor: '#e11d48',
    releaseYear: 2026,
    thumbnailUrl: './images/balatro.jpg'
  },
  {
    id: 'brotato',
    title: 'Brotato',
    category: 'action',
    description: 'Top-down arena roguelite shooter: play a potato wielding up to 6 weapons at once to survive relentless alien waves!',
    longDescription: 'Brotato is a top-down arena shooter roguelite where you play a potato wielding up to 6 weapons at once to fight off waves of aliens. Choose from a variety of traits and items to create unique builds and survive until help arrives.',
    src: './games/brotato/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move Brotato' },
      { key: 'Mouse Left Click', action: 'Aim & Manual Fire (Auto-fire enabled by default)' }
    ],
    instructions: [
      'Navigate Brotato around the arena while weapons auto-aim and fire at approaching enemies.',
      'Collect materials dropped by fallen aliens to buy weapons and upgrade stats in the shop between waves.'
    ],
    tips: [
      'Synergize weapon sets (e.g., 6 Primitive or 6 Elemental weapons) to unlock massive set bonuses.',
      'Invest early in Life Steal or HP Regeneration for sustainable wave survival.'
    ],
    plays: 880000,
    rating: 4.99,
    ratingCount: 38500,
    badge: 'SURVIVOR ARENA',
    iconName: 'Zap',
    accentColor: '#eab308',
    releaseYear: 2026,
    thumbnailUrl: './images/brotato.jpg'
  },
  {
    id: 'thats-not-my-neighbor',
    title: "That's Not My Neighbor",
    category: 'puzzle',
    description: 'Psychological doorman investigation game: inspect IDs, verify tenant permits, and catch shapeshifting doppelgangers!',
    longDescription: 'That\'s Not My Neighbor is a tense doorman investigation game set in 1955. As the building\'s doorman, verify apartment tenants, examine entry authorization papers, check for physical anomalies, and report malicious doppelgangers to the D.D.D. defense department.',
    src: './games/thats-not-my-neighbor/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Interact with Door, Intercom, Papers & Buttons' }
    ],
    instructions: [
      'Examine the entry request papers, cross-reference the tenant list, and call apartment units to verify residents.',
      'If details match, press the green button to open the door. If anomalies or doppelgangers are detected, sound the alarm!'
    ],
    tips: [
      'Carefully inspect facial features, clothes, ID numbers, and expiration dates for tiny subtle discrepancies.',
      'Always call the tenant\'s apartment over the intercom to check if someone else answers!'
    ],
    plays: 790000,
    rating: 4.98,
    ratingCount: 31000,
    badge: 'DOPPELGANGER THRILLER',
    iconName: 'Shield',
    accentColor: '#dc2626',
    releaseYear: 2026,
    thumbnailUrl: './images/neighbor.jpg'
  },
  {
    id: 'btd4',
    title: 'Bloons TD 4',
    category: 'arcade',
    description: 'Classic tower defense: place monkey towers, upgrade dart launchers, deploy super monkeys, and pop every bloon wave!',
    longDescription: 'Bloons TD 4 is the legendary tower defense strategy game. Position dart monkeys, tack shooters, mortar cannons, and super monkeys along winding tracks to defend against red, blue, ceramic, and MOAB bloons.',
    src: './games/btd4/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select / Place / Upgrade Towers' },
      { key: 'Spacebar', action: 'Start Wave / Fast Forward' }
    ],
    instructions: [
      'Place defensive towers along the path to pop invading bloons before they reach the end.',
      'Earn cash from popped bloons to upgrade existing towers and unlock special monkey abilities.'
    ],
    tips: [
      'Place Tack Shooters at tight track bends for maximum coverage.',
      'Build Camo-detecting towers before wave 24 to handle Camo Bloons.'
    ],
    plays: 650000,
    rating: 4.97,
    ratingCount: 22400,
    badge: 'CLASSIC TOWER DEFENSE',
    iconName: 'Flame',
    accentColor: '#3b82f6',
    releaseYear: 2024,
    thumbnailUrl: './images/btd4.jpg'
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    category: 'adventure',
    description: 'Farm life RPG: cultivate crops, raise animals, explore caves, fish, and build relationships in Pelican Town!',
    longDescription: 'Stardew Valley is an acclaimed open-ended country life RPG. Inherit your grandfather’s old farm plot, master farming, forage seasonal goods, mine valuable ores, defeat cave monsters, and revitalize the community center.',
    src: './games/stardew-valley/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move Character' },
      { key: 'Left Click / C', action: 'Use Tool / Action' },
      { key: 'Right Click / X', action: 'Interact / Check / Eat' },
      { key: 'Escape / E / Tab', action: 'Inventory / Menu' }
    ],
    instructions: [
      'Clear your farm overgrown with weeds and rocks, till the soil, plant seeds, and water them daily.',
      'Forage around Pelican Town and visit Pierre’s general store to purchase seasonal seeds and supplies.'
    ],
    tips: [
      'Upgrade your watering can and pickaxe at the Blacksmith early for massive energy efficiency.',
      'Check the daily TV weather forecast and luck channel before heading into the mines!'
    ],
    plays: 980000,
    rating: 4.99,
    ratingCount: 52000,
    badge: 'COMMUNITY FAVORITE',
    iconName: 'Sparkles',
    accentColor: '#10b981',
    releaseYear: 2026,
    thumbnailUrl: './images/stardew_valley.jpg'
  },
  {
    id: 'dice-a-million',
    title: 'Dice a Million',
    category: 'skill',
    description: 'Addictive dice-rolling roguelike: roll combinations, purchase high-stakes modifiers, and score a million points!',
    longDescription: 'Dice a Million is a high-tempo dice building roguelite where every roll brings strategic decisions. Stack multiplier bonuses, trigger chain reactions, and push your luck to reach astronomical scores.',
    src: './games/dice-a-million/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Roll / Select Dice / Buy Upgrades' },
      { key: 'Spacebar', action: 'Quick Roll' }
    ],
    instructions: [
      'Roll dice to generate base scores and trigger matching dice combinations.',
      'Buy modifier cards and upgrade dice faces between rounds to scale your scoring multiplier.'
    ],
    tips: [
      'Prioritize global multipliers over flat point additions in later rounds.',
      'Keep your dice pool focused on synergistic face values.'
    ],
    plays: 520000,
    rating: 4.96,
    ratingCount: 18400,
    badge: 'NEW ROGUELIKE',
    iconName: 'Zap',
    accentColor: '#f59e0b',
    releaseYear: 2026,
    thumbnailUrl: './images/dice_a_million.jpg'
  },
  {
    id: 'btd5',
    title: 'Bloons TD 5',
    category: 'arcade',
    description: 'Epic tower defense: build ninja monkeys, super monkeys, banana farms, and activate special agent abilities!',
    longDescription: 'Bloons TD 5 delivers unmatched tower defense action. Deploy 21 powerful towers with activated abilities and 2 upgrade paths, pop camo and regrow bloons, and conquer multiple game modes.',
    src: './games/btd5/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select / Place / Upgrade Towers' },
      { key: 'Spacebar', action: 'Start Wave / Fast Forward' },
      { key: 'Number Keys (1-9)', action: 'Tower Quick-Select' }
    ],
    instructions: [
      'Position monkey defense towers along the track to stop invading bloons.',
      'Upgrade your towers along specialized paths to gain active abilities and devastating popping power.'
    ],
    tips: [
      'Pair Ninja Monkeys with 4-2 Monkey Apprentices for early camo and lead popping coverage.',
      'Build Banana Farms early to fund powerful Super Monkeys in late rounds.'
    ],
    plays: 890000,
    rating: 4.98,
    ratingCount: 39500,
    badge: 'LEGENDARY TOWER DEFENSE',
    iconName: 'Flame',
    accentColor: '#3b82f6',
    releaseYear: 2024,
    thumbnailUrl: './images/btd5.jpg'
  },
  {
    id: 'binding-of-isaac',
    title: 'The Binding of Isaac: Wrath of the Lamb',
    category: 'action',
    description: 'Iconic dungeon crawler roguelike: shoot tears, uncover bizarre passive items, and battle through basement depths!',
    longDescription: 'The Binding of Isaac: Wrath of the Lamb is a legendary randomly generated action RPG shooter with heavy roguelike elements. Follow Isaac on his journey to escape the basement, finding strange treasures that change his form and grant superhuman abilities.',
    src: './games/binding-of-isaac/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD', action: 'Move Isaac' },
      { key: 'Arrow Keys', action: 'Shoot Tears (Up/Down/Left/Right)' },
      { key: 'Spacebar', action: 'Use Active Item' },
      { key: 'E / Shift', action: 'Drop Bomb' },
      { key: 'Q', action: 'Use Card / Pill' }
    ],
    instructions: [
      'Navigate through procedurally generated basement rooms while dodging enemies and hazards.',
      'Collect coins, bombs, keys, and item pedestals from Treasure and Boss rooms to empower your tears.'
    ],
    tips: [
      'Blow up tinted rocks with bombs to find soul hearts and treasure chests.',
      'Learn enemy movement and tear patterns to preserve red heart health for Devil Deals!'
    ],
    plays: 870000,
    rating: 4.99,
    ratingCount: 44100,
    badge: 'ROGUELIKE CLASSIC',
    iconName: 'Skull',
    accentColor: '#e11d48',
    releaseYear: 2026,
    thumbnailUrl: './images/binding_of_isaac.jpg'
  },
  {
    id: 'plague-inc',
    title: 'Plague Inc',
    category: 'strategy',
    description: 'Global strategy simulation: evolve your custom pathogen, adapt to global research, and outmaneuver humanity’s defenses!',
    longDescription: 'Plague Inc is a gripping simulation game where you guide an evolving pathogen through complex global dynamics. Upgrade transmission vectors, mutate lethal symptoms, and adapt to worldwide countermeasures.',
    src: './games/plague-inc/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Pop DNA Bubbles / Select Countries / Mutate Traits' },
      { key: 'Spacebar', action: 'Pause / Resume Simulation' },
      { key: '1 / 2 / 3', action: 'Simulation Speed (Normal, Fast, Super Fast)' }
    ],
    instructions: [
      'Select your starting country and evolve transmission traits (air, water, bird, insect) to spread.',
      'Pop red and orange DNA bubbles on the world map to earn mutation DNA points.',
      'Evolve symptom branches and drug resistances as world governments research a cure.'
    ],
    tips: [
      'Maintain high infectivity and low severity in early stages so countries don’t close airports and harbors.',
      'Invest in cold and heat resistance to ensure rapid transmission across polar and tropical zones.'
    ],
    plays: 740000,
    rating: 4.97,
    ratingCount: 29800,
    badge: 'GLOBAL STRATEGY',
    iconName: 'Shield',
    accentColor: '#10b981',
    releaseYear: 2026,
    thumbnailUrl: './images/plague_inc.jpg'
  },
  {
    id: 'the-deadseat',
    title: 'The Deadseat',
    category: 'action',
    description: 'Atmospheric psychological horror game: uncover unsettling secrets in an eerie high-stakes survival experience.',
    longDescription: 'The Deadseat is an intense psychological 3D horror mystery powered by the Godot WebAssembly engine. Navigate tense environments, manage crucial decisions under pressure, and survive the unknown.',
    src: './games/the-deadseat/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Look' },
      { key: 'Mouse Left Click', action: 'Interact / Inspect' },
      { key: 'Spacebar', action: 'Action / Select' }
    ],
    instructions: [
      'Observe clues in your surroundings and interact with key objects.',
      'Maintain calm and make calculated choices to avoid dangerous hazards.'
    ],
    tips: [
      'Pay close attention to audio cues and subtle visual anomalies.',
      'Inspect items carefully for hidden codes and passwords.'
    ],
    plays: 460000,
    rating: 4.97,
    ratingCount: 16500,
    badge: 'GODOT 3D HORROR',
    iconName: 'Skull',
    accentColor: '#f43f5e',
    releaseYear: 2026,
    thumbnailUrl: './images/the_deadseat.jpg'
  },
  {
    id: 'clover-pit',
    title: 'CloverPit',
    category: 'arcade',
    description: 'High-octane casino dungeon crawler: spin neon reels, unlock jackpot power-ups, and beat escalating pit bosses!',
    longDescription: 'CloverPit is an adrenaline-fueled casino roguelite built on the Unity engine. Spin mystical slots, match four-leaf clovers, trigger explosive coin bursts, and survive ruthless odds.',
    src: './games/clover-pit/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Spin / Bet / Select Upgrades' },
      { key: 'Spacebar', action: 'Quick Spin / Confirm' }
    ],
    instructions: [
      'Pull the lever to spin the clover slot reels and earn chips.',
      'Purchase artifact upgrades and lucky charm items between rounds to maximize scoring multipliers.'
    ],
    tips: [
      'Stack clover multipliers early to afford high-tier jackpot charms.',
      'Balance risk and reward when taking high-stakes pit wagers.'
    ],
    plays: 580000,
    rating: 4.98,
    ratingCount: 22100,
    badge: 'CASINO ROGUELITE',
    iconName: 'Sparkles',
    accentColor: '#10b981',
    releaseYear: 2026,
    thumbnailUrl: './images/clover_pit.jpg'
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    category: 'puzzle',
    description: 'Chaotic tech support simulator: handle bizarre caller inquiries, troubleshoot tricky computer bugs, and meet daily quotas!',
    longDescription: 'Customer Support is a witty and humorous simulation game where you manage a frantic IT helpdesk hotline. Answer incoming customer calls, diagnose peculiar issues, search support manuals, and keep customer satisfaction high.',
    src: './games/customer-support/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Answer Phone / Click UI / Select Solutions' },
      { key: 'Keyboard', action: 'Type Support Commands' }
    ],
    instructions: [
      'Answer ringing phones promptly to avoid customer frustration.',
      'Reference the employee handbook to diagnose and provide accurate troubleshooting steps.'
    ],
    tips: [
      'Read caller problem statements thoroughly to spot misleading details.',
      'Handle multiple tickets quickly to earn customer satisfaction bonus stars.'
    ],
    plays: 490000,
    rating: 4.96,
    ratingCount: 17800,
    badge: 'SIMULATION',
    iconName: 'Zap',
    accentColor: '#38bdf8',
    releaseYear: 2026,
    thumbnailUrl: './images/cyber_survivor.jpg'
  },
  {
    id: 'terraria',
    title: 'Terraria (Terrarium)',
    category: 'adventure',
    description: 'Iconic 2D sandbox adventure: dig, fight, explore, and build in an infinite procedurally generated world!',
    longDescription: 'Terrarium brings the legendary 2D action-adventure sandbox game to your browser via WebAssembly. Delve deep into cavernous subterranean realms, battle ferocious bosses, craft weapons and armor, and build bustling NPC villages.',
    src: './games/terraria/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Jump' },
      { key: 'Mouse Left Click', action: 'Mine / Attack / Place' },
      { key: 'Mouse Right Click', action: 'Interact / Open Chests' },
      { key: 'Esc / E', action: 'Inventory & Crafting' }
    ],
    instructions: [
      'Chop trees to gather wood, construct a shelter with walls and a door, and craft torches for light.',
      'Mine underground for copper, iron, silver, and gold to forge stronger tools and armor.'
    ],
    tips: [
      'Build suitable houses with a table, chair, and light source to attract merchant and nurse NPCs.',
      'Craft a Grappling Hook as soon as you find hooks from skeletons or gems underground!'
    ],
    plays: 1250000,
    rating: 4.99,
    ratingCount: 68400,
    badge: 'SANDBOX LEGEND',
    iconName: 'Flame',
    accentColor: '#22c55e',
    releaseYear: 2026,
    thumbnailUrl: './images/terraria.jpg'
  },
  {
    id: 'tiletopia',
    title: 'Tiletopia',
    category: 'puzzle',
    description: 'Vibrant 3D tile-matching puzzle adventure: connect elemental runes, trigger cascade combos, and solve brain-teasing boards!',
    longDescription: 'Tiletopia is a polished 3D puzzle match game built on WebGL. Swap, match, and chain vibrant rune tiles across increasingly intricate puzzle grids to clear objectives and earn 3-star ratings.',
    src: './games/tiletopia/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click / Drag', action: 'Select & Swap Tiles' }
    ],
    instructions: [
      'Match 3 or more identical tiles in a row or column to clear them from the board.',
      'Create 4-tile lines or T-shapes to form explosive power-up runes.'
    ],
    tips: [
      'Plan moves from the bottom of the board to trigger natural chain reaction cascades.',
      'Combine two adjacent special power tiles for screen-clearing combos.'
    ],
    plays: 510000,
    rating: 4.95,
    ratingCount: 15400,
    badge: 'MATCH 3 PUZZLE',
    iconName: 'Sparkles',
    accentColor: '#a855f7',
    releaseYear: 2026,
    thumbnailUrl: './images/clash_of_crowns.jpg'
  },
  {
    id: 'roulette-hero',
    title: 'Roulette Hero',
    category: 'action',
    description: 'Tense tactical roulette roguelite: spin the chamber, play modifier cards, and outsmart shadowy opponents!',
    longDescription: 'Roulette Hero is a pulse-pounding strategy roguelite from Free Lives. Confront cunning adversaries across high-stakes duels, manipulate probabilities with inventory items, and survive to become the ultimate champion.',
    src: './games/roulette-hero/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Select Target / Use Items / Spin Chamber' }
    ],
    instructions: [
      'Track live vs blank rounds remaining in the chamber before taking your shot.',
      'Deploy tactical items like magnifying glasses, handcuffs, and saws to tilt the odds in your favor.'
    ],
    tips: [
      'Use the magnifying glass when the chamber state is 50/50 to guarantee safe shots.',
      'Shoot yourself with a known blank to instantly gain an extra turn!'
    ],
    plays: 670000,
    rating: 4.98,
    ratingCount: 28900,
    badge: 'TACTICAL DUEL',
    iconName: 'Shield',
    accentColor: '#ef4444',
    releaseYear: 2026,
    thumbnailUrl: './images/scarwrit.png'
  },
  {
    id: 'peak',
    title: 'PEAK',
    category: 'skill',
    description: 'Physics-based 3D mountaineering expedition: grip ledges, balance stamina, and summit towering alpine peaks!',
    longDescription: 'PEAK is a gripping low-poly climbing adventure developed by Aggro Crab & Landfall. Scale dizzying cliffs, plan handholds, manage stamina depletion, and reach the highest summit against all odds.',
    src: './games/peak/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Steer Climber' },
      { key: 'Mouse Left / Right Click', action: 'Left & Right Hand Grip' },
      { key: 'Spacebar', action: 'Jump / Dynamic Reach' },
      { key: 'Shift', action: 'Chalk Hands / Rest Stamina' }
    ],
    instructions: [
      'Reach and alternate hand grips between safe rock ledges to ascend the cliff face.',
      'Keep an eye on your stamina meter and rest on flat footholds before tackling difficult overhangs.'
    ],
    tips: [
      'Always secure at least one firm handhold before reaching for distant grips.',
      'Use momentum swings on dyno jumps to bypass sheer vertical rock faces.'
    ],
    plays: 810000,
    rating: 4.99,
    ratingCount: 37200,
    badge: '3D CLIMBING',
    iconName: 'Trophy',
    accentColor: '#84cc16',
    releaseYear: 2026,
    thumbnailUrl: './images/peak.jpg'
  },
  {
    id: 'little-alchemy-2',
    title: 'Little Alchemy 2',
    category: 'puzzle',
    description: 'Infinite element discovery: combine Air, Earth, Fire, and Water to craft over 700 items, creatures, and cosmic wonders!',
    longDescription: 'Little Alchemy 2 is the beloved crafting game where you start with the four basic elements and combine them to create everything from dinosaurs and spaceships to philosophical concepts and galaxies.',
    src: './games/little-alchemy-2/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Drag & Drop', action: 'Combine Elements on Workspace' },
      { key: 'Double Click', action: 'Duplicate Element' },
      { key: 'Search Bar', action: 'Filter Discovered Elements' }
    ],
    instructions: [
      'Drag elements from the right sidebar onto the central workspace and drop them on top of each other to discover new items.',
      'Tap the broom icon to quickly clean up your workspace.'
    ],
    tips: [
      'Think conceptually: Fire + Water creates Steam, while Earth + Fire makes Lava.',
      'Check the encyclopedia hints when you get stuck on advanced recipe tiers.'
    ],
    plays: 940000,
    rating: 4.99,
    ratingCount: 46100,
    badge: 'CRAFTING CLASSIC',
    iconName: 'Sparkles',
    accentColor: '#faa620',
    releaseYear: 2026,
    thumbnailUrl: './images/little_alchemy_2.jpg'
  },
  {
    id: 'pixel-hoops',
    title: 'PixelHoops',
    category: 'arcade',
    description: 'Retro arcade basketball: campaign mode, shootaround, custom player builds, and 1v1 action with classic pixel art aesthetics.',
    longDescription: 'PixelHoops is a retro arcade basketball game featuring campaign mode, shootaround practice, customizable player builds, glossary, and smooth arcade hoops action.',
    src: './games/pixelhoops/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move / Dribble' },
      { key: 'J', action: 'Skill Move / Crossover' },
      { key: 'K', action: 'Shoot / Jump Shot' },
      { key: 'H', action: 'Post Up' }
    ],
    instructions: [
      'Use WASD or Arrow Keys to navigate the court.',
      'Press K to shoot and time your green release for perfect swishes.',
      'Use J for dribble moves and ankle breakers.'
    ],
    tips: [
      'Master green releases for maximum shooting accuracy.',
      'Use skill moves to shake defenders before pulling up for jumpers.'
    ],
    plays: 720000,
    rating: 4.99,
    ratingCount: 34100,
    badge: 'New Retro Arcade',
    iconName: 'Trophy',
    accentColor: '#f5a623',
    releaseYear: 2026,
    thumbnailUrl: './images/pixelhoops.jpg'
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
    id: 'kart-bros',
    title: 'Kart Bros',
    category: 'driving',
    description: 'Chaotic 3D kart racing: drift around winding tracks, grab item boxes, fire turbo boosts, and out-race rival bros to the finish line!',
    longDescription: 'Kart Bros is a fast-paced 3D kart racing showdown in the spirit of classic party racers. Master drift boosts around hairpin turns, snatch item boxes for speed-ups and projectiles, watch the live minimap, and battle three rival racers across full 3D circuits rendered in real time.',
    src: './games/kart/index.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'W / Up Arrow', action: 'Accelerate' },
      { key: 'S / Down Arrow', action: 'Brake / Reverse' },
      { key: 'A / D or Left / Right Arrows', action: 'Steer Kart' },
      { key: 'Shift / Spacebar', action: 'Drift (hold for drift boosts)' },
      { key: 'E / Ctrl', action: 'Use Item' }
    ],
    instructions: [
      'Accelerate into the first corner and start drifting early — chain drifts to charge your boost meter.',
      'Drive through floating item boxes to grab power-ups, then press E to fire them at racers ahead of you.'
    ],
    tips: [
      'Release a drift on a straightaway for a free burst of speed.',
      'Watch the minimap to block rival karts attempting to overtake on the inside line!'
    ],
    plays: 760000,
    rating: 4.98,
    ratingCount: 26400,
    badge: '3D KART RACING',
    iconName: 'Trophy',
    accentColor: '#f97316',
    releaseYear: 2026,
    thumbnailUrl: './images/kart.jpg'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'retro',
    description: 'Beloved retro pixel football manager: call the plays, throw touchdown passes, and build a championship dynasty!',
    longDescription: 'Retro Bowl is the smash-hit pixel-art American football simulator. Quarterback your team down the field with satisfying flick passes, manage rosters, coaching staff, and fan morale, and take your franchise all the way to the Retro Bowl championship.',
    src: 'https://ubghyper.github.io/GameList.github.io/Retro-Bowl/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse / Touch Drag', action: 'Aim & Throw Passes' },
      { key: 'Mouse Left Click', action: 'Select Plays, Roster & Staff Management' },
      { key: 'Keyboard', action: 'Navigate Team Menus' }
    ],
    instructions: [
      'Drag and release to throw passes to your receivers — lead them toward open space.',
      'Between games, spend coaching credits to re-sign stars, upgrade facilities, and keep fan expectations high.'
    ],
    tips: [
      'Throw short, safe passes on 3rd down rather than forcing deep shots.',
      'A happy roster wins more games — keep player morale above 80% before the playoffs!'
    ],
    plays: 1120000,
    rating: 4.99,
    ratingCount: 58200,
    badge: 'PICN POCKET CLASSIC',
    iconName: 'Trophy',
    accentColor: '#22c55e',
    releaseYear: 2021,
    thumbnailUrl: './images/retrobowl.jpg'
  },
  {
    id: 'basketball-legends-2020',
    title: 'Basketball Legends 2020',
    category: 'arcade',
    description: 'Arcade hoops superstar showdown: play as basketball legends, throw down mega dunks, and fire off special super shots!',
    longDescription: 'Basketball Legends 2020 is the classic 1v1 (or 2v2) arcade basketball game featuring larger-than-life legend players. Cross over your defender, rise for emphatic dunks, block shots into the stands, and unleash screen-shaking super shots to swing the game.',
    src: 'https://ubghyper.github.io/GameList.github.io/Basketball-Legends-2020/',
    aspectRatio: '16/9',
    controls: [
      { key: 'WASD / Arrow Keys', action: 'Move Player' },
      { key: 'B / L', action: 'Shoot / Attack / Steal' },
      { key: 'S / Down Arrow', action: 'Pump Fake / Block (Defense)' },
      { key: 'V / K', action: 'Super Shot (when meter is full)' }
    ],
    instructions: [
      'Out-position your rival and release your shot at the top of the jump for a perfect release.',
      'Fill the super shot meter with good play, then unleash it for an unstoppable scoring burst.'
    ],
    tips: [
      'Pump fake to bait defenders into the air, then drive past them for an easy dunk.',
      'On defense, time your jump blocks — steals are safest right after a pump fake.'
    ],
    plays: 690000,
    rating: 4.97,
    ratingCount: 25100,
    badge: '2-PLAYER HOOPS',
    iconName: 'Trophy',
    accentColor: '#f97316',
    releaseYear: 2020,
    thumbnailUrl: './images/basketball_legends.jpg'
  },
  {
    id: 'football-king',
    title: 'Football King',
    category: 'arcade',
    description: 'Local 2-player soccer mayhem: pick your player and flag, unleash super shots every 5 seconds, and win the World Tournament!',
    longDescription: 'Football King is a frantic local-multiplayer soccer game by FreezeNova. Choose from 20 unlockable players, customize team flags, and battle in 1v1, 2v2, or co-op 2v2 modes across multiple stadiums — or take on an 8-team tournament to crown the true Football King.',
    src: 'https://unblocked-games.s3.amazonaws.com/football-king.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Move & Jump (P1 / P2)' },
      { key: 'Space / V / K', action: 'Shoot the Ball' },
      { key: 'B / L', action: 'Super Shot (every 5 seconds)' }
    ],
    instructions: [
      'Choose single-player, 2-player, or tournament mode, then pick your player, flag, stadium, and match settings.',
      'Jump to head the ball, shoot to score, and save your super shot for a game-changing strike.'
    ],
    tips: [
      'Super shots are most likely to find the net — use them right after kick-off resets.',
      'Tournament wins earn coins to unlock faster, more skillful players!'
    ],
    plays: 545000,
    rating: 4.96,
    ratingCount: 18700,
    badge: '2-PLAYER SOCCER',
    iconName: 'Trophy',
    accentColor: '#38bdf8',
    releaseYear: 2024,
    thumbnailUrl: './images/football_king.jpg'
  },
  {
    id: 'tennis-masters',
    title: 'Tennis Masters',
    category: 'arcade',
    description: 'Grand Slam tennis action: choose world-class players, smash aces, and battle friends or CPU through full tournaments!',
    longDescription: 'Tennis Masters is a polished arcade tennis game featuring star players from around the globe. Play quick matches, friendly duels, or full bracket tournaments against the computer or a friend, and dominate the court with powerful serves and unstoppable smashes.',
    src: 'https://unblocked-games.s3.amazonaws.com/tennis-masters.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'W / A / D', action: 'Move Player 1' },
      { key: 'X (P1) / V (P1) / L (P2)', action: 'Hit the Ball' },
      { key: 'Z (P1) / B (P1) / K (P2)', action: 'Smash Shot' },
      { key: 'Arrow Keys', action: 'Move Player 2' }
    ],
    instructions: [
      'Select your tennis star and mode: Quick Match, Friendly, or Tournament bracket.',
      'Time your hits as the ball arrives and use smashes to end points with authority.'
    ],
    tips: [
      'Serve fast and aim for the corners to set up easy ace opportunities.',
      'Anticipate your rival’s positioning — drop shots punish players who camp the baseline.'
    ],
    plays: 470000,
    rating: 4.95,
    ratingCount: 15900,
    badge: '2-PLAYER TENNIS',
    iconName: 'Trophy',
    accentColor: '#a3e635',
    releaseYear: 2024,
    thumbnailUrl: './images/tennis_masters.jpg'
  },
  {
    id: 'golf-bit',
    title: 'Golf Bit',
    category: 'skill',
    description: 'One-tap golf launcher: nail perfect timing in the green zone, smash the ball past buildings and birds, and chase distance records!',
    longDescription: 'Golf Bit is an addictive timing-based golf launcher from FreezeNova. Strike when the moving indicator hits the green zone for maximum power, then watch your ball rocket across the course, ricochet off obstacles, and travel absurd distances. Upgrade strength, speed, and bounce to send every shot further than the last.',
    src: 'https://unblocked-games.s3.amazonaws.com/golf-bit.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click / Spacebar', action: 'Swing (time it in the green zone)' }
    ],
    instructions: [
      'Press the moment the indicator crosses the green zone to launch the ball with full power.',
      'Spend your earnings on Strength, Speed, and Bounce upgrades to break your distance record every run.'
    ],
    tips: [
      'Perfect-timing swings grant bonus power — listen for the rhythm before you tap.',
      'Bounce upgrades pay off most once your drives start carrying past the buildings!'
    ],
    plays: 395000,
    rating: 4.94,
    ratingCount: 11600,
    badge: 'ONE-TAP GOLF',
    iconName: 'Zap',
    accentColor: '#10b981',
    releaseYear: 2024,
    thumbnailUrl: './images/golf_bit.jpg'
  },
  {
    id: 'polytrack',
    title: 'PolyTrack',
    category: 'driving',
    description: 'Low-poly time-trial racing: blast through checkpoints, hunt milliseconds on the leaderboards, and master 40+ tracks!',
    longDescription: 'PolyTrack is a blisteringly fast low-poly arcade racer inspired by TrackMania. Race solo against the clock across dozens of handcrafted tracks featuring loops, jumps, and hairpins — every run is measured to the millisecond, and every checkpoint saves your split times.',
    src: 'https://ubghyper.github.io/GameList.github.io/Polytrack-New/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Accelerate / Brake / Steer' },
      { key: 'R', action: 'Restart Track Instantly' },
      { key: 'Mouse Left Click', action: 'Menu Navigation' }
    ],
    instructions: [
      'Drive through every checkpoint gate in order and cross the finish line as fast as possible.',
      'Miss a gate or crash? Tap R for an instant restart — perfecting lines is the whole game.'
    ],
    tips: [
      'Brake before corners and accelerate out of them — smooth lines beat raw speed.',
      'Compare your splits against the record to find exactly where you are losing time.'
    ],
    plays: 830000,
    rating: 4.98,
    ratingCount: 34800,
    badge: 'TIME-TRIAL RACING',
    iconName: 'Flame',
    accentColor: '#06b6d4',
    releaseYear: 2024,
    thumbnailUrl: './images/polytrack.jpg'
  },
  {
    id: 'idle-mining-empire',
    title: 'Idle Mining Empire',
    category: 'strategy',
    description: 'Deep-shaft idle tycoon: dig tunnels, automate elevator shafts, hire managers, and extract a mountain of glittering riches!',
    longDescription: 'Idle Mining Empire is a satisfying idle tycoon game about building a mining operation from a single shaft into a sprawling underground empire. Assign miners, unlock deeper layers of ore, automate transport with elevators and managers, and watch your profits compound even while you plan your next expansion.',
    src: 'https://ubghyper.github.io/GameList.github.io/Idle-Mining-Empire/',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Left Click', action: 'Hire Miners / Buy Upgrades / Manage Shafts' }
    ],
    instructions: [
      'Click a tunnel to hire a miner, then invest the earnings into deeper, more valuable shafts.',
      'Recruit managers to automate each operation so your empire keeps earning around the clock.'
    ],
    tips: [
      'Spread early upgrades across several shafts instead of maxing a single one.',
      'Manager automation is the key multiplier — prioritize it before long idle sessions!'
    ],
    plays: 615000,
    rating: 4.95,
    ratingCount: 20800,
    badge: 'IDLE TYCOON',
    iconName: 'Pickaxe',
    accentColor: '#f59e0b',
    releaseYear: 2024,
    thumbnailUrl: './images/mining.jpg'
  },
  {
    id: 'nova-craft',
    title: 'Nova Craft',
    category: 'puzzle',
    description: 'Cosmic alchemy sandbox: fuse Water, Fire, Wind, and Earth to discover over 3,000 items, creatures, and concepts!',
    longDescription: 'Nova Craft is a vast alchemy-crafting game where you play at the dawn of creation. Starting with just four classical elements, combine them to unlock plants, animals, minerals, machines, and abstract concepts — over 3,000 discoveries in total — with a Creativity Box that lets you speed-craft combos at lightning pace.',
    src: 'https://unblocked-games.s3.amazonaws.com/nova-craft.html',
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Drag & Drop', action: 'Combine Elements on the Board' },
      { key: 'Right Click', action: 'Remove Items from the Board' },
      { key: 'Search Bar', action: 'Filter & Sort Your Library' }
    ],
    instructions: [
      'Drag one element on top of another to fuse them — some pairs hide multiple possible products, so keep experimenting.',
      'Drop an element into the Creativity Box, then click library items to rapid-fire test combinations.'
    ],
    tips: [
      'Combine the same pair several times to reveal every hidden product.',
      'Download your save code from settings before switching browsers — your universe travels with you!'
    ],
    plays: 585000,
    rating: 4.96,
    ratingCount: 19300,
    badge: 'ALCHEMY SANDBOX',
    iconName: 'Sparkles',
    accentColor: '#8b5cf6',
    releaseYear: 2024,
    thumbnailUrl: './images/nova_craft.jpg'
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
