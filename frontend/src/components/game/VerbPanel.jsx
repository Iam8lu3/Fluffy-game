import React from 'react';
import { useGame } from '../../store/GameContext';

const VERBS = [
    { id: 'look', label: 'Examine' },
    { id: 'use',  label: 'Use'     },
    { id: 'talk', label: 'Speak'   },
    { id: 'take', label: 'Claim'   },
];

export default function VerbPanel() {
    const { state, dispatch } = useGame();
    return (
        <div className="surface-parchment-solid frame-soft p-3 flex flex-col" data-testid="verb-panel">
            <div className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-ink)]/80 mb-2 text-center">Verbs of the Hero</div>
            <div className="grid grid-cols-2 gap-1.5 flex-1">
                {VERBS.map(v => (
                    <button
                        key={v.id}
                        data-testid={`verb-${v.id}`}
                        onClick={() => dispatch({ type: 'SET_VERB', verb: v.id })}
                        className={`verb-btn ${state.verb === v.id ? 'active' : ''}`}
                    >
                        {v.label}
                    </button>
                ))}
            </div>
            <div className="mt-2 text-center text-[0.7rem] tracking-widest font-display uppercase text-[var(--fl-ink)]/70">
                Action: <span className="text-[var(--fl-arcane)]">{VERBS.find(v => v.id === state.verb)?.label}</span>
                {state.selectedItem && <span> · with <span className="text-[var(--fl-blood)] italic">{state.selectedItem.replace('_', ' ')}</span></span>}
            </div>
        </div>
    );
}
