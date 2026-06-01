import React from 'react';
import { useGame } from '../../store/GameContext';
import { CHAPTER_META } from '../../data/chapter1';

export default function EndingOverlay({ onMenu }) {
    const { state } = useGame();
    const text = state.mode === 'fantasy' ? CHAPTER_META.endingMonologue.fantasy : CHAPTER_META.endingMonologue.reality;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92" data-testid="ending-overlay">
            <div className="surface-parchment frame-ornate w-[min(720px,92%)] p-10 text-center">
                <div className="font-display uppercase tracking-[0.34em] text-xs text-[var(--fl-ink)]/65 mb-3">— Fin —</div>
                <h2 className="font-script text-4xl text-[var(--fl-blood)] mb-5">{CHAPTER_META.endingMonologue.outro}</h2>
                <p className="font-dialogue italic text-[var(--fl-ink)] text-lg leading-relaxed">{text}</p>
                <p className="font-display uppercase tracking-[0.3em] text-xs text-[var(--fl-ink)]/70 mt-7">{CHAPTER_META.endingMonologue.subOutro}</p>
                <div className="mt-8 flex justify-center">
                    <button onClick={onMenu} data-testid="ending-menu" className="icon-btn !text-[var(--fl-ink)] !bg-[var(--fl-candle)] !border-[var(--fl-gold)]">Return to the Hearth</button>
                </div>
            </div>
        </div>
    );
}
