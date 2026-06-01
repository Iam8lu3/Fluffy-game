import React from 'react';
import { useGame } from '../../store/GameContext';

export default function FantasyToggle() {
    const { state, dispatch } = useGame();
    const isFantasy = state.mode === 'fantasy';

    return (
        <div className="absolute top-14 right-4 z-30 flex items-center gap-3 bg-[var(--fl-bg-deep)]/70 border border-[var(--fl-gold)]/50 px-3 py-1.5" data-testid="fantasy-toggle-wrap">
            <span className={`font-display uppercase text-[0.7rem] tracking-[0.28em] ${isFantasy ? 'text-[var(--fl-candle-soft)] glow-candle' : 'text-[var(--fl-light)]/50'}`}>
                Fantasy
            </span>
            <button
                data-testid="fantasy-toggle"
                onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
                className="relative w-16 h-8 border border-[var(--fl-gold)] bg-[var(--fl-bg-deep)] flex items-center transition-colors"
                style={{ background: isFantasy ? 'linear-gradient(90deg, var(--fl-arcane), var(--fl-arcane-deep))' : 'linear-gradient(90deg, #2a2317, #1a1410)' }}
                aria-label="Toggle Fantasy/Reality"
            >
                <span
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 transition-all"
                    style={{
                        left: isFantasy ? '4px' : 'calc(100% - 28px)',
                        background: 'var(--fl-candle)',
                        boxShadow: '0 0 14px rgba(255,176,66,0.6)',
                    }}
                />
            </button>
            <span className={`font-display uppercase text-[0.7rem] tracking-[0.28em] ${!isFantasy ? 'text-[var(--fl-candle-soft)] glow-candle' : 'text-[var(--fl-light)]/50'}`}>
                Reality
            </span>
        </div>
    );
}
