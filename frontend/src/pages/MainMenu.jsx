import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasSave, useGame } from '../store/GameContext';
import { CHAPTER_META } from '../data/chapter1';
import SettingsModal from '../components/game/SettingsModal';
import CreditsModal from '../components/game/CreditsModal';
import ChaptersModal from '../components/game/ChaptersModal';
import useAmbientMusic from '../components/game/useAmbientMusic';

const FANTASY_TITLES = [
    'Demon Destroyer of Worlds.',
    'Guardian of the Apartment Kingdom.',
    'Scourge of the Vacuum.',
    'Master of the Morning Patrol.',
    'Knower of Where the Cheese-Bread Is Kept.',
];

const REALITY_LINES = [
    'A black housecat.',
    'Lives in apartment 4B.',
    'Has very strong opinions about the vacuum.',
    'Patrols the windowsill every morning at 7:14.',
    'The food bowl is, at this very moment, empty.',
];

export default function MainMenu() {
    const navigate = useNavigate();
    const { resetGame } = useGame();
    const [modal, setModal] = useState(null);
    const [view, setView] = useState('fantasy'); // 'fantasy' | 'reality'
    const music = useAmbientMusic('menu');

    const onNew = () => { resetGame(); navigate('/game'); };
    const onContinue = () => { if (hasSave()) navigate('/game'); };
    const isFantasy = view === 'fantasy';

    return (
        <div className={`menu-stage menu-${view}`} data-testid="main-menu">
            {/* Top ornamental glyph */}
            <div className="absolute inset-x-0 top-10 flex justify-center z-10">
                <div className="font-script text-[2rem] tracking-[0.3em] text-[var(--fl-candle)] glow-candle flicker">✦ ✶ ✦</div>
            </div>

            {/* Reality / Fantasy preview chip — establishes the joke immediately */}
            <div className="absolute top-8 right-8 z-20 flex items-center gap-3" data-testid="menu-mode-toggle-wrap">
                <button
                    data-testid="menu-music-toggle"
                    onClick={() => music.setMuted(!music.muted)}
                    className="nav-btn"
                    title={music.muted ? 'Unmute music' : 'Mute music'}
                >
                    <span className="nav-btn-glyph">{music.muted ? '𝄽' : '♪'}</span>
                    <span className="nav-btn-label">Music</span>
                </button>
                <span className="font-display uppercase tracking-[0.3em] text-[0.65rem] text-[var(--fl-light)]/55 hidden sm:inline">
                    {isFantasy ? 'as Fluffy understands it' : 'what is actually there'}
                </span>
                <button
                    data-testid="menu-mode-toggle"
                    onClick={() => setView(isFantasy ? 'reality' : 'fantasy')}
                    className={`mode-toggle menu-mode-toggle ${isFantasy ? 'fantasy' : 'reality'}`}
                    aria-label="Toggle Fantasy / Reality preview"
                >
                    <span className={`mode-side ${isFantasy ? 'active' : ''}`}>Fantasy</span>
                    <span className="mode-pip" />
                    <span className={`mode-side ${!isFantasy ? 'active' : ''}`}>Reality</span>
                </button>
            </div>

            {/* Title block */}
            <div className="relative z-10 h-full grid grid-cols-12">
                <div className="col-span-12 md:col-span-7 flex flex-col justify-center pl-8 md:pl-20 pr-8">
                    <p className="font-display uppercase text-[var(--fl-candle-soft)] tracking-[0.42em] text-xs md:text-sm mb-6 glow-faint">
                        {isFantasy ? 'A Tale in Nine Chapters' : 'A Cat. A Home. Some Strong Opinions.'}
                    </p>
                    <h1 className="font-script text-[3.4rem] sm:text-[4.5rem] lg:text-[6rem] leading-[0.95] text-[var(--fl-light)] glow-candle">
                        Fluffy
                    </h1>
                    <h2 className="font-display italic text-[var(--fl-candle-soft)] text-xl md:text-3xl mt-1 tracking-wide">
                        Nine Lives, Nine Legends
                    </h2>

                    {/* Dual-reality body — same block, two voices */}
                    <div className="mt-7 max-w-[46ch] min-h-[10rem]">
                        {isFantasy ? (
                            <ul className="font-script text-[var(--fl-candle-soft)] space-y-1 text-xl md:text-2xl leading-snug glow-faint" data-testid="title-fantasy-block">
                                {FANTASY_TITLES.map((t, i) => (
                                    <li key={i} className="text-fade" style={{ animationDelay: `${i * 90}ms` }}>{t}</li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="font-dialogue italic text-[var(--fl-light)]/90 space-y-1 text-base md:text-lg leading-relaxed" data-testid="title-reality-block">
                                {REALITY_LINES.map((t, i) => (
                                    <li key={i} className="text-fade flex gap-2 items-baseline" style={{ animationDelay: `${i * 70}ms` }}>
                                        <span className="text-[var(--fl-candle)]/70 select-none">·</span>{t}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <nav className="mt-10 flex flex-col gap-3 font-display uppercase text-xl tracking-[0.18em] text-[var(--fl-light)]">
                        <button data-testid="menu-new-game" className="menu-link text-left w-fit" onClick={onNew}>New Game</button>
                        <button data-testid="menu-continue" className="menu-link text-left w-fit" onClick={onContinue} disabled={!hasSave()}>
                            Continue {hasSave() ? '' : <span className="text-xs opacity-50 normal-case italic ml-2 font-dialogue">(no save found)</span>}
                        </button>
                        <button data-testid="menu-chapters" className="menu-link text-left w-fit" onClick={() => setModal('chapters')}>The Nine Chapters</button>
                        <button data-testid="menu-settings" className="menu-link text-left w-fit" onClick={() => setModal('settings')}>Settings</button>
                        <button data-testid="menu-credits"  className="menu-link text-left w-fit" onClick={() => setModal('credits')}>Credits</button>
                    </nav>
                </div>

                <div className="hidden md:flex col-span-5 relative items-end justify-center pb-12 pointer-events-none">
                    <div className="candle-decor flicker" style={{ right: '22%', bottom: '62%' }} />
                    <div className="candle-decor flicker" style={{ right: '34%', bottom: '54%' }} />

                    {/* Support-the-Demo card — PayPal QR + Patreon. Honored credits the donors. */}
                    <div className="absolute right-10 bottom-12 pointer-events-auto qr-card-wrap" data-testid="support-card">
                        <div className="qr-card">
                            <a
                                href="https://www.paypal.com/ncp/payment/EQJTSHCLFFSAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="tip-the-cat-qr"
                                className="qr-promo"
                            >
                                <img
                                    src="https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/rjgeyqs9_712504479_17966153451119856_65797109207246429_n.jpg"
                                    alt="Fluffy — Nine Lives, Nine Legends"
                                    draggable={false}
                                />
                                <span className="qr-promo-cta">Support the Demo</span>
                            </a>
                            <div className="qr-card-header">
                                <span className="qr-card-title">Offerings</span>
                                <span className="qr-card-sub">{isFantasy ? 'tribute to the Demon Destroyer' : 'tip the cat, if you like'}</span>
                            </div>
                            <a
                                href="https://www.paypal.com/ncp/payment/EQJTSHCLFFSAQ"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="paypal-link"
                                className="qr-card-image"
                                title="Open PayPal"
                            >
                                <img
                                    src="https://customer-assets.emergentagent.com/job_nine-lives-quest/artifacts/wrpz5p2t_qrcode.png"
                                    alt="PayPal — scan to tip the cat"
                                    draggable={false}
                                />
                            </a>
                            <div className="qr-card-footer">— PayPal · single offering —</div>
                            <a
                                href="https://www.patreon.com/c/fluffyninelegends"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="patreon-link"
                                className="patreon-btn"
                            >
                                <span className="patreon-btn-glyph">𝕻</span>
                                <span className="patreon-btn-text">
                                    <span className="patreon-btn-title">Join the Patreon</span>
                                    <span className="patreon-btn-sub">monthly tribute · recurring</span>
                                </span>
                            </a>
                            <p className="qr-card-credit">
                                {isFantasy ? 'Thy name shall be inscribed in the Codex.' : 'Donors are credited in the Honored Supporters scroll.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-between items-center px-8 md:px-20 text-[var(--fl-light)]/60 font-display text-[0.72rem] tracking-[0.32em] uppercase">
                <span>Chapter {CHAPTER_META.number} — {isFantasy ? 'The Apartment Kingdom' : 'Tuesday Morning, Apartment 4B'}</span>
                <span>v0.1 · Vertical Slice</span>
            </div>

            {modal === 'settings' && <SettingsModal onClose={() => setModal(null)} />}
            {modal === 'credits' && <CreditsModal onClose={() => setModal(null)} />}
            {modal === 'chapters' && <ChaptersModal onClose={() => setModal(null)} onStart={onNew} />}
        </div>
    );
}
