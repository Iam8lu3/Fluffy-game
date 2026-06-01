import React from 'react';
import { Eye, MessageCircle, Hand } from 'lucide-react';
import { useGame } from '../../store/GameContext';

// Custom paw icon (claw-and-pad) — more characterful than lucide's
const PawClaws = ({ size = 28, ...p }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...p}>
        <ellipse cx="32" cy="40" rx="14" ry="11" />
        <ellipse cx="14" cy="26" rx="5" ry="7" />
        <ellipse cx="26" cy="18" rx="5" ry="7" />
        <ellipse cx="38" cy="18" rx="5" ry="7" />
        <ellipse cx="50" cy="26" rx="5" ry="7" />
        {/* Claws */}
        <path d="M11 16 L9 10 M14 14 L13 7 M17 16 L19 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M53 16 L55 10 M50 14 L51 7 M47 16 L45 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
);

const VERBS = [
    { id: 'look', label: 'Look',  Icon: Eye,           glow: '#7adc6e' },
    { id: 'use',  label: 'Touch', Icon: PawClaws,      glow: '#7adc6e' },
    { id: 'talk', label: 'Talk',  Icon: MessageCircle, glow: '#ffd166' },
    { id: 'take', label: 'Take',  Icon: Hand,          glow: '#5fc7ff' },
];

export default function VerbPanel() {
    const { state, dispatch } = useGame();

    return (
        <div className="verb-panel-wrap" data-testid="verb-panel">
            <div className="verb-panel-title">
                <span>Verbs</span>
            </div>
            <div className="verb-grid">
                {VERBS.map(v => {
                    const active = state.verb === v.id;
                    return (
                        <button
                            key={v.id}
                            data-testid={`verb-${v.id}`}
                            onClick={() => dispatch({ type: 'SET_VERB', verb: v.id })}
                            className={`verb-tile ${active ? 'active' : ''}`}
                            style={active ? { '--tile-glow': v.glow } : {}}
                            aria-label={v.label}
                        >
                            <span className="gem gem-tl" />
                            <span className="gem gem-tr" />
                            <span className="gem gem-bl" />
                            <span className="gem gem-br" />
                            <span className="verb-icon" style={{ color: v.glow }}>
                                <v.Icon size={22} strokeWidth={2.2} />
                            </span>
                            <span className="verb-label">{v.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="verb-action-line">
                <span className="font-display uppercase text-[0.62rem] tracking-[0.24em] text-[var(--fl-light)]/55">Action</span>
                <span className="font-script text-[var(--fl-candle-soft)] text-[0.95rem] glow-faint">
                    {VERBS.find(v => v.id === state.verb)?.label}
                </span>
                {state.selectedItem && (
                    <span className="font-dialogue italic text-[var(--fl-blood)] text-[0.78rem]">
                        · with {state.selectedItem.replace(/_/g, ' ')}
                    </span>
                )}
            </div>
        </div>
    );
}
