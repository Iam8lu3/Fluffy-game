// ============================================================================
// Future-chapter ROOM SHELLS  ─  Chapters II through IX
// ----------------------------------------------------------------------------
// Each entry below is a PLACEHOLDER skeleton:
//   - The room id and title strings are wired (so the chapter card / map can
//     reference them today without crashing).
//   - The artwork URLs point at the existing Chapter I art as a graceful
//     fallback — this lets developers preview navigation without art assets.
//   - The `hotspots: []` array is intentionally empty. Once concept art for
//     a chapter arrives, swap in the proper URL on `bgFantasy` / `bgReality`
//     and start adding hotspots one at a time.
//
// To activate a chapter in-game:
//   1. Replace the `bgFantasy` / `bgReality` URLs with the new art.
//   2. Populate `hotspots: [...]` following the Chapter I pattern.
//   3. Add a door hotspot in the connecting room with `{ use: { goto: '<id>' } }`.
//   4. Audio is already mapped per room id in `useAmbientMusic.jsx`.
// ----------------------------------------------------------------------------

import { ASSETS } from './chapter1';

// Placeholder bg until concept art arrives — uses Chapter I art so the room
// is at least navigable for early playtesting.
const PLACEHOLDER_F = ASSETS.bedroomFantasy;
const PLACEHOLDER_R = ASSETS.bedroom;

export const FUTURE_ROOMS = {
    // ─── Chapter II ───────────────────────────────────────────────────────
    foodbowl: {
        id: 'foodbowl',
        chapter: 2,
        titleFantasy: 'The Food Bowl Temple',
        titleReality: 'The Feeding Corner',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 30,
        hotspots: [],
    },
    // ─── Chapter III ──────────────────────────────────────────────────────
    curtain: {
        id: 'curtain',
        chapter: 3,
        titleFantasy: 'The Border Realm',
        titleReality: 'The Curtain Window',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 25,
        hotspots: [],
        // First appearance of Queen LaSqueeka on the upper-right climbing shelf.
    },
    // ─── Chapter IV ───────────────────────────────────────────────────────
    laundry: {
        id: 'laundry',
        chapter: 4,
        titleFantasy: 'The Laundry Labyrinth',
        titleReality: 'The Basement Laundry',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 50,
        hotspots: [],
    },
    // ─── Chapter V ────────────────────────────────────────────────────────
    bathroom: {
        id: 'bathroom',
        chapter: 5,
        titleFantasy: 'The Bathroom Ocean',
        titleReality: 'The Bathroom',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 35,
        hotspots: [],
    },
    // ─── Chapter VI ───────────────────────────────────────────────────────
    alley: {
        id: 'alley',
        chapter: 6,
        titleFantasy: 'The Back Alley Kingdom',
        titleReality: 'The Back Alley',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 20,
        hotspots: [],
    },
    // ─── Chapter VII ──────────────────────────────────────────────────────
    rooftop: {
        id: 'rooftop',
        chapter: 7,
        titleFantasy: 'The Rooftop Throne',
        titleReality: 'The Rooftop',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 60,
        hotspots: [],
    },
    // ─── Chapter VIII ─────────────────────────────────────────────────────
    humans: {
        id: 'humans',
        chapter: 8,
        titleFantasy: 'The Human Servant Trials',
        titleReality: 'Time for Medicine',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 65,
        hotspots: [],
    },
    // ─── Chapter IX ───────────────────────────────────────────────────────
    cosmic: {
        id: 'cosmic',
        chapter: 9,
        titleFantasy: 'The Cosmic Window',
        titleReality: 'The Window at Night',
        bgFantasy: PLACEHOLDER_F,
        bgReality: PLACEHOLDER_R,
        spawnX: 50,
        hotspots: [],
    },
};

// Concept-art briefs for each room live in `/app/memory/CONCEPT_ART_BIBLE.md`.
