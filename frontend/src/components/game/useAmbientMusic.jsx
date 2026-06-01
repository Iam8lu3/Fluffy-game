import React, { useEffect, useRef, useState } from 'react';

// Per-chapter / per-room music. Drop user-uploaded files into /app/frontend/public/audio/
// and add their paths here. The component is silent until a file is provided.
const TRACKS = {
    default:    null,
    menu:       'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/hc20i8mu_The%20Master%20Bedroom%20%E2%80%93%20Just%20After%20Sunrise.mp3',
    bedroom:    'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/hc20i8mu_The%20Master%20Bedroom%20%E2%80%93%20Just%20After%20Sunrise.mp3',
    livingroom: null,  // awaiting upload
    garden:     null,  // awaiting upload
};

const VOL_KEY = 'fluffy_music_vol';
const MUTE_KEY = 'fluffy_music_muted';

export default function useAmbientMusic(roomId) {
    const audioRef = useRef(null);
    const [muted, setMuted] = useState(() => {
        try { return localStorage.getItem(MUTE_KEY) === '1'; } catch { return false; }
    });
    const [volume, setVolume] = useState(() => {
        try { const v = Number(localStorage.getItem(VOL_KEY)); return Number.isFinite(v) && v > 0 ? v : 0.45; } catch { return 0.45; }
    });

    useEffect(() => {
        try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch { /* */ }
        if (audioRef.current) audioRef.current.muted = muted;
    }, [muted]);

    useEffect(() => {
        try { localStorage.setItem(VOL_KEY, String(volume)); } catch { /* */ }
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const src = TRACKS[roomId] || TRACKS.default;
        if (!src) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current = null;
            }
            return;
        }
        if (!audioRef.current) {
            const a = new Audio(src);
            a.loop = true;
            a.volume = volume;
            a.muted = muted;
            audioRef.current = a;
            // Browsers block autoplay; first user gesture will start it
            a.play().catch(() => { /* will resume on next interaction */ });
        } else if (!audioRef.current.src.endsWith(src)) {
            audioRef.current.src = src;
            audioRef.current.play().catch(() => {});
        }
        return () => { /* keep playing across rerenders */ };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId]);

    // Try to resume playback on the first user click anywhere (browser autoplay gate)
    useEffect(() => {
        const tryPlay = () => { if (audioRef.current && audioRef.current.paused) audioRef.current.play().catch(() => {}); };
        window.addEventListener('pointerdown', tryPlay, { once: true });
        return () => window.removeEventListener('pointerdown', tryPlay);
    }, []);

    return { muted, setMuted, volume, setVolume };
}
