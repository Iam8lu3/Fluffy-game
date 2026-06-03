import { useEffect, useRef, useState } from 'react';

// Per-room AND per-mode tracks. Either side may be null; the hook falls back
// to the other side if one is missing so every room has SOMETHING playing as
// long as one track is provided.
//
// Composer-uploaded files live in /app/frontend/public is NOT used —
// instead we reference the user's customer-assets URLs directly so they are
// available without rebuild.
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

const TRACKS = {
    // Title screen
    menu:       { fantasy: INTRO_SCREEN,      reality: INTRO_SCREEN },
    // Chapter I  — The Apartment Kingdom (bedroom, living room, garden)
    bedroom:    { fantasy: APARTMENT_KINGDOM, reality: APARTMENT_KINGDOM },
    livingroom: { fantasy: APARTMENT_KINGDOM, reality: APARTMENT_KINGDOM },
    garden:     { fantasy: APARTMENT_KINGDOM, reality: APARTMENT_KINGDOM },
    // Chapter II — The Food Bowl Temple
    foodbowl:   { fantasy: FOOD_BOWL_TEMPLE,  reality: FOOD_BOWL_TEMPLE },
    // Chapter III — The Curtain Realm
    curtain:    { fantasy: CURTAIN_REALM,     reality: CURTAIN_REALM },
    // Chapter IV — The Laundry Labyrinth
    laundry:    { fantasy: LAUNDRY_LABYRINTH, reality: LAUNDRY_LABYRINTH },
    // Chapter V — The Bathroom Ocean
    bathroom:   { fantasy: BATHROOM_OCEAN,    reality: BATHROOM_OCEAN },
    // Chapter VI — The Back Alley Kingdom
    alley:      { fantasy: BACK_ALLEY,        reality: BACK_ALLEY },
    // Chapter VII — The Rooftop Throne
    rooftop:    { fantasy: ROOFTOP_THRONE,    reality: ROOFTOP_THRONE },
    // Chapter VIII — The Human Servant Trials
    humans:     { fantasy: SERVANT_TRIALS,    reality: SERVANT_TRIALS },
    // Chapter IX — The Cosmic Window
    cosmic:     { fantasy: COSMIC_WINDOW,     reality: COSMIC_WINDOW },
};

const VOL_KEY = 'fluffy_music_vol';
const MUTE_KEY = 'fluffy_music_muted';

function resolveTrack(roomId, mode) {
    const room = TRACKS[roomId] || {};
    return room[mode] || room[mode === 'fantasy' ? 'reality' : 'fantasy'] || null;
}

export default function useAmbientMusic(roomId, mode = 'fantasy') {
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(() => {
        try { return localStorage.getItem(MUTE_KEY) === '1'; } catch (err) { console.warn('[Fluffy] music: read mute failed:', err); return false; }
    });
    const [volume, setVolume] = useState(() => {
        try { const v = Number(localStorage.getItem(VOL_KEY)); return Number.isFinite(v) && v > 0 ? v : 0.45; } catch (err) { console.warn('[Fluffy] music: read volume failed:', err); return 0.45; }
    });

    useEffect(() => {
        try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (err) { console.warn('[Fluffy] music: write mute failed:', err); }
        if (audioRef.current) audioRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        try { localStorage.setItem(VOL_KEY, String(volume)); } catch (err) { console.warn('[Fluffy] music: write volume failed:', err); }
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const src = resolveTrack(roomId, mode);
        if (!src) {
            if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; audioRef.current = null; }
            return;
        }
        if (!audioRef.current) {
            const a = new Audio(src);
            a.loop = true;
            a.volume = volume;
            a.muted = muted;
            audioRef.current = a;
            a.play().catch(() => {});
        } else if (!audioRef.current.src.endsWith(src.split('/').pop())) {
            // Soft crossfade — quick fade-out, swap src, quick fade-in
            const a = audioRef.current;
            const targetVol = volume;
            const fadeOut = setInterval(() => {
                if (a.volume > 0.02) a.volume = Math.max(0, a.volume - 0.05);
                else {
                    clearInterval(fadeOut);
                    a.src = src;
                    a.play().catch(() => {});
                    const fadeIn = setInterval(() => {
                        if (a.volume < targetVol - 0.02) a.volume = Math.min(targetVol, a.volume + 0.04);
                        else { a.volume = targetVol; clearInterval(fadeIn); }
                    }, 60);
                }
            }, 50);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, mode]);

    useEffect(() => {
        const tryPlay = () => { if (audioRef.current && audioRef.current.paused) audioRef.current.play().catch(() => {}); };
        window.addEventListener('pointerdown', tryPlay, { once: true });
        return () => window.removeEventListener('pointerdown', tryPlay);
    }, []);

    return { muted, setMuted, volume, setVolume };
}
