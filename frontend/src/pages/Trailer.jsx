import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../data/chapter1';

const INTRO = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/aic7e8tz_Fluffy%20Nine%20Lives%2C%20Nine%20Legends%2C%20intro%20screen.mp3';
const APARTMENT = 'https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/dcnbec0u_Fluffy%20The%20apartment%20kingdom.mp3';

const CHAPTERS = [
    { num: 'I',    fantasy: 'The Apartment Kingdom',    reality: 'A morning in apartment 4B' },
    { num: 'II',   fantasy: 'The Food Bowl Temple',     reality: 'Breakfast is, unforgivably, late' },
    { num: 'III',  fantasy: 'The Curtain Realm',        reality: 'Behind the green curtains' },
    { num: 'IV',   fantasy: 'The Laundry Labyrinth',    reality: 'Down to the basement laundry' },
    { num: 'V',    fantasy: 'The Bathroom Ocean',       reality: 'Someone left the tap dripping' },
    { num: 'VI',   fantasy: 'The Back Alley Kingdom',   reality: 'The neighborhood cats convene' },
    { num: 'VII',  fantasy: 'The Rooftop Throne',       reality: 'Up the fire escape after dusk' },
    { num: 'VIII', fantasy: 'The Human Servant Trials', reality: 'The dad has a pill' },
    { num: 'IX',   fantasy: 'The Cosmic Window',        reality: 'A long evening of stars' },
];

// Scene timeline (start_ms, kind, ...payload)
const TIMELINE = [
    { at: 0,     kind: 'logo',    sub: 'Nine Lives, Nine Legends' },
    { at: 2600,  kind: 'tagline', big: 'Two Worlds.', small: 'One Hero.' },
    { at: 4800,  kind: 'room',    bg: ASSETS.bedroomFantasy,    mode: 'fantasy', title: 'My Sanctum',                hint: 'as Fluffy understands it' },
    { at: 7400,  kind: 'room',    bg: ASSETS.bedroom,           mode: 'reality', title: 'The Master Bedroom',       hint: 'what is actually there' },
    { at: 9800,  kind: 'hotspot', bg: ASSETS.bedroomFantasy,    label: 'The Counting Stone' },
    { at: 11600, kind: 'hotspot', bg: ASSETS.bedroom,           label: 'A Red Alarm Clock' },
    { at: 13400, kind: 'room',    bg: ASSETS.livingroomFantasy, mode: 'fantasy', title: 'The Great Hall',            hint: 'as Fluffy understands it' },
    { at: 15800, kind: 'room',    bg: ASSETS.livingroom,        mode: 'reality', title: 'Our Living Room',           hint: 'what is actually there' },
    { at: 18200, kind: 'room',    bg: ASSETS.gardenFantasy,     mode: 'fantasy', title: 'The Forbidden Realm',       hint: 'as Fluffy understands it' },
    { at: 20400, kind: 'room',    bg: ASSETS.garden,            mode: 'reality', title: 'The Front Garden',          hint: 'what is actually there' },
    { at: 22600, kind: 'chapter', idx: 1 },
    { at: 23700, kind: 'chapter', idx: 2 },
    { at: 24600, kind: 'chapter', idx: 3 },
    { at: 25400, kind: 'chapter', idx: 4 },
    { at: 26100, kind: 'chapter', idx: 5 },
    { at: 26800, kind: 'chapter', idx: 6 },
    { at: 27500, kind: 'chapter', idx: 7 },
    { at: 28200, kind: 'chapter', idx: 8 },
    { at: 29200, kind: 'finale' },
];

export default function Trailer() {
    const [sceneIdx, setSceneIdx] = useState(0);
    const [running, setRunning] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (!running) return;
        const timers = TIMELINE.map((s, i) =>
            setTimeout(() => setSceneIdx(i), s.at)
        );
        // Swap menu→apartment around the room block, swap back near the end
        const a = audioRef.current;
        const swap1 = setTimeout(() => { if (a) { a.src = APARTMENT; a.play().catch(() => {}); } }, 4400);
        const swap2 = setTimeout(() => { if (a) { a.src = INTRO;     a.play().catch(() => {}); } }, 28800);
        const stop  = setTimeout(() => setRunning(false), 30500);
        return () => { timers.forEach(clearTimeout); clearTimeout(swap1); clearTimeout(swap2); clearTimeout(stop); };
    }, [running]);

    const start = () => {
        setSceneIdx(0);
        const a = new Audio(INTRO);
        a.volume = 0.6;
        audioRef.current = a;
        a.play().catch(() => {});
        setRunning(true);
    };

    const scene = TIMELINE[sceneIdx] || TIMELINE[0];

    return (
        <div className="trailer-stage" data-testid="trailer">
            {!running && (
                <div className="trailer-start">
                    <h1 className="font-script text-6xl text-[var(--fl-candle-soft)] glow-candle">Fluffy</h1>
                    <p className="font-display uppercase tracking-[0.4em] text-sm text-[var(--fl-light)]/65 mb-10">— Nine Lives, Nine Legends —</p>
                    <p className="font-dialogue italic text-[var(--fl-light)]/75 mb-8 max-w-md text-center">A 30-second tour of the Apartment Kingdom.<br/>Best with sound.</p>
                    <button data-testid="trailer-start" onClick={start} className="trailer-play">▶ Play Trailer</button>
                    <Link to="/" className="font-display uppercase tracking-[0.32em] text-xs text-[var(--fl-light)]/55 mt-8 hover:text-[var(--fl-candle-soft)]">⟵ back to menu</Link>
                </div>
            )}

            {running && <Scene scene={scene} chapterIdx={scene.idx} />}

            {running && (
                <div className="trailer-bottom">
                    <span className="font-display uppercase tracking-[0.34em] text-[0.62rem] text-[var(--fl-light)]/55">A point-and-click adventure where imagination is the greatest power of all.</span>
                </div>
            )}
        </div>
    );
}

function Scene({ scene, chapterIdx }) {
    switch (scene.kind) {
        case 'logo':
            return (
                <div className="trailer-scene trailer-center">
                    <h1 className="font-script text-[8rem] leading-none text-[var(--fl-candle-soft)] glow-candle">Fluffy</h1>
                    <p className="font-display uppercase tracking-[0.42em] text-base text-[var(--fl-light)]/75 mt-2">{scene.sub}</p>
                </div>
            );
        case 'tagline':
            return (
                <div className="trailer-scene trailer-center">
                    <div className="font-script text-7xl text-[var(--fl-candle-soft)] glow-candle">{scene.big}</div>
                    <div className="font-script text-5xl text-[var(--fl-light)] mt-3 glow-faint">{scene.small}</div>
                </div>
            );
        case 'room':
            return (
                <div className="trailer-scene">
                    <div className="trailer-bg" style={{ backgroundImage: `url(${scene.bg})` }} />
                    <div className="trailer-vignette" />
                    <div className="trailer-title-card">
                        <span className="font-display uppercase tracking-[0.3em] text-xs text-[var(--fl-candle-soft)]/85">{scene.hint}</span>
                        <h2 className="font-script text-5xl text-[var(--fl-candle-soft)] glow-candle mt-1">{scene.title}</h2>
                    </div>
                </div>
            );
        case 'hotspot':
            return (
                <div className="trailer-scene">
                    <div className="trailer-bg" style={{ backgroundImage: `url(${scene.bg})` }} />
                    <div className="trailer-vignette" />
                    <div className="trailer-hotspot-demo">
                        <div className="hotspot hints-on" style={{ width: 84, height: 84, position: 'static' }}>
                            <span className="hotspot-label" style={{ opacity: 1, transform: 'translate(-50%, -14px)' }}>{scene.label}</span>
                        </div>
                    </div>
                </div>
            );
        case 'chapter': {
            const ch = CHAPTERS[chapterIdx];
            return (
                <div className="trailer-scene trailer-center">
                    <div className="font-script text-7xl text-[var(--fl-blood)] glow-faint">{ch.num}</div>
                    <div className="font-display uppercase tracking-[0.28em] text-[var(--fl-candle-soft)] text-base mt-2">{ch.fantasy}</div>
                    <div className="font-dialogue italic text-[var(--fl-light)]/70 mt-1 text-sm">{ch.reality}</div>
                </div>
            );
        }
        case 'finale':
            return (
                <div className="trailer-scene trailer-center">
                    <h1 className="font-script text-[6rem] text-[var(--fl-candle-soft)] glow-candle">Fluffy</h1>
                    <p className="font-display uppercase tracking-[0.42em] text-sm text-[var(--fl-light)]/80 mb-6">Nine Lives, Nine Legends</p>
                    <p className="font-dialogue italic text-[var(--fl-light)]/80 mb-6">One extremely dramatic housecat.</p>
                    <div className="flex gap-3 justify-center font-display uppercase tracking-[0.22em] text-xs">
                        <a href="https://www.patreon.com/c/fluffyninelegends" target="_blank" rel="noopener noreferrer" className="trailer-cta patreon">Patreon</a>
                        <a href="https://www.paypal.com/ncp/payment/EQJTSHCLFFSAQ" target="_blank" rel="noopener noreferrer" className="trailer-cta">PayPal</a>
                    </div>
                </div>
            );
        default:
            return null;
    }
}
