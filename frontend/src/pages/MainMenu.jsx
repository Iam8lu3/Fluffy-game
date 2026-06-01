import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasSave, useGame } from '../store/GameContext';
import { CHAPTER_META } from '../data/chapter1';
import SettingsModal from '../components/game/SettingsModal';
import CreditsModal from '../components/game/CreditsModal';
import ChaptersModal from '../components/game/ChaptersModal';

export default function MainMenu() {
    const navigate = useNavigate();
    const { resetGame } = useGame();
    const [modal, setModal] = useState(null); // 'settings' | 'credits' | 'chapters'

    const onNew = () => {
        resetGame();
        navigate('/game');
    };

    const onContinue = () => {
        if (!hasSave()) return;
        navigate('/game');
    };

    return (
        <div className="menu-stage" data-testid="main-menu">
            {/* Top ornamental glyph */}
            <div className="absolute inset-x-0 top-10 flex justify-center z-10">
                <div className="font-script text-[2rem] tracking-[0.3em] text-[var(--fl-candle)] glow-candle flicker">✦ ✶ ✦</div>
            </div>

            {/* Title block */}
            <div className="relative z-10 h-full grid grid-cols-12">
                <div className="col-span-12 md:col-span-7 flex flex-col justify-center pl-8 md:pl-20 pr-8">
                    <p className="font-display uppercase text-[var(--fl-candle-soft)] tracking-[0.42em] text-xs md:text-sm mb-6 glow-faint">A Tale in Nine Chapters</p>
                    <h1 className="font-script text-[3.4rem] sm:text-[4.5rem] lg:text-[6rem] leading-[0.95] text-[var(--fl-light)] glow-candle">
                        Fluffy
                    </h1>
                    <h2 className="font-display italic text-[var(--fl-candle-soft)] text-xl md:text-3xl mt-1 tracking-wide">
                        Nine Lives, Nine Legends
                    </h2>
                    <p className="font-dialogue italic text-[var(--fl-light)]/80 mt-8 max-w-[44ch] text-lg leading-relaxed">
                        He is the Demon Destroyer of Worlds. The carpet shall tremble. The vacuum shall fall. The food bowl, however, remains a tragedy unanswered.
                    </p>

                    <nav className="mt-12 flex flex-col gap-3 font-display uppercase text-xl tracking-[0.18em] text-[var(--fl-light)]">
                        <button data-testid="menu-new-game" className="menu-link text-left w-fit" onClick={onNew}>New Game</button>
                        <button data-testid="menu-continue" className="menu-link text-left w-fit" onClick={onContinue} disabled={!hasSave()}>
                            Continue {hasSave() ? '' : <span className="text-xs opacity-50 normal-case italic ml-2 font-dialogue">(no save found)</span>}
                        </button>
                        <button data-testid="menu-chapters" className="menu-link text-left w-fit" onClick={() => setModal('chapters')}>Chapters</button>
                        <button data-testid="menu-settings" className="menu-link text-left w-fit" onClick={() => setModal('settings')}>Settings</button>
                        <button data-testid="menu-credits"  className="menu-link text-left w-fit" onClick={() => setModal('credits')}>Credits</button>
                    </nav>
                </div>

                {/* Right vignette — keep the painting clear; only add candle highlights */}
                <div className="hidden md:flex col-span-5 relative items-end justify-center pb-12 pointer-events-none">
                    <div className="candle-decor flicker" style={{ right: '22%', bottom: '32%' }} />
                    <div className="candle-decor flicker" style={{ right: '34%', bottom: '24%' }} />
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-between items-center px-8 md:px-20 text-[var(--fl-light)]/60 font-display text-[0.72rem] tracking-[0.32em] uppercase">
                <span>Chapter {CHAPTER_META.number} — {CHAPTER_META.titleFantasy}</span>
                <span>v0.1 · Vertical Slice</span>
            </div>

            {modal === 'settings' && <SettingsModal onClose={() => setModal(null)} />}
            {modal === 'credits' && <CreditsModal onClose={() => setModal(null)} />}
            {modal === 'chapters' && <ChaptersModal onClose={() => setModal(null)} onStart={onNew} />}
        </div>
    );
}
