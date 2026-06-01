// Chapter 1: The Awakening of the Demon Destroyer
// All scripted content — no AI, no external calls.

export const ASSETS = {
    sceneFantasy: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/d8532f2a98e95bc5bcad21411802a65be6faa77edd361b8e5f037075098a9d36.png',
    sceneReality: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/761104f77de60a97a22ebca05f3ce87db2790d40cb342c61928b6701475f02e2.png',
    livingroom:   'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/knj9vvrm_Living%20room.png',
    portraitFantasy: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/502fe4e92af9d6facecf8b4ffc4f0023b324ba0ec5aa10fe76a0875c5746d22c.png',
    portraitReality: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/41a170430063921ba188d8ead4ca03cae7475b6be0c6ab17ac0f0c9d9590afb1.png',
    menuBg: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/a199ba31e0c1f11e9a95f17923d3991a7ef30a767a2b6749b51f14e0daeefcc3.png',
};

export const ITEMS = {
    whisker_tuft: {
        id: 'whisker_tuft',
        nameFantasy: 'Key of Awakening',
        nameReality: 'Black Whisker',
        descFantasy: 'A relic shed by the Demon Destroyer in his thousand-year slumber. It hums with arcane potential.',
        descReality: 'Just a single black cat whisker. Yours, probably.',
        glyph: '╳',
    },
    catnip_pouch: {
        id: 'catnip_pouch',
        nameFantasy: 'Pouch of Wild Madness',
        nameReality: 'Spilled Catnip',
        descFantasy: 'Ground herbs of the Verdant Frenzy. One whiff banishes fear and unleashes the inner beast.',
        descReality: 'A torn pouch of catnip scattered on the floor. Smells incredible.',
        glyph: '✿',
    },
    yarn_ball: {
        id: 'yarn_ball',
        nameFantasy: 'Orb of Binding Fates',
        nameReality: 'Red Yarn Ball',
        descFantasy: 'Spun from the threads of every life ever lived. Cast it well and destinies shall tangle.',
        descReality: 'A tangled red yarn ball, slightly slobbered upon.',
        glyph: '◉',
    },
    hair_tie: {
        id: 'hair_tie',
        nameFantasy: 'Ring of Mortal Weakness',
        nameReality: 'Pink Hair Tie',
        descFantasy: 'A circlet forged by the Soft Ones. Holds back the mane of mortals during deeds most grim.',
        descReality: "It's pink. It smells like the human girl. Why is it on the floor?",
        glyph: '○',
    },
    talisman: {
        id: 'talisman',
        nameFantasy: 'Talisman of Ferocity',
        nameReality: 'Catnip-Soaked Yarn',
        descFantasy: 'Forged in haste, this weapon channels the Verdant Frenzy through threads of fate. The Dust Wyrm shall quail.',
        descReality: "A yarn ball you rolled in catnip. Honestly, you're not sure what this accomplishes.",
        glyph: '✦',
    },
};

const flavorEmpty = "There is nothing here to take. The shadows whisper their disappointment.";
const flavorTalkNo = "It does not answer. Perhaps it is sworn to silence. Perhaps it is a chair.";

export const ROOMS = {
    bedroom: {
        id: 'bedroom',
        titleFantasy: 'Sanctum of Eternal Slumber',
        titleReality: 'Master Bedroom — Tuesday, 7:14 AM',
        bgFantasy: ASSETS.sceneFantasy,
        bgReality: ASSETS.sceneReality,
        onEnterMonologue: {
            once: true,
            fantasy: "I AWAKEN. A thousand winters have passed, and yet the Sanctum still trembles at my paw. The mortals shall soon learn — the Demon Destroyer of Worlds has risen.",
            reality: "It is morning. The humans have not yet opened the curtains. My food bowl, I suspect, is empty. This is a grave matter.",
        },
        hotspots: [
            {
                id: 'altar',
                x: 22, y: 56, w: 7, h: 8,
                labelFantasy: 'Altar of First Whispers',
                labelReality: 'Nightstand',
                look: {
                    fantasy: "An altar of polished obsidian. A single whisker rests upon it — my own, shed in a dream of conquest.",
                    reality: "A wooden nightstand. There's a black whisker on top. You shed those all the time.",
                },
                take: {
                    item: 'whisker_tuft',
                    onceFantasy: "I claim my Key of Awakening. The runes know my name once more.",
                    onceReality: "You pick up the whisker. It's a little dusty.",
                },
            },
            {
                id: 'mirror',
                x: 64, y: 34, w: 8, h: 12,
                labelFantasy: 'Scrying Pool of the Self',
                labelReality: 'Wall Mirror',
                look: {
                    fantasy: "I gaze into the scrying pool. A creature of midnight fur and gleaming eye stares back — magnificent, terrible, eternal.",
                    reality: "You look in the mirror. A small black cat looks back. Adorable.",
                },
            },
            {
                id: 'tome',
                x: 78, y: 70, w: 9, h: 9,
                labelFantasy: 'Tome of the Forgotten Hour',
                labelReality: 'A Closed Laptop',
                look: {
                    fantasy: "An ancient grimoire, sealed by a single forbidden glyph. To open it would be to glimpse forbidden truths.",
                    reality: "A laptop. The human types on it for hours. You sit on it whenever possible.",
                },
                use: {
                    fantasy: "The seal does not yield. The forbidden glyph mocks me. Perhaps another day.",
                    reality: "You step on the keys. Nothing exciting happens. The lid is closed.",
                },
            },
            {
                id: 'doorLiving',
                x: 8, y: 22, w: 9, h: 32,
                labelFantasy: 'Threshold of the Cursed Hall',
                labelReality: 'Bedroom Doorway',
                look: {
                    fantasy: "Beyond this archway lies the Hall of the Cursed Throne, where the Dust Wyrm slumbers. I sense its breath.",
                    reality: "The bedroom door. It opens onto the living room. The vacuum is in there somewhere.",
                },
                use: { goto: 'livingroom' },
            },
        ],
    },

    livingroom: {
        id: 'livingroom',
        titleFantasy: 'Hall of the Cursed Throne',
        titleReality: 'Our Living Room',
        bgFantasy: ASSETS.livingroom,
        bgReality: ASSETS.livingroom,
        onEnterMonologue: {
            once: true,
            fantasy: "BEHOLD! The Great Hall lies before me. The Throne of Endless Comfort awaits its rightful occupant. A demon yet stirs within the Arcane Scrying Mirror. The very air HUMS with peril and snacks.",
            reality: "The living room. Pizza on the table. Cartoons on the TV. The penguin plushie is on my throne again. I shall deal with this.",
        },
        hotspots: [
            // Couch / Throne of Endless Comfort
            {
                id: 'throne',
                x: 16, y: 50, w: 28, h: 28,
                labelFantasy: 'Throne of Endless Comfort',
                labelReality: 'The Green Couch',
                look: {
                    fantasy: "MY throne. Carved from the verdant hide of a forgotten beast, bestowed upon me at the dawn of my reign. Currently occupied by an impostor.",
                    reality: "The couch. I have shed exactly six hundred and twelve hairs into it. Each one is a love letter.",
                },
            },
            // Penguin plush
            {
                id: 'penguin',
                x: 32, y: 62, w: 8, h: 16,
                labelFantasy: 'The False Heir, Pen-Gwyn the Pretender',
                labelReality: 'Stuffed Penguin Plushie',
                look: {
                    fantasy: "Pen-Gwyn. A doll-like usurper placed upon my throne by the Soft Ones. He smiles. He always smiles. He KNOWS.",
                    reality: "A plushie penguin. He has been here longer than me. The humans love him very much. Suspicious.",
                },
                talk: {
                    fantasy: "I challenge thee for the throne! ... He maintains his terrible smile. A psychological warrior of the highest order.",
                    reality: "You meow at the penguin. The penguin does not meow back. You consider this a victory.",
                },
            },
            // Cosmic Window (left)
            {
                id: 'window',
                x: 8, y: 18, w: 24, h: 42,
                labelFantasy: 'The Cosmic Window',
                labelReality: 'The Front Window',
                look: {
                    fantasy: "Beyond this veil glimmers the Forbidden Realm — where Grumbleknot the Stone Sage stands his eternal watch upon the outer marches.",
                    reality: "The window. You can see the neighbor's house. The garden gnome is in our yard. He does not move. You respect him.",
                },
                use: { goto: 'garden' },
            },
            // Bookshelves / Archive of Forbidden Wisdom
            {
                id: 'archive',
                x: 50, y: 26, w: 14, h: 34,
                labelFantasy: 'Archive of Forbidden Wisdom',
                labelReality: 'The Bookshelves',
                look: {
                    fantasy: "Ten thousand grimoires! Each binds a truth too dread for mortal eyes. I have not read them. But I HAVE knocked them off the shelf, which is similar.",
                    reality: "Books. So many books. The humans claim to read them. The evidence is mixed.",
                },
            },
            // TV / Arcane Scrying Mirror
            {
                id: 'wyrm',
                x: 60, y: 50, w: 14, h: 18,
                labelFantasy: 'The Arcane Scrying Mirror',
                labelReality: 'The Television',
                look: {
                    fantasy: "A scrying glass through which the Wyrm of Ill Cartoon broadcasts his taunts! Lightning sigils! A grinning beast! He MUST be banished.",
                    reality: "The TV. A cartoon penguin is being electrocuted. It's the human girl's favorite show. You do not understand it.",
                },
                talk: {
                    fantasy: "I demand thy retreat, demon of the glass! ... The Wyrm continues his sinister flickering, undeterred.",
                    reality: "You meow at the TV. The cartoon does not pause. You are not respected in this household.",
                },
                useWith: {
                    talisman: {
                        ending: true,
                        fantasy: "I HURL the Talisman of Ferocity at the Scrying Mirror! The demon's image SHATTERS into static! The Hall is saved! The legend is BEGUN!",
                        reality: "You drop the catnip-soaked yarn ball at the foot of the TV stand. The yarn ball rolls into the cable. The TV switches off with a soft pop. You are absolutely sure you did that on purpose.",
                    },
                    default: {
                        fantasy: "The relic finds no purchase upon the demon. I shall need a worthier instrument.",
                        reality: "You bat the item near the TV. The cartoon continues. The penguin continues to be electrocuted.",
                    },
                },
            },
            // Lava Lamp / Captured Elemental Flame
            {
                id: 'flame',
                x: 76, y: 44, w: 6, h: 18,
                labelFantasy: 'Captured Elemental Flame',
                labelReality: 'The Lava Lamp',
                look: {
                    fantasy: "A FIRE ELEMENTAL, bottled by some ancient mage and reduced to slow, sullen drifting. I almost feel pity. Almost.",
                    reality: "The lava lamp. Mesmerising. The humans bought it ironically and now they keep it on all the time. The blobs are slow.",
                },
                talk: {
                    fantasy: "Speak, Flame! Are you bound here against thy will? The Flame replies in slow, blob-shaped grunts. I shall not be the one to free it.",
                    reality: "You stare at the lava lamp. The lava lamp stares back. Time passes. You forget what you were doing.",
                },
            },
            // Coffee table / Altar of Crumbs
            {
                id: 'altar_crumbs',
                x: 34, y: 78, w: 28, h: 18,
                labelFantasy: 'Altar of Sacred Crumbs',
                labelReality: 'The Coffee Table',
                look: {
                    fantasy: "Behold — an altar laden with offerings: a wheel of cheese-bread, two chalices, and a flat black sigil of summoning. Surely placed here for ME.",
                    reality: "Coffee table. There's a half-eaten pizza, two glasses, a game controller, and a phone. The humans were here recently. None of it is for you.",
                },
            },
            // Catnip on floor
            {
                id: 'catnipFloor',
                x: 26, y: 90, w: 8, h: 6,
                labelFantasy: 'Spilled Pouch of Wild Madness',
                labelReality: 'Catnip on the Floor',
                look: {
                    fantasy: "Herbs of the Verdant Frenzy, spilled in some past battle. Their scent calls to the beast within.",
                    reality: "You knocked over the catnip pouch yesterday. It's still here. Nobody has cleaned it up. You are not sorry.",
                },
                take: {
                    item: 'catnip_pouch',
                    onceFantasy: "I gather the Pouch of Wild Madness. The Frenzy is mine to wield.",
                    onceReality: "You scoop the catnip back into the torn pouch. Your paws tingle.",
                },
            },
            // Cat Bed / Royal Nest of Restoration
            {
                id: 'royal_nest',
                x: 76, y: 70, w: 12, h: 14,
                labelFantasy: 'Royal Nest of Restoration',
                labelReality: 'My Cat Bed',
                look: {
                    fantasy: "A wicker nest woven by adoring servants, gilded with my own shed fur. To slumber here is to draw strength from a thousand past lives.",
                    reality: "Your cat bed. You only sleep in it when the humans aren't watching. When they ARE watching, you sleep in the laundry.",
                },
                searchItem: {
                    item: 'hair_tie',
                    onceFantasy: "Within the Nest I unearth a Ring of Mortal Weakness — relic of the Soft Ones who came before me.",
                    onceReality: "You dig in your cat bed and discover a pink hair tie. The girl has been looking for it. You consider returning it. You will not.",
                },
            },
            // Kitchen doorway / Path to the Food Bowl Temple
            {
                id: 'food_temple',
                x: 84, y: 26, w: 12, h: 44,
                labelFantasy: 'Path to the Food Bowl Temple',
                labelReality: 'The Kitchen Doorway',
                look: {
                    fantasy: "The sacred path. Beyond lies the Temple of the Bowl, where the Crunchy Offering manifests at dawn and dusk. I sense the Bowl is empty. THIS IS A CRISIS.",
                    reality: "The kitchen. Where the food bowl lives. You can see the fridge from here. The fridge is the great gatekeeper. You respect and fear it.",
                },
                use: {
                    fantasy: "I shall not enter the Temple until the demon of the Scrying Mirror is banished. Order matters in legend-craft.",
                    reality: "Later. You have a TV to deal with first. Priorities.",
                },
            },
            // Staircase / Ascending Path
            {
                id: 'upper_realms',
                x: 92, y: 56, w: 7, h: 30,
                labelFantasy: 'Ascending Path to the Upper Realms',
                labelReality: 'The Stairs',
                look: {
                    fantasy: "The Ascending Path. Beyond its summit lie the Upper Realms — bedrooms, attics, and the legendary Linen Closet of the Final Trial.",
                    reality: "The stairs. They go up. You will go up. Eventually. After the pizza is cold.",
                },
                use: {
                    fantasy: "I dare not ascend until the Hall is purified. The Upper Realms shall await Chapter II.",
                    reality: "Not yet. Plot reasons. (Chapter II awaits.)",
                },
            },
            // Side table (small extra detail)
            {
                id: 'side_lamp',
                x: 2, y: 60, w: 12, h: 22,
                labelFantasy: 'Pillar of Captured Sunlight',
                labelReality: 'The Side Table Lamp',
                look: {
                    fantasy: "A pillar of captured sunlight, bound by metal and shade. Mortals call upon it when the great star fails them.",
                    reality: "The lamp. It clicks on when you bump it. You bump it often. It is one of life's little joys.",
                },
            },
        ],
    },

    garden: {
        id: 'garden',
        titleFantasy: 'Forbidden Realm of the Stone Mage',
        titleReality: 'The Front Garden',
        bgFantasy: ASSETS.sceneFantasy,
        bgReality: ASSETS.sceneReality,
        onEnterMonologue: {
            once: true,
            fantasy: "The Forbidden Realm. The wind speaks in tongues older than thought. And there — Grumbleknot the Stone Sage, who has not blinked in twelve centuries.",
            reality: "The front garden. A little chilly. The garden gnome is in his usual spot. The neighbors must think the family is eccentric.",
        },
        hotspots: [
            {
                id: 'gnome',
                x: 38, y: 50, w: 10, h: 28,
                labelFantasy: 'Grumbleknot, Stone Sage',
                labelReality: 'Garden Gnome',
                look: {
                    fantasy: "Grumbleknot. Bearded. Inscrutable. Knower of the Old Roads. A single nod from him could topple kingdoms.",
                    reality: "It's a ceramic garden gnome. About 18 inches tall. Pointy red hat. Mildly chipped.",
                },
                talk: { tree: 'gnome_tree' },
            },
            {
                id: 'bush',
                x: 70, y: 64, w: 14, h: 16,
                labelFantasy: 'Cursed Grove of Whispering Thorns',
                labelReality: 'The Rosemary Bush',
                look: {
                    fantasy: "The thorns whisper of a lost relic — an Orb tangled in their grasp, awaiting a worthy claimant.",
                    reality: "The rosemary bush. Smells nice. There's a tangled yarn ball stuck in it.",
                },
                take: {
                    item: 'yarn_ball',
                    onceFantasy: "By tooth and claw I free the Orb of Binding Fates from the Cursed Grove. Destiny is now spun in MY paws.",
                    onceReality: "You wriggle into the bush and emerge triumphantly with the yarn ball. You also have a leaf stuck to your tail.",
                },
            },
            {
                id: 'monolith',
                x: 14, y: 38, w: 8, h: 36,
                labelFantasy: 'Monolith of Forgotten Messages',
                labelReality: 'The Mailbox',
                look: {
                    fantasy: "An iron monolith etched with sigils of summons. Pigeons of obligation alight here daily.",
                    reality: "The mailbox. A bill is sticking out. None of your business.",
                },
                use: {
                    fantasy: "I command the Monolith to surrender its secrets. It does not. It is, in the end, a small iron box.",
                    reality: "You bat at the mailbox. It is metallic and uninteresting.",
                },
            },
            {
                id: 'doorBack',
                x: 0, y: 18, w: 6, h: 50,
                labelFantasy: 'Veil-Path Home',
                labelReality: 'Back to the House',
                look: { fantasy: "The veil-path returns to the Hall.", reality: "Back inside through the window." },
                use: { goto: 'livingroom' },
            },
        ],
    },
};

export const FLAVOR = { flavorEmpty, flavorTalkNo };

// Branching dialogue trees. Each node: { speaker, fantasy, reality, choices: [{text, next, sets?:flag, requires?:flag, gives?:item }] }
export const DIALOGUE_TREES = {
    gnome_tree: {
        start: 'g_intro',
        nodes: {
            g_intro: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                portrait: 'gnome',
                fantasy: "...",
                reality: "...",
                hint: { fantasy: "He does not yet acknowledge me. I must announce myself with proper gravitas.", reality: "He's a gnome. He does not move. You should probably address him anyway." },
                choices: [
                    { text: '"I am Fluffy, Demon Destroyer of Worlds. Speak, sage."', next: 'g_announce' },
                    { text: '"Hello, statue."', next: 'g_polite' },
                    { text: 'Walk away.', next: null },
                ],
            },
            g_announce: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                fantasy: "Grumbleknot's silence is profound. I take it as recognition. Yes. He knows me.",
                reality: "The gnome does not respond. You take its lack of disagreement as confirmation.",
                choices: [
                    { text: '"What quest awaits me, sage?"', next: 'g_quest' },
                    { text: '"How do I slay the Dust Wyrm?"', next: 'g_wyrm' },
                    { text: 'Farewell.', next: null },
                ],
            },
            g_polite: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                fantasy: "He stares back, unblinking. I sense ancient amusement.",
                reality: "The gnome stares. You stare. Eventually you blink first.",
                choices: [
                    { text: '"Are you in there?"', next: 'g_in_there' },
                    { text: '"...Anyway, I have a vacuum to slay."', next: 'g_wyrm' },
                    { text: 'Goodbye.', next: null },
                ],
            },
            g_in_there: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                fantasy: "Grumbleknot's lips do not move. Yet I HEAR him. 'I am always within,' he says. 'And also, somewhat, without.' Wise. Confusing. Wise.",
                reality: "Nothing. He is ceramic. You are imagining things. Probably.",
                choices: [
                    { text: '"What quest awaits me?"', next: 'g_quest' },
                    { text: 'Farewell, gnome.', next: null },
                ],
            },
            g_quest: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                fantasy: "The sage's wisdom flows into my mind unbidden: 'To rouse the Sanctum thou must vanquish the Dust Wyrm. Bind the Orb in the Verdant Frenzy. Cast it at the Wyrm's gaping maw.'",
                reality: "You stare at the gnome long enough to convince yourself he just gave you instructions. Combine the catnip with the yarn. Drop it near the vacuum. That'll show it.",
                sets: 'gnome_quest_received',
                choices: [
                    { text: '"It shall be done."', next: null },
                    { text: '"Any other wisdom?"', next: 'g_wyrm' },
                ],
            },
            g_wyrm: {
                speakerFantasy: 'Grumbleknot, Stone Sage',
                speakerReality: 'Garden Gnome',
                fantasy: "Grumbleknot intones (silently): 'Steel alone will not fell the Wyrm. The Orb of Binding Fates, soaked in Wild Madness, shall undo its iron heart.'",
                reality: "The gnome continues to be a gnome. You decide the yarn + catnip strategy is sound. It is the only strategy you have.",
                sets: 'gnome_quest_received',
                choices: [
                    { text: '"I shall not fail."', next: null },
                ],
            },
        },
    },
};

export const QUESTS = [
    { id: 'q_awaken',  titleFantasy: 'Rise, Demon Destroyer',                   titleReality: 'Wake up properly',                  descFantasy: 'A thousand winters of slumber are at an end. Explore the Sanctum and claim what was thine.', descReality: 'Get out of bed and walk around. Find something interesting.' },
    { id: 'q_relics',  titleFantasy: 'Gather the Four Relics',                  titleReality: 'Pick up everything you can find',   descFantasy: 'The Key, the Pouch, the Orb, the Ring — without them, no legend is begun.',                  descReality: 'Whisker, catnip, yarn, hair tie. Cats love stuff. Pick stuff up.' },
    { id: 'q_sage',    titleFantasy: 'Counsel of the Stone Sage',               titleReality: 'Address the garden gnome',          descFantasy: 'Seek Grumbleknot in the Forbidden Realm. His silence speaks volumes.',                      descReality: 'Go outside. Talk to the gnome. He has nothing to say, but say it anyway.' },
    { id: 'q_forge',   titleFantasy: 'Forge the Talisman of Ferocity',          titleReality: 'Combine the catnip and yarn',       descFantasy: 'Bind the Pouch of Wild Madness to the Orb of Binding Fates. The Wyrm shall fear thee.',     descReality: 'Open inventory, use catnip on the yarn. Yes, really.' },
    { id: 'q_slay',    titleFantasy: "Vanquish the Dust Wyrm Mor'thrax",        titleReality: 'Defeat the vacuum cleaner',         descFantasy: 'Hurl the Talisman at the slumbering Wyrm and end its dominion over the Hall forever.',     descReality: 'Drop the catnip-yarn near the vacuum. Watch what happens.' },
];

// Quest progression triggers
export function deriveQuestStates(state) {
    const have = (id) => !!state.inventory[id];
    const status = {};
    status.q_awaken = (state.visited.bedroom && (state.visited.livingroom || state.visited.garden)) ? 'done' : 'active';
    const collected = ['whisker_tuft','catnip_pouch','yarn_ball','hair_tie'].filter(have).length;
    status.q_relics = collected >= 4 ? 'done' : (collected >= 1 ? 'active' : 'locked');
    status.q_sage   = state.flags.gnome_quest_received ? 'done' : (state.visited.garden ? 'active' : 'locked');
    status.q_forge  = have('talisman') ? 'done' : (have('catnip_pouch') && have('yarn_ball') ? 'active' : 'locked');
    status.q_slay   = state.flags.wyrm_defeated ? 'done' : (have('talisman') ? 'active' : 'locked');
    return status;
}

export const COMBOS = {
    // sorted key 'a|b' -> result
    'catnip_pouch|yarn_ball': {
        result: 'talisman',
        consume: ['catnip_pouch','yarn_ball'],
        fantasy: "I bind the Pouch of Wild Madness to the Orb of Binding Fates. The Talisman of Ferocity is forged! The Wyrm shall TREMBLE.",
        reality: "You roll the yarn ball through the catnip. It is now a slightly damp, slightly green yarn ball. Magnificent.",
    },
};

export const CHAPTER_META = {
    id: 'ch1',
    number: 'I',
    titleFantasy: 'The Awakening of the Demon Destroyer',
    titleReality: 'Tuesday Morning, Approximately',
    epigraph: '"Nine lives. Nine legends. The first begins at the food bowl."',
    startRoom: 'bedroom',
    endingMonologue: {
        fantasy: "The Dust Wyrm lies vanquished. The Sanctum is saved. The first legend is written in fur and thunder. Yet eight more await — and the food bowl is STILL empty.",
        reality: "The vacuum has fallen over. You feel powerful. You go check the food bowl. It is, as suspected, empty. You begin yelling.",
        outro: "— END OF CHAPTER I —",
        subOutro: "The legend continues in Chapter II: 'A Bowl Most Sacred'",
    },
};
