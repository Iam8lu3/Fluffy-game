// Character roster — both already-playable and upcoming.
// Each character carries enough data to support eventual playable-character mode
// (sprite, dual-reality identity, voice, default verbs, etc.).

export const CHARACTERS = {
    fluffy: {
        id: 'fluffy',
        status: 'main',
        nameFantasy: 'Fluffy, Demon Destroyer of Worlds',
        nameReality: 'Fluffy',
        species: 'Black housecat',
        sprite: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/e7nxl8cp_1.png',
        accent: '#7adc6e', // green eyes
        introducedIn: 'Chapter I',
        bioFantasy: "Guardian of the Apartment Kingdom. Scourge of the Vacuum. Master of the Morning Patrol. Knower of where the cheese-bread is kept.",
        bioReality: "A small black housecat with a red collar and a gold bell. Lives in apartment 4B. Has very strong opinions about the vacuum.",
    },
    laSqueeka: {
        id: 'laSqueeka',
        status: 'upcoming', // not playable yet — appears in a future chapter
        nameFantasy: 'Queen LaSqueeka, Sovereign of the Glider Dominion',
        nameReality: 'A small sugar glider with a tiara',
        species: 'Sugar glider',
        sprite: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/w1ddmtbs_Queen%20LaSqueeka.png',
        accent: '#b89aff', // lavender / violet eyes + crown gems
        introducedIn: 'A future chapter',
        bioFantasy: "Sovereign of the Glider Dominion. Cartographer of the Sky-Court of the Thousand Acorns. Rules from the Acorn Throne beneath the Moonlit Canopies. Insists upon being addressed by her full and proper name — Queen LaSqueeka. Anything less is considered terribly uncivilized.",
        bioReality: "A small brown sugar glider with chestnut fur, a cream belly, oversized ears, and impossibly large violet eyes. Wears a delicate silver tiara set with lavender gems and a golden acorn pendant. When she spreads her gliding membrane it reads, to her, as a queen unfurling her ceremonial robes.",
        firstMeeting: "When the Demon Destroyer of Worlds and the Sovereign of the Glider Dominion first meet, both will calmly explain to the other that the Apartment Kingdom is, in fact, their personal province. The disagreement remains unresolved.",
        playableNote: "Temporarily playable upon their first encounter — Queen LaSqueeka has her own Fantasy + Reality readings of every room she enters.",
        title: 'The Rival Sovereign',
        oneRule: 'One must always address her by her FULL and PROPER name. Not LaSqueeka. Not Queen. Not Your Majesty. Queen LaSqueeka.',
    },
};

export const UPCOMING_CHARACTERS = Object.values(CHARACTERS).filter(c => c.status === 'upcoming');
