import { useEffect, useState } from 'react';

/**
 * Ambient music — module-level singleton.
 *
 * One <audio> element is shared by every screen (MainMenu, Game, Trailer…) so
 * that navigating between screens does NOT leave an orphaned audio object
 * playing the previous zone's track. Moving between rooms or screens just
 * swaps the src on the singleton with a soft crossfade.
 *
 * Volume + mute live here (single source of truth) and are persisted to
 * localStorage under `fluffy_music_vol` / `fluffy_music_muted`.
 *
 * Composer-uploaded files are referenced directly via customer-assets URLs.
 */
const APARTMENT_KINGDOM = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/dcnbec0u_Fluffy%20The%20apartment%20kingdom.mp3';
const INTRO_SCREEN      = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/aic7e8tz_Fluffy%20Nine%20Lives%2C%20Nine%20Legends%2C%20intro%20screen.mp3';
const FOOD_BOWL_TEMPLE  = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/1zdcasjr_Fluffy%20The%20Food%20bowl%20Temple.mp3';
const CURTAIN_REALM     = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/mfq00gfc_Fluffy%20The%20Curtain%20Realm.mp3';
const LAUNDRY_LABYRINTH = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/flmh5sya_Fluffy%20The%20Laundry%20labyrinth.mp3';
const BATHROOM_OCEAN    = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/9c37q667_Fluffy%20The%20Bathroom%20ocean.mp3';
const BACK_ALLEY        = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/tp6ckoxf_Fluffy%20The%20Back%20to%20Alley%20Kingdom.mp3';
const ROOFTOP_THRONE    = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/5h0kiqxm_Fluffy%20The%20Rooftop%20throne.mp3';
const SERVANT_TRIALS    = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/1fa31anz_Fluffy%20The%20Human%20servant%20trials.mp3';
const COSMIC_WINDOW     = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/eb0ynrt9_Fluffy%20The%20Cosmic%20window.mp3';

// One track per zone (room id). Same track is used for fantasy & reality —
// dual-track-per-room is on the roadmap but not implemented yet.
const TRACKS = {
    menu:       INTRO_SCREEN,
    // Chapter I  — The Apartment Kingdom
    bedroom:    APARTMENT_KINGDOM,
    livingroom: APARTMENT_KINGDOM,
    garden:     APARTMENT_KINGDOM,
    // Chapter II onward placeholders
    foodbowl:   FOOD_BOWL_TEMPLE,
    curtain:    CURTAIN_REALM,
    laundry:    LAUNDRY_LABYRINTH,
    bathroom:   BATHROOM_OCEAN,
    alley:      BACK_ALLEY,
    rooftop:    ROOFTOP_THRONE,
    humans:     SERVANT_TRIALS,
    cosmic:     COSMIC_WINDOW,
};

const VOL_KEY  = 'fluffy_music_vol';
const MUTE_KEY = 'fluffy_music_muted';

// -------------------- Singleton state --------------------
let globalAudio   = null;
let currentSrc    = '';
let pendingFadeIv = null;
let globalVolume  = (() => {
    try { const v = Number(localStorage.getItem(VOL_KEY)); return Number.isFinite(v) && v > 0 ? v : 0.45; }
    catch { return 0.45; }
})();
let globalMuted   = (() => {
    try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
})();
const subscribers = new Set();

function notify() { subscribers.forEach(fn => fn()); }

function ensureAudio() {
    if (!globalAudio) {
        const a = new Audio();
        a.loop   = true;
        a.volume = globalVolume;
        a.muted  = globalMuted;
        globalAudio = a;
    }
    return globalAudio;
}

function clearFade() {
    if (pendingFadeIv) { clearInterval(pendingFadeIv); pendingFadeIv = null; }
}

function setSource(src) {
    // Empty src — pause and clear.
    if (!src) {
        clearFade();
        if (globalAudio) globalAudio.pause();
        currentSrc = '';
        return;
    }
    const a = ensureAudio();
    // Same zone — just make sure it's playing.
    if (currentSrc === src) {
        if (a.paused) a.play().catch(() => {});
        return;
    }
    currentSrc = src;
    clearFade();
    // First-time load OR fresh src after a pause: play directly.
    if (!a.src) {
        a.src = src;
        a.volume = globalMuted ? 0 : globalVolume;
        a.play().catch(() => {});
        return;
    }
    // Crossfade: fade out → swap src → fade in.
    const targetVol = globalVolume;
    pendingFadeIv = setInterval(() => {
        if (a.volume > 0.04) {
            a.volume = Math.max(0, a.volume - 0.06);
        } else {
            clearInterval(pendingFadeIv);
            a.src = src;
            a.volume = 0;
            a.play().catch(() => {});
            pendingFadeIv = setInterval(() => {
                if (a.volume < targetVol - 0.04) {
                    a.volume = Math.min(targetVol, a.volume + 0.05);
                } else {
                    a.volume = globalMuted ? 0 : targetVol;
                    clearInterval(pendingFadeIv);
                    pendingFadeIv = null;
                }
            }, 55);
        }
    }, 45);
}

function setGlobalVolume(v) {
    const clamped = Math.max(0, Math.min(1, v));
    globalVolume = clamped;
    try { localStorage.setItem(VOL_KEY, String(clamped)); } catch { /* noop */ }
    if (globalAudio && !pendingFadeIv && !globalMuted) globalAudio.volume = clamped;
    notify();
}

function setGlobalMuted(m) {
    globalMuted = !!m;
    try { localStorage.setItem(MUTE_KEY, globalMuted ? '1' : '0'); } catch { /* noop */ }
    if (globalAudio) globalAudio.muted = globalMuted;
    notify();
}

// Browsers block autoplay until the first user gesture — once we have one,
// any audio that was created before the gesture can finally start.
if (typeof window !== 'undefined') {
    const kick = () => {
        if (globalAudio && globalAudio.src && globalAudio.paused) {
            globalAudio.play().catch(() => {});
        }
    };
    window.addEventListener('pointerdown', kick);
    window.addEventListener('keydown', kick);
}

/**
 * useAmbientMusic(roomId)
 * Drives the singleton audio to whatever track this room/zone owns.
 * `mode` is accepted for backwards compatibility but currently unused —
 * a single track plays in both Fantasy and Reality for a given room.
 */
export default function useAmbientMusic(roomId /*, mode */) {
    const [, force] = useState(0);

    // Subscribe so volume/mute changes anywhere re-render every consumer.
    useEffect(() => {
        const fn = () => force(n => n + 1);
        subscribers.add(fn);
        return () => { subscribers.delete(fn); };
    }, []);

    // Drive the singleton's source from this consumer's room.
    useEffect(() => {
        setSource(TRACKS[roomId] || '');
    }, [roomId]);

    return {
        muted:     globalMuted,
        volume:    globalVolume,
        setMuted:  setGlobalMuted,
        setVolume: setGlobalVolume,
    };
}
