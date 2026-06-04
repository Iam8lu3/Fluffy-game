// Chapter 1: The Awakening of the Demon Destroyer
// Fluffy is an ordinary black housecat with an enormous imagination and absolute
// confidence in his heroic narrative. Fantasy text is what Fluffy sincerely
// believes; Reality text is what is actually there. Both are warm. Neither
// mocks Fluffy.

export const ASSETS = {
    fluffySprite: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/e7nxl8cp_1.png',
    // Reality artwork — the actual home
    livingroom:   'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/knj9vvrm_Living%20room.png',
    bedroom:      'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/vharuc2f_Bedroom%20reality.png',
    garden:       'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/dak6yp82_Backyard%20reality.png',
    // Fantasy artwork — Fluffy's reinterpretation, same layouts re-skinned
    bedroomFantasy:    'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/t9acie6j_Bedroom%20Fantasy.png',
    livingroomFantasy: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/cjj6bwt5_Living%20room%20fantasy.png',
    gardenFantasy:     'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/vpk3jc1g_Backyard%20fantasy.png',
    portraitFantasy: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/502fe4e92af9d6facecf8b4ffc4f0023b324ba0ec5aa10fe76a0875c5746d22c.png',
    portraitReality: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/41a170430063921ba188d8ead4ca03cae7475b6be0c6ab17ac0f0c9d9590afb1.png',
    menuBg: 'https://static.prod-images.emergentagent.com/jobs/36edfcf3-5190-4ffa-a7a6-7e0c15c7cb29/images/a199ba31e0c1f11e9a95f17923d3991a7ef30a767a2b6749b51f14e0daeefcc3.png',
};

export const ITEMS = {
    whisker_tuft: {
        id: 'whisker_tuft',
        nameFantasy: 'Whisker of the First Vow',
        nameReality: 'A Single Black Whisker',
        descFantasy: 'The whisker I shed in my coronation dream. While I carry it, no enemy may catch me unaware.',
        descReality: 'One of my whiskers. I shed it on the nightstand last week. The humans never noticed.',
        glyph: '╳',
    },
    catnip_pouch: {
        id: 'catnip_pouch',
        nameFantasy: 'Pouch of the Verdant Frenzy',
        nameReality: 'A Torn Bag of Catnip',
        descFantasy: 'Ground herbs of the Verdant Frenzy. Their scent is the courage I am too dignified to need.',
        descReality: 'The catnip pouch I knocked over yesterday. It still smells incredible.',
        glyph: '✿',
    },
    yarn_ball: {
        id: 'yarn_ball',
        nameFantasy: 'Orb of Binding Fates',
        nameReality: 'Red Yarn Ball',
        descFantasy: 'The Orb in which all destinies are tangled. I have rolled it under the couch many times, just to be certain.',
        descReality: 'A red yarn ball. A little slobbered upon. The slobber is mine.',
        glyph: '◉',
    },
    hair_tie: {
        id: 'hair_tie',
        nameFantasy: 'Ring of Mortal Weakness',
        nameReality: 'A Pink Hair Tie',
        descFantasy: 'A circlet worn by the Soft Ones. Holds their manes back during deeds of great gravity.',
        descReality: "The girl has been looking for this hair tie for two days. I know exactly where it is. I am keeping that information.",
        glyph: '○',
    },
    talisman: {
        id: 'talisman',
        nameFantasy: 'Talisman of the Verdant Frenzy',
        nameReality: 'Catnip-Soaked Yarn Ball',
        descFantasy: 'The Orb of Binding Fates, anointed with the Verdant Frenzy. Forged by me. For this hour.',
        descReality: "A yarn ball I rolled in catnip. It is a little damp. I am not going to think too hard about what it does.",
        glyph: '✦',
    },
};

// Allow text to be a string OR an array — array entries advance with each examine.
export function pickByCount(text, count = 0) {
    if (Array.isArray(text)) return text[Math.min(count, text.length - 1)];
    return text;
}

// ----------------------- ROOMS -----------------------

export const ROOMS = {
    bedroom: {
        id: 'bedroom',
        chapter: 1,
        titleFantasy: 'My Sanctum',
        titleReality: 'The Master Bedroom — Just After Sunrise',
        bgFantasy: ASSETS.bedroomFantasy,
        bgReality: ASSETS.bedroom,
        spawnX: 38,
        onEnterMonologue: {
            once: true,
            fantasy: "I have risen. The Sanctum holds. The Daylight Beacon has begun to climb the Window of Hours, and there is much to inspect.",
            reality: "Morning. The humans are still asleep. The blanket is still warm where I slept. I have a great deal to attend to before breakfast.",
        },
        hotspots: [
            // Door — RIGHT side, opens to the Great Hall
            {
                id: 'doorLiving',
                x: 81, y: 53, w: 19, h: 47,
                labelFantasy: 'Threshold to the Great Hall',
                labelReality: 'The Bedroom Door',
                look: {
                    fantasy: [
                        "The Threshold. Beyond it lies the Great Hall, where the day's true business begins.",
                        "Its brass handle bears the warmth of many openings. I respect it.",
                    ],
                    reality: [
                        "The bedroom door. Slightly ajar. The dad never closes it all the way.",
                        "I can smell the leftover pizza from the living room. Faintly. Persistently.",
                    ],
                },
                use: { goto: 'livingroom' },
            },
            // Window
            {
                id: 'window',
                x: 46, y: 33, w: 35, h: 37,
                labelFantasy: 'The Window of Hours',
                labelReality: 'The Window',
                look: {
                    fantasy: [
                        "The Window of Hours. Through it I observe the small kingdoms of the world.",
                        "A flock of sparrows performs its morning circuit. They believe they have escaped me. They have not. They are merely deferred.",
                    ],
                    reality: [
                        "The window. The garden is below. The gnome is in his spot.",
                        "Two sparrows on the fence. They have not noticed me. Yet.",
                    ],
                },
            },
            // Curtain Left
            {
                id: 'curtain_left',
                x: 41, y: 43, w: 7, h: 44,
                labelFantasy: 'Left Veil of the Window',
                labelReality: 'The Left Curtain',
                look: {
                    fantasy: "A veil of green and white, drawn back by mortal hands at first light. I approve of the choice.",
                    reality: "The left curtain. Polka dots. The mom made these herself. The dad called them 'a little much.' The mom did not respond.",
                },
            },
            // Curtain Right
            {
                id: 'curtain_right',
                x: 75, y: 43, w: 7, h: 44,
                labelFantasy: 'Right Veil of the Window',
                labelReality: 'The Right Curtain',
                look: {
                    fantasy: "The right veil. Twin to its sister. Held back by a cord of gold.",
                    reality: "The right curtain. Same polka dots. I have climbed these. Once. There were consequences.",
                },
            },
            // Sunrise
            {
                id: 'sunrise',
                x: 52, y: 36, w: 22, h: 22,
                labelFantasy: 'The Daylight Beacon',
                labelReality: 'The Morning Sun',
                look: {
                    fantasy: [
                        "The Daylight Beacon. It climbs the sky on a schedule even I cannot improve upon.",
                        "Its first warmth lands upon the foot of my bed. This is by ancient arrangement.",
                    ],
                    reality: [
                        "Sunrise. The good orange kind. The one that makes the wood floor glow.",
                        "If I sit on the rug at exactly 7:21, the light hits me perfectly. The mom always notices. I never let her catch me posing.",
                    ],
                },
            },
            // Bed
            {
                id: 'bed',
                x: 25, y: 59, w: 50, h: 27,
                labelFantasy: 'Throne of Returning Dreams',
                labelReality: 'The Big Bed',
                look: {
                    fantasy: [
                        "The Throne where dreams return to me each dusk. I am the only one who knows where the warm patch is.",
                        "A great battle was fought here last winter. The opposing forces lost. (It was a moth.)",
                    ],
                    reality: [
                        "The bed. The humans sleep here. I sleep here in the gap between them, which I have carefully measured.",
                        "There's a tuft of my fur on the green pillow. I tolerate this evidence of my reign being shared.",
                    ],
                },
                use: {
                    fantasy: "I shall not return to the Throne. There is too much to be done today.",
                    reality: "Not now. If I get back on the bed I will not get up again. The day must continue.",
                },
            },
            // Pillows (head)
            {
                id: 'pillows',
                x: 27, y: 48, w: 19, h: 14,
                labelFantasy: 'The Twin Cloud-Cushions',
                labelReality: 'The Head Pillows',
                look: {
                    fantasy: "Two cloud-cushions. The left one bears my impression. This is correct and just.",
                    reality: "The pillows. The mom's is on the left. I sleep on the dad's. He never says anything about it.",
                },
            },
            // Accent pillow
            {
                id: 'accent_pillow',
                x: 46, y: 45, w: 8, h: 6,
                labelFantasy: 'Cushion of the Checkered Truce',
                labelReality: 'The Green Checkered Pillow',
                look: {
                    fantasy: "A cushion of woven peace, placed by an unseen hand. I have not slept upon it. Perhaps I should.",
                    reality: "The little green pillow. The mom got it because 'the bed needed a pop.' Whatever that means. It does its job, I suppose.",
                },
            },
            // Blanket
            {
                id: 'blanket',
                x: 26, y: 63, w: 49, h: 23,
                labelFantasy: 'Mantle of Patterned Sleep',
                labelReality: 'The Duvet',
                look: {
                    fantasy: "A mantle stitched with patterns that move when no one is looking. I know this because I am, in fact, looking.",
                    reality: "The duvet. Green with white shapes. I have kneaded it for many minutes at a time. The fabric is forgiving.",
                },
            },
            // Plushie / stuffed animal on bed
            {
                id: 'plushie_bed',
                x: 48, y: 44, w: 6, h: 7,
                labelFantasy: 'The Small Vassal',
                labelReality: 'The Brown Plushie',
                look: {
                    fantasy: [
                        "A vassal. Small. Sworn to silent service of the household. He does not blink. None of them do.",
                        "He is not Pen-Gwyn — that is a separate matter, in a separate room. They have not yet met. They never will, if I have anything to say about it.",
                    ],
                    reality: [
                        "A small brown plushie. He's been here since the girl was tiny. The girl moved on. He did not.",
                        "He still has his original tag. The dad respects this.",
                    ],
                },
                talk: {
                    fantasy: "I greet thee, small vassal. Thy silence is noted. Thy loyalty is presumed.",
                    reality: "I touch noses with the plushie. The plushie does not respond. We are friends.",
                },
            },
            // Cat Tree
            {
                id: 'cat_tree',
                x: 6, y: 52, w: 18, h: 48,
                labelFantasy: 'The Spire of Vigilance',
                labelReality: 'The Cat Tree',
                look: {
                    fantasy: [
                        "The Spire of Vigilance, from whose summit I watch the kingdom for trespasses both real and imagined.",
                        "The dad assembled it. There was a great deal of mortal frustration. I observed without commenting. This was wise.",
                    ],
                    reality: [
                        "My cat tree. Three levels. The top perch has my impression worn into it.",
                        "The scratching post is a little frayed. This is the natural order. The mom is not allowed to replace it.",
                    ],
                },
                use: {
                    fantasy: "Not yet. The Spire is for sentry duty, not for the hour of waking.",
                    reality: "I'll climb it later. For atmospheric reasons.",
                },
            },
            // Nightstand
            {
                id: 'nightstand',
                x: 18, y: 65, w: 11, h: 24,
                labelFantasy: 'My Altar of First Light',
                labelReality: 'The Nightstand',
                look: {
                    fantasy: [
                        "My altar. Where the first thought of each morning is laid. I left a Whisker of First Vow upon it last week, when the moon was right.",
                        "Its single drawer has not opened in my lifetime. Some doors are not for cats.",
                    ],
                    reality: [
                        "The nightstand. The drawer sticks. The dad has been meaning to fix it.",
                        "There's a ring of dried-up water from a glass. The mom has been pretending not to see it.",
                    ],
                },
                take: {
                    item: 'whisker_tuft',
                    onceFantasy: "I claim the Whisker. The Sanctum knows my name once more.",
                    onceReality: "I take the whisker. Now it is officially in my possession. (It was always in my possession.)",
                },
            },
            // Alarm clock
            {
                id: 'alarm_clock',
                x: 22, y: 59, w: 5, h: 6,
                labelFantasy: 'The Counting Stone',
                labelReality: 'The Red Alarm Clock',
                look: {
                    fantasy: [
                        "The Counting Stone, which ticks the household's small ceremonies into being.",
                        "It is wrong by four minutes. I sense this. It has been wrong by four minutes for two years.",
                    ],
                    reality: [
                        "The alarm clock. Red. Boxy. Older than the mom's car.",
                        "It's been four minutes fast since the power went out two summers ago. Nobody has reset it. They've all adjusted.",
                    ],
                },
                use: {
                    fantasy: "I shall not interfere with the Counting Stone. Its drift is now part of the household covenant.",
                    reality: "If I bat at the buttons the mom will assume the dad messed with it. Tempting. I refrain. For now.",
                },
            },
            // Lamp
            {
                id: 'lamp_nightstand',
                x: 19, y: 55, w: 6, h: 11,
                labelFantasy: 'Pillar of Captured Sunlight',
                labelReality: 'The Bedside Lamp',
                look: {
                    fantasy: "Captured sunlight, bound in shade and base. The mortals call it forth when the great star has retired.",
                    reality: "The lamp. The shade is a little tilted. I tilt it. The dad straightens it. We have a rhythm.",
                },
                use: {
                    fantasy: "I shall not summon the captured sun. The Daylight Beacon already attends us.",
                    reality: "It's daytime. The lamp is for emergencies. (And emergencies are rare.)",
                },
            },
            // Glass of water
            {
                id: 'glass_water',
                x: 26, y: 63, w: 3, h: 5,
                labelFantasy: 'Chalice of the Held Lake',
                labelReality: 'A Glass of Water',
                look: {
                    fantasy: [
                        "A chalice, holding a small still lake. Sworn to the dad. He drinks from it in the night.",
                        "The lake remembers being a cloud. I respect this lineage.",
                    ],
                    reality: [
                        "The dad's water glass. He always leaves it here. The mom always sighs.",
                        "If I tip it now the dad will blame the mom. If I tip it tonight he'll blame himself. The math suggests waiting.",
                    ],
                },
            },
            // Books under bed
            {
                id: 'books_under',
                x: 36, y: 84, w: 8, h: 3,
                labelFantasy: 'The Hidden Tomes',
                labelReality: 'Two Books Under the Bed',
                look: {
                    fantasy: [
                        "Two tomes, kept where mortals will not see them. The red holds knowledge. The brown holds dust.",
                        "I shall not disturb the tomes. Their concealment is part of their power.",
                    ],
                    reality: [
                        "Two books. The mom hid them when she 'cleaned' before the in-laws came. They're still under there.",
                        "I have walked past them a hundred times. I let them keep their secret.",
                    ],
                },
            },
            // Dresser
            {
                id: 'dresser',
                x: 67, y: 57, w: 17, h: 25,
                labelFantasy: 'The Wardrobe of Memory',
                labelReality: 'The Dresser',
                look: {
                    fantasy: [
                        "A great wardrobe in which the family's seasons are folded. I have not opened it. Nor will I — out of dignity, mostly.",
                        "The top is a small portrait gallery. I am, regrettably, not depicted. The omission shall be corrected in due course.",
                    ],
                    reality: [
                        "The dresser. The dad's socks are in the top drawer. They are in pairs. This is not a guarantee — it is an aspiration.",
                        "On top: photos. None of me. I'm watching this trend.",
                    ],
                },
            },
            // Family photos cluster
            {
                id: 'family_photos',
                x: 68, y: 49, w: 16, h: 7,
                labelFantasy: 'The Gallery of Lineage',
                labelReality: 'The Family Photos',
                look: {
                    fantasy: [
                        "Five small portraits. They depict the household. They do not depict me. This is being looked into.",
                        "In the third frame, the girl was very small. The cat she held was not me. I do not ask questions.",
                    ],
                    reality: [
                        "Family photos. The mom's parents on the left. The dad's mom in the middle. The girl as a baby on the right.",
                        "There used to be a sixth frame. The dad will not say what happened to it.",
                    ],
                },
            },
            // Wall art (above dresser)
            {
                id: 'wall_art',
                x: 68, y: 44, w: 8, h: 6,
                labelFantasy: 'The Domestic Icon',
                labelReality: 'A Framed Print',
                look: {
                    fantasy: "An icon of the family arts. A figure tends to a smaller figure. The composition is, I admit, moving.",
                    reality: "A little print of a mother and a baby. The mom got it at a market years ago. It has not moved since.",
                },
            },
            // Drawings (left wall, above cat tree)
            {
                id: 'drawings_left',
                x: 15, y: 36, w: 15, h: 10,
                labelFantasy: 'The Younglings\' Prophecies',
                labelReality: 'Crayon Drawings Taped to the Wall',
                look: {
                    fantasy: [
                        "Prophecies, in crayon. The youngling foretold my arrival before she knew the word for cat. She drew me with a hat. A hat I do not wear, but might.",
                        "In one drawing I am taller than the house. This is, in spirit, correct.",
                    ],
                    reality: [
                        "The girl drew these. There are three of me, two of the dad, and one of a triceratops. The triceratops is wearing my collar.",
                        "She got the bell right. She always remembers the bell.",
                    ],
                },
            },
            // Drawings (right wall, near door)
            {
                id: 'drawings_right',
                x: 83, y: 37, w: 10, h: 9,
                labelFantasy: 'The Younglings\' Other Prophecies',
                labelReality: 'More Crayon Drawings',
                look: {
                    fantasy: [
                        "Further prophecies. These depict an alleged rabbit. I sense no rabbit nearby. The youngling speaks of futures.",
                        "Time, perhaps, will produce the rabbit. I shall be ready.",
                    ],
                    reality: [
                        "The girl drew two rabbits. We do not have a rabbit. The mom thinks it's a hint.",
                        "The dad thinks it is, quote, 'definitely a hint.'",
                    ],
                },
            },
            // Desk + laptop
            {
                id: 'laptop',
                x: 59, y: 87, w: 17, h: 8,
                labelFantasy: 'Tome of the Forbidden Hour',
                labelReality: 'The Open Laptop',
                look: {
                    fantasy: [
                        "An ancient grimoire, its single sigil glowing blue. To open it would be to glimpse forbidden hours.",
                        "Sitting upon it is a sacred act. I shall do it later, in private.",
                    ],
                    reality: [
                        "The laptop. The dad left it open. The screen will go dark in two minutes.",
                        "I have stepped on the keyboard before. He has not forgiven me, exactly, but he has filed it.",
                    ],
                },
                use: {
                    fantasy: "The Tome holds. I shall not yet seek its hour.",
                    reality: "If I walk across it now, the dad's important document will become a noodle. I am tempted. I refrain.",
                },
            },
            // Desk
            {
                id: 'desk',
                x: 55, y: 84, w: 29, h: 12,
                labelFantasy: 'The Plinth of the Tome',
                labelReality: 'The Desk',
                look: {
                    fantasy: "A plinth upon which the household's small labors are arrayed.",
                    reality: "The desk. The dad works here when 'he just needs ten minutes.' His ten minutes are negotiable.",
                },
            },
            // Wooden chest
            {
                id: 'wooden_chest',
                x: 87, y: 90, w: 6, h: 8,
                labelFantasy: 'The Reliquary',
                labelReality: 'A Small Wooden Box',
                look: {
                    fantasy: [
                        "A reliquary, bound in metal. Within: small ancestral artifacts of unknown name.",
                        "It has not been opened in many seasons. I respect the closure.",
                    ],
                    reality: [
                        "The little wooden box. The mom keeps spare keys in it. The dad does not know this.",
                        "If I knock it off the dad will spend an hour looking. I am, again, tempted.",
                    ],
                },
            },
            // Rug
            {
                id: 'rug',
                x: 45, y: 79, w: 22, h: 16,
                labelFantasy: 'The Round of Welcome',
                labelReality: 'The Round Rug',
                look: {
                    fantasy: "A round of welcome, soft beneath the paw. It marks the place where the day truly begins.",
                    reality: "The rug. Soft. The exact spot where the morning sun lands at 7:21. I have made this my own.",
                },
                use: {
                    fantasy: "I shall stand upon the Round at the appointed hour.",
                    reality: "Not yet 7:21. I'll be back.",
                },
            },
            // Ceiling lamp
            {
                id: 'ceiling_lamp',
                x: 49, y: 12, w: 6, h: 7,
                labelFantasy: 'The High Star',
                labelReality: 'The Pendant Light',
                look: {
                    fantasy: "The High Star. Hangs above all matters. Cold by day, warm by night, indifferent in both.",
                    reality: "The hanging light. The dad got it on the third trip to that store he hates.",
                },
            },
        ],
    },

    livingroom: {
        id: 'livingroom',
        chapter: 1,
        titleFantasy: 'The Great Hall',
        titleReality: 'Our Living Room',
        bgFantasy: ASSETS.livingroomFantasy,
        bgReality: ASSETS.livingroom,
        spawnX: 24,
        onEnterMonologue: {
            once: true,
            fantasy: "The Great Hall. The Throne is occupied by Pen-Gwyn, again. The Scrying Mirror flickers with a demon I have been meaning to address. I begin my work.",
            reality: "The living room. Pen-Gwyn is on my couch. The TV is showing the girl's cartoon. There is leftover pizza on the table. A full agenda.",
        },
        hotspots: [
            {
                id: 'throne',
                x: 22, y: 56, w: 24, h: 26,
                labelFantasy: 'The Throne of Endless Comfort',
                labelReality: 'The Green Couch',
                look: {
                    fantasy: [
                        "My throne. Carved of verdant velvet by hands that have long forgotten me. The seventh dynasty of cats sat here. I am the eighth, and the loudest.",
                        "The middle cushion holds my warmth even when I am elsewhere. This is a small magic, but it is mine.",
                        "Pen-Gwyn remains. The arrangement is not permanent. I will say nothing yet.",
                    ],
                    reality: [
                        "The green couch. The good couch. The humans bought it before I was born; my fur has been working on it since I arrived.",
                        "The middle cushion is mine. The penguin gets the right one. The left one is for guests, who are rare.",
                        "If you stand very still and listen, you can hear someone in the kitchen unwrapping cheese. This couch is the optimal staging post.",
                    ],
                },
                use: {
                    fantasy: "I shall not ascend the Throne while a usurper occupies it. Dignity, first.",
                    reality: "I'm not climbing up there while the penguin is winning. Principle.",
                },
            },
            {
                id: 'penguin',
                x: 33, y: 64, w: 8, h: 16,
                labelFantasy: 'Pen-Gwyn the Pretender',
                labelReality: 'The Penguin Plushie',
                look: {
                    fantasy: [
                        "Pen-Gwyn. He has been here since before my coronation, which is generous of him to ignore. He smiles. He always smiles.",
                        "I have asked him to step down. He has declined. I have asked him three more times. He has declined three more times.",
                        "One day Pen-Gwyn and I will speak of what passed between us. That day is not today. Today is a battle day, and the penguin has earned a brief reprieve.",
                    ],
                    reality: [
                        "The penguin plushie. He has been on this couch since I was a kitten. He has not moved on his own. I have moved him many times.",
                        "He smells faintly of the girl's shampoo. She used to take him to bed. Now she takes me. The transition went unremarked.",
                        "He has one bead-eye missing. The dad sewed it back on. The dad did not do a good job. The dad is not good at sewing.",
                    ],
                },
                talk: {
                    fantasy: [
                        "I greet thee, Pen-Gwyn. Step aside. — He maintains his smile. His silence is a strategy I respect, professionally.",
                        "Once more I propose terms. — His smile holds. We are now, technically, at war. He does not know this. That is the burden of leadership.",
                    ],
                    reality: [
                        "I touch noses with the penguin. The penguin does not respond. I take this as a draw.",
                        "I bat the penguin's foot once. Nothing. I respect the dedication.",
                    ],
                    sets: 'fluffy_vs_penguin',
                },
            },
            {
                id: 'window',
                x: 8, y: 18, w: 24, h: 42,
                labelFantasy: 'The Cosmic Window',
                labelReality: 'The Front Window',
                look: {
                    fantasy: [
                        "Through the Cosmic Window I see the front realm — and Grumbleknot, the Stone Sage of the flowerbed, who has watched this house since before this house.",
                        "Beyond him: the neighbors' roofs, a kingdom of locked-tight kitchens. Each contains a cat I do not yet know.",
                    ],
                    reality: [
                        "The front window. I can see the gnome from here. He is in the same spot. He has been in the same spot for six years.",
                        "Mrs. Patel's car is gone. That means Mrs. Patel's cat is alone. I will think on this.",
                    ],
                },
                use: { goto: 'garden' },
            },
            {
                id: 'archive',
                x: 50, y: 26, w: 14, h: 34,
                labelFantasy: 'Archive of the Old Reading',
                labelReality: 'The Bookshelves',
                look: {
                    fantasy: [
                        "The Archive. Each volume binds a teaching too patient for mortal eyes. I have not opened any of them. I do not need to. I AM the teaching.",
                        "On the second shelf rests a green ceramic apple. It is not an apple. It has never been an apple. It is a test.",
                    ],
                    reality: [
                        "The shelves. The dad calls them 'the books he means to read.' Some have been meant for eleven years.",
                        "There is a green ceramic apple on the second shelf. The girl made it. The dad says it's an apple. The mom says it's a pear. The girl will not settle this.",
                    ],
                },
                take: {
                    fantasy: "The Archive does not yield to claim. The volumes are weighed against me, gently.",
                    reality: "I cannot reach the books. The shelves are tall. This is, perhaps, by design.",
                },
            },
            {
                id: 'wyrm',
                x: 60, y: 50, w: 14, h: 18,
                labelFantasy: 'The Scrying Mirror',
                labelReality: 'The Television',
                look: {
                    fantasy: [
                        "The Scrying Mirror. Within it, the Wyrm of Ill Cartoon performs his eternal mockery. Lightning. Smug grin. He must be banished today.",
                        "The Wyrm is unaware that I have selected him. This is the privilege of selection.",
                    ],
                    reality: [
                        "The TV. The cartoon penguin is being electrocuted again. It is the girl's favorite show. The dad does not understand it. Neither do I, in fairness.",
                        "Someone left it on. The cartoon will loop until evening. It has the patience of a stone.",
                    ],
                },
                talk: {
                    fantasy: "I name thee, Wyrm. Depart. — The Wyrm continues to grin. As I expected. Names alone will not finish this.",
                    reality: "I meow at the TV. The TV does not turn off. I expected this. I had to try.",
                },
                useWith: {
                    talisman: {
                        ending: true,
                        fantasy: "I cast the Talisman before the Mirror. The Wyrm flinches. The Mirror flickers. He is BANISHED. The Hall is mine again.",
                        reality: "I drop the catnip-soaked yarn at the foot of the TV stand. It rolls. It catches the power strip toggle. The TV switches off with a small, dignified pop. I sit. I look at my work. I am satisfied.",
                    },
                    default: {
                        fantasy: "The relic finds no purchase upon the Wyrm. The hour is not yet right.",
                        reality: "I bat the item near the TV. The TV continues its broadcast. The arrangement of objects is not yet correct.",
                    },
                },
            },
            {
                id: 'flame',
                x: 76, y: 44, w: 6, h: 18,
                labelFantasy: 'The Captured Elemental Flame',
                labelReality: 'The Lava Lamp',
                look: {
                    fantasy: [
                        "An elemental, bottled by a careful hand and reduced to slow, sullen drifting. We do not speak. We have an understanding.",
                        "She — and she is a she — drifted left at dawn. Left again at dusk. This is the rhythm of her exile, and mine.",
                    ],
                    reality: [
                        "The lava lamp. The mom bought it as a joke. Nobody is laughing anymore. Everyone watches it.",
                        "When the blobs touch I feel something I cannot describe. The girl feels it too. We have not spoken of it.",
                    ],
                },
                talk: {
                    fantasy: "Speak, Flame. — She drifts. I take the drift as a 'no comment.'",
                    reality: "I sit before the lava lamp and wait. The blobs rise. Time becomes negotiable.",
                },
            },
            {
                id: 'altar_crumbs',
                x: 36, y: 80, w: 24, h: 14,
                labelFantasy: 'The Altar of Crumbs',
                labelReality: 'The Coffee Table',
                look: {
                    fantasy: [
                        "An altar. Offerings: a wheel of cheese-bread; two chalices, one violet, one pale; a small dark sigil that summons rectangles.",
                        "The cheese-bread is for me. I am almost certain. The signs align.",
                    ],
                    reality: [
                        "The coffee table. Last night's pizza. Two glasses. The remote and a game controller.",
                        "The pizza is cold. The mom said not to touch it. The dad said the same. They were emphatic.",
                    ],
                },
                use: {
                    fantasy: [
                        "I approach the Altar. The offerings refuse me — held back by some old domestic ward.",
                        "The cheese-bread is held by a power greater than mine. Greater, even, than appetite. This is the mom.",
                    ],
                    reality: [
                        "I sniff the pizza. The mom said no. I have a long memory for these things.",
                        "I bat the game controller. A button clicks. The TV does not change. The controller is, in some sense, ceremonial.",
                    ],
                },
            },
            {
                id: 'catnipFloor',
                x: 28, y: 90, w: 8, h: 6,
                labelFantasy: 'The Spilled Pouch of the Verdant Frenzy',
                labelReality: 'Spilled Catnip on the Floor',
                look: {
                    fantasy: [
                        "Herbs of the Verdant Frenzy, scattered upon the boards. Their scent is the brave thing I do not need.",
                        "They were spilled in last night's quiet skirmish. I shall not relive the details. (It was a piece of string.)",
                    ],
                    reality: [
                        "Catnip I knocked over yesterday. Nobody has cleaned it up. The dad says he'll do it later. He says this most days.",
                        "It is still very, very fragrant.",
                    ],
                },
                take: {
                    item: 'catnip_pouch',
                    onceFantasy: "I gather the Pouch. The Frenzy will follow me into the day.",
                    onceReality: "I scoop the catnip back into the pouch with my paw. Most of it. Most.",
                },
            },
            {
                id: 'royal_nest',
                x: 76, y: 70, w: 12, h: 14,
                labelFantasy: 'The Royal Nest of Restoration',
                labelReality: 'My Cat Bed',
                look: {
                    fantasy: [
                        "The Nest. Woven for me, of soft fibers, by the mom — who has a quiet hand in the running of the realm.",
                        "It is lined with the fur of past lives. Some of those lives were also me.",
                    ],
                    reality: [
                        "My cat bed. The mom got it after I kept sleeping in the laundry basket. It is, fine, comfortable.",
                        "I only use it when the humans are not looking. They want to see me use it. That is part of the negotiation.",
                    ],
                },
                use: {
                    fantasy: [
                        "I shall not rest. The Wyrm yet broadcasts.",
                        "Not while there is work. Restoration is earned.",
                    ],
                    reality: [
                        "Not now. Later. After I have done one thing.",
                        "If I get in the nest the day ends. The day cannot end yet.",
                    ],
                },
                searchItem: {
                    item: 'hair_tie',
                    onceFantasy: "Beneath the Nest I find the Ring of Mortal Weakness — relic of the girl's mane.",
                    onceReality: "I dig in the nest and find the pink hair tie. The girl has been looking for it for two days. I will not be returning it.",
                },
            },
            {
                id: 'food_temple',
                x: 84, y: 26, w: 12, h: 44,
                labelFantasy: 'The Path to the Food Bowl Temple',
                labelReality: 'The Kitchen Doorway',
                look: {
                    fantasy: [
                        "The Path. Beyond lies the Temple of the Bowl, where the Crunchy Offering manifests at dawn and at dusk. I sense the Bowl is empty. I shall log this grievance.",
                        "The fridge — the great gatekeeper — stands beyond the Path. I have made peace with the fridge. We do not interact often.",
                    ],
                    reality: [
                        "The kitchen. The food bowl is in there. So is the fridge. Both have opinions about me, neither of which I have asked for.",
                        "The mom is not in the kitchen yet. The Crunchy Offering must wait. Some hours feel longer than others.",
                    ],
                },
                use: {
                    fantasy: "The Temple shall be entered when the Wyrm is dealt with. Sequence matters.",
                    reality: "Not yet. I have a thing to finish first. The bowl will keep. Probably.",
                },
            },
            {
                id: 'upper_realms',
                x: 92, y: 56, w: 7, h: 30,
                labelFantasy: 'The Ascending Path',
                labelReality: 'The Stairs',
                look: {
                    fantasy: [
                        "The Ascending Path. Beyond its summit lie the Upper Realms — bedrooms, the linen closet, the high windows from which the world is small.",
                        "I will climb them. In time. The climb is a chapter unto itself.",
                    ],
                    reality: [
                        "The stairs. Twelve steps. I have counted. The seventh creaks. The dad has been meaning to fix it.",
                        "If I go up now I have to come down later. The math is unfavorable this morning.",
                    ],
                },
                use: {
                    fantasy: "I shall not ascend today. The Hall holds my attention.",
                    reality: "Not now. Plot reasons. (Chapter II climbs the stairs.)",
                },
            },
            {
                id: 'side_lamp',
                x: 2, y: 60, w: 12, h: 22,
                labelFantasy: 'Pillar of Captured Sunlight',
                labelReality: 'The Side Table Lamp',
                look: {
                    fantasy: [
                        "Captured sunlight, bound in metal and shade. The mortals call it forth when the great star has retired.",
                        "Its base bears the faint scar of my tail. A signature.",
                    ],
                    reality: [
                        "The lamp. The base is slightly chipped from where I knocked it last spring. I do not regret this.",
                        "The shade tilts a little. The dad straightens it. I tilt it. He straightens it. This has been going on for a while.",
                    ],
                },
            },
        ],
    },

    garden: {
        id: 'garden',
        chapter: 1,
        titleFantasy: 'The Forbidden Realm',
        titleReality: 'The Front Garden',
        bgFantasy: ASSETS.gardenFantasy,
        bgReality: ASSETS.garden,
        spawnX: 18,
        onEnterMonologue: {
            once: true,
            fantasy: "The Forbidden Realm. Grumbleknot the Stone Sage holds his post in the flowerbed, as he has since before the family. I greet him with the dignity owed.",
            reality: "The front garden. A little chilly. The gnome is in his usual spot. The Patel children have left a chalk drawing on the path. It is a sun, mostly.",
        },
        hotspots: [
            {
                id: 'gnome',
                x: 40, y: 54, w: 12, h: 28,
                labelFantasy: 'Grumbleknot, the Stone Sage',
                labelReality: 'The Garden Gnome',
                look: {
                    fantasy: [
                        "Grumbleknot. Bearded. Unmoving. He has watched this house since before this house. His silence is the kind that costs something.",
                        "I have, on previous visits, declared myself his equal. He did not contradict. I take this as accord.",
                    ],
                    reality: [
                        "The garden gnome. Ceramic. About eighteen inches tall. He has been in this spot for six years.",
                        "The mom bought him at a yard sale. She said he was lonely. He has been here ever since.",
                    ],
                },
                talk: { tree: 'gnome_tree' },
            },
            {
                id: 'bush',
                x: 70, y: 64, w: 14, h: 18,
                labelFantasy: 'The Cursed Grove of Thorns',
                labelReality: 'The Rosemary Bush',
                look: {
                    fantasy: [
                        "The Grove. Its thorns whisper of an Orb tangled within. They have whispered for some weeks now. They are not subtle.",
                        "The leaves smell of an old kitchen. A clue, perhaps. Or a recipe.",
                    ],
                    reality: [
                        "The rosemary. The mom uses it on Sundays. There's a tangled red yarn ball stuck in it. I put it there. I forgot until now.",
                        "It scrapes my back when I crawl through it. I crawl through it anyway. Habit.",
                    ],
                },
                take: {
                    item: 'yarn_ball',
                    onceFantasy: "I free the Orb from the Cursed Grove. Destiny is now in MY paws, where it belongs.",
                    onceReality: "I work the yarn ball free. I have a leaf on my tail. This is a fair trade.",
                },
            },
            {
                id: 'monolith',
                x: 12, y: 38, w: 9, h: 38,
                labelFantasy: 'The Monolith of Sent Messages',
                labelReality: 'The Mailbox',
                look: {
                    fantasy: [
                        "An iron monolith, etched in the runes of summons. The pigeons of obligation arrive here daily, bearing tidings the family does not wish to read.",
                        "There is a small banner upon its side. It can be raised. I do not know what would happen. I respect it too much to find out.",
                    ],
                    reality: [
                        "The mailbox. There is a bill sticking out. The dad said he'd get it. He has not gotten it.",
                        "The little red flag is up. The mom must have sent something. The mom sends letters in pen.",
                    ],
                },
                use: {
                    fantasy: "The Monolith is not mine to invoke. There are rituals it knows that I do not.",
                    reality: "I cannot reach the mailbox. The post is too tall and the box does not have a handle for cats.",
                },
            },
            {
                id: 'flowerbed',
                x: 26, y: 70, w: 14, h: 16,
                labelFantasy: 'The Bed of First Colors',
                labelReality: 'The Flowerbed',
                look: {
                    fantasy: [
                        "The Bed of First Colors. Each bloom was placed by the mom, who has a quiet contract with the soil.",
                        "I am not to enter the Bed. Grumbleknot watches. It is one of his offices.",
                    ],
                    reality: [
                        "The flowers. The mom planted them in spring. She talks to them. They look fine, so the talking is working.",
                        "I am not allowed in the flowerbed. The mom said. The mom said it once, with feeling, and I have remembered.",
                    ],
                },
            },
            {
                id: 'chalk',
                x: 50, y: 86, w: 16, h: 10,
                labelFantasy: 'A Glyph of the Younglings',
                labelReality: 'A Chalk Drawing on the Path',
                look: {
                    fantasy: [
                        "A glyph in pale dust, drawn by the children of the Patel house. It is a sun. It might also be me. I am open to both.",
                        "Rain will erase it tonight. Younglings know this. They draw anyway. There is a lesson.",
                    ],
                    reality: [
                        "Chalk drawing. The Patel kids did it after lunch. It's a sun with eyelashes.",
                        "There's a smaller drawing next to it. It might be me. It has a tail.",
                    ],
                },
            },
            {
                id: 'doorBack',
                x: 0, y: 18, w: 8, h: 60,
                labelFantasy: 'The Veil-Path Home',
                labelReality: 'Back into the House',
                look: { fantasy: "The veil-path returns to the Hall.", reality: "Back inside, through the window the mom left open. I will use it as if I planned to all along." },
                use: { goto: 'livingroom' },
            },
        ],
    },
};

// ----------------------- DIALOGUE -----------------------

export const DIALOGUE_TREES = {
    gnome_tree: {
        start: 'g_intro',
        nodes: {
            g_intro: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                portrait: 'gnome',
                fantasy: "...",
                reality: "...",
                hint: { fantasy: "He has not yet acknowledged me. I must address him plainly. He respects plainness.", reality: "He's a gnome. He does not move. It is still the polite thing to address him." },
                choices: [
                    { text: '"Grumbleknot. I have come."', next: 'g_announce' },
                    { text: '"Good morning, gnome."', next: 'g_polite' },
                    { text: 'Sit beside him a moment.', next: 'g_sit' },
                    { text: 'Step away. The day is busy.', next: null },
                ],
            },
            g_announce: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                fantasy: "Grumbleknot's silence is the longest kind. I take it as recognition. He knows what I have come for. He always knows.",
                reality: "He does not say anything. He continues to be a gnome. I take this as encouragement.",
                choices: [
                    { text: '"What is mine to do today, sage?"', next: 'g_quest' },
                    { text: '"How is the Wyrm best put down?"', next: 'g_wyrm' },
                    { text: '"Farewell."', next: null },
                ],
            },
            g_polite: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                fantasy: "He inclines, by degree of weather. I am pleased. Mannered conversation oils all kingdoms.",
                reality: "He does not respond. I take a polite step nearer. He still does not respond. We have a good thing going.",
                choices: [
                    { text: '"What is mine to do today?"', next: 'g_quest' },
                    { text: 'Sit beside him a moment.', next: 'g_sit' },
                    { text: '"Until next time."', next: null },
                ],
            },
            g_sit: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                fantasy: "We sit. The wind moves a flower. He has not blinked. I have not blinked. This is among my favorite conversations.",
                reality: "I sit by the gnome for a moment. The Patel children's chalk drawing is fading where the path is wet. A car goes by somewhere. It is, on balance, a good morning.",
                sets: 'fluffy_sat_with_gnome',
                choices: [
                    { text: '"What is mine to do today?"', next: 'g_quest' },
                    { text: 'Rise and go.', next: null },
                ],
            },
            g_quest: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                fantasy: "Grumbleknot's counsel comes plainly: 'The Wyrm flickers in the Hall. Bind the Orb in the Frenzy. Cast it at the Mirror's foot. The Mirror knows when it is finished.'",
                reality: "I stare at the gnome long enough that the plan becomes clear in my head. Soak the yarn in catnip. Drop it by the TV. Whatever happens, happens. It will be enough.",
                sets: 'gnome_quest_received',
                choices: [
                    { text: '"It is done before it is begun."', next: null },
                    { text: '"And further wisdom?"', next: 'g_wyrm' },
                ],
            },
            g_wyrm: {
                speakerFantasy: 'Grumbleknot, the Stone Sage',
                speakerReality: 'The Garden Gnome',
                fantasy: "He intones, silently: 'Steel will not undo the Wyrm. The Orb, soaked, bound, is enough. No more is asked of thee.'",
                reality: "The gnome continues to be a gnome. The plan, however, has firmed up. I will combine the items. I will go to the TV. The TV will do what TVs do.",
                sets: 'gnome_quest_received',
                choices: [
                    { text: '"Then I go."', next: null },
                ],
            },
        },
    },
};

// ----------------------- QUESTS -----------------------

export const QUESTS = [
    { id: 'q_awaken',  titleFantasy: 'Rise and Walk the Hall',           titleReality: 'Get up and look around',           descFantasy: "A morning has come. The Sanctum and the Hall await my inspection.",                    descReality: "It's morning. Stretch. Look around. Take stock of what's where today." },
    { id: 'q_relics',  titleFantasy: 'Gather the Four Relics',           titleReality: 'Collect everything worth keeping', descFantasy: "Whisker, Pouch, Orb, Ring. Without them, no work is finished.",                       descReality: "Whisker, catnip, yarn, hair tie. Cats keep things. Keep things." },
    { id: 'q_sage',    titleFantasy: 'Counsel of Grumbleknot',           titleReality: 'Visit the gnome',                  descFantasy: "Seek the Stone Sage. He has weighed the matter.",                                      descReality: "The gnome is in the front garden. Sit with him. He has, in his way, an opinion." },
    { id: 'q_forge',   titleFantasy: 'Bind the Orb in Frenzy',           titleReality: 'Combine the catnip and yarn',      descFantasy: "Anoint the Orb with the Verdant Frenzy.",                                              descReality: "Open the satchel. Tap Combine. Catnip and yarn. It works because it has to work." },
    { id: 'q_slay',    titleFantasy: 'Banish the Wyrm of Ill Cartoon',   titleReality: 'Switch the TV off',                descFantasy: "Cast the bound Orb at the Scrying Mirror. The Wyrm shall not endure.",                  descReality: "Drop the catnip-soaked yarn at the foot of the TV stand. Trust the household." },
];

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
    'catnip_pouch|yarn_ball': {
        result: 'talisman',
        consume: ['catnip_pouch','yarn_ball'],
        fantasy: "I bind the Pouch to the Orb. The Talisman of the Verdant Frenzy is mine. The Wyrm has lost the hour.",
        reality: "I roll the yarn ball through the spilled catnip. It is now a slightly damp, slightly green yarn ball. It will do what it must.",
    },
};


// ----------------------- FLUFFY HIMSELF -----------------------
// When the player clicks Fluffy directly, route through this table.
// Lines cycle with repeat clicks (`pickByCount`). A per-room override may
// override the generic line if present. Reality and Fantasy variants are
// both warm — Fluffy is utterly self-assured, the contrast is the humor.
export const FLUFFY_SELF = {
    labelFantasy: 'Myself, the Demon Destroyer',
    labelReality: 'Me',
    look: {
        fantasy: [
            "I behold myself. Magnificent. As expected.",
            "Coat of midnight. Eyes of jade. Bearing: regal. Posture: feared.",
            "I am the prophecy. The prophecy looks well today.",
        ],
        reality: [
            "I am a black housecat. I have always been a black housecat. It is going fine.",
            "I look down at my paws. Still four. Still mine.",
            "I check my fur. It is correct. As always.",
        ],
        byRoom: {
            bedroom: {
                fantasy: "Even in repose I am formidable. The Sanctum bears witness.",
                reality: "I sit on the rug. The sunlight has not reached me yet. It will.",
            },
            livingroom: {
                fantasy: "Here, in the Great Hall, my silhouette throws long shadows. As is correct.",
                reality: "I stand in the middle of the living room. The couch is to my left. I know.",
            },
            garden: {
                fantasy: "Even in the Forbidden Realm I am unbothered. This is the trick of it.",
                reality: "I am a black cat in a garden. The bees do not know what to do about this.",
            },
        },
    },
    use: { // "Touch" in the verb panel — Fluffy grooms / preens
        fantasy: [
            "I groom my flank. Even at rest, I keep my edges keen.",
            "A single lick to the paw. A blade is sharpened in many ways.",
            "I attend to my coat. The Realm will not have a scruffy Destroyer.",
        ],
        reality: [
            "I lick my paw. Twice. It is a necessary chore.",
            "I groom my shoulder. The mom keeps trying to brush me. She does not understand my system.",
            "A quick clean of the chest fur. Maintenance.",
        ],
    },
    talk: {
        fantasy: [
            "I commune with myself. The conversation, as ever, is excellent.",
            "I speak softly to my own greatness. Modesty, but only just.",
            "'Fluffy,' I say to Fluffy, 'you are doing extraordinary work today.' I do not disagree.",
        ],
        reality: [
            "I meow, quietly, to no one. To me. I am the only one listening, and I am the right audience.",
            "A soft 'mrrp' for my own benefit. The humans are not here. The cat is enough.",
            "I murmur. It is between me and me.",
        ],
    },
    take: {
        // You cannot pick yourself up. (Used with verb 'Take' / 'Claim'.)
        fantasy: [
            "I cannot pocket what I already am.",
            "One does not carry the Demon Destroyer. One IS carried — by legend.",
        ],
        reality: [
            "I am a whole cat. I cannot pick up a whole cat.",
            "That is not how cats work. I would know.",
        ],
    },
};

export const CHAPTER_META = {
    id: 'ch1',
    number: 'I',
    titleFantasy: 'The Apartment Kingdom',
    titleReality: 'Tuesday Morning, Apartment 4B',
    epigraph: '"Demon Destroyer of Worlds. Guardian of the Apartment Kingdom. The food bowl remains a matter of grave concern."',
    startRoom: 'bedroom',
    endingMonologue: {
        fantasy: "The Wyrm is silent. The Mirror is dark. The Apartment Kingdom holds. Eight realms still await me — but this one is finished, and finished well.",
        reality: "The TV is off. The apartment is quiet again. I sit a moment, where I have done my work. Soon I will check the food bowl. I have earned the check.",
        outro: "— END OF CHAPTER I —",
        subOutro: "The story continues in Chapter II: 'The Food Bowl Temple'",
    },
};
