import { useEffect, useRef, useState } from 'react';

// Per-room AND per-mode tracks. Either side may be null; the hook falls back
// to the other side if one is missing so every room has SOMETHING playing as
// long as one track is provided.
// To add tracks, drop the URL (or local path like '/audio/garden.mp3') in the
// appropriate slot below. Designed for the user's stated future goal: one
// soundtrack per room per mode.
const TRACKS = {
    menu: {
        fantasy: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/hc20i8mu_The%20Master%20Bedroom%20%E2%80%93%20Just%20After%20Sunrise.mp3',
        reality: null,
    },
    bedroom: {
        fantasy: 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/hc20i8mu_The%20Master%20Bedroom%20%E2%80%93%20Just%20After%20Sunrise.mp3',
        reality: null,
    },
    livingroom: { fantasy: null, reality: null },
    garden:     { fantasy: null, reality: null },
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
