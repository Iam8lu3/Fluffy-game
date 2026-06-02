import React, { useState } from 'react';
import { useGame } from '../../store/GameContext';
import { QUESTS, ITEMS } from '../../data/chapter1';

export default function QuestJournal({ onClose }) {
    const { state, quests } = useGame();
    const [tab, setTab] = useState('quests'); // 'quests' | 'relics' | 'log'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-[2px]" data-testid="quest-journal">
            <div className="surface-parchment frame-ornate w-[min(900px,92%)] max-h-[88vh] p-6 md:p-8 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between border-b border-[var(--fl-gold)]/40 pb-3">
                    <div className="flex items-baseline gap-3">
                        <span className="font-script text-3xl text-[var(--fl-blood)]">Fluffy's Codex</span>
                        <span className="font-dialogue italic text-[var(--fl-ink)]/70">— the unwritten chronicle —</span>
                    </div>
                    <button onClick={onClose} data-testid="journal-close" className="icon-btn !text-[var(--fl-ink)] !bg-transparent !border-[var(--fl-ink)]/40">Close ✕</button>
                </div>

                <div className="flex gap-2 mt-4 mb-3">
                    {[
                        { id: 'quests', label: 'Quests' },
                        { id: 'relics', label: 'Relics' },
                        { id: 'log',    label: 'Chronicle' },
                    ].map(t => (
                        <button
                            key={t.id}
                            data-testid={`journal-tab-${t.id}`}
                            onClick={() => setTab(t.id)}
                            className={`font-display uppercase tracking-[0.22em] text-xs px-3 py-1.5 border ${tab === t.id ? 'bg-[var(--fl-arcane)] text-[var(--fl-candle-soft)] border-[var(--fl-candle)]' : 'border-[var(--fl-ink)]/30 text-[var(--fl-ink)]/85 hover:bg-[var(--fl-candle)]/15'}`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {tab === 'quests' && (
                        <ul className="space-y-3">
                            {QUESTS.map(q => {
                                const st = quests[q.id];
                                return (
                                    <li key={q.id} className={`border-l-4 pl-3 py-1 ${st === 'done' ? 'border-[var(--fl-gold)] opacity-90' : st === 'active' ? 'border-[var(--fl-blood)]' : 'border-[var(--fl-ink)]/30 opacity-50'}`}>
                                        <div className="flex items-baseline justify-between gap-3">
                                            <h3 className="font-script text-xl text-[var(--fl-ink)]">{state.mode === 'fantasy' ? q.titleFantasy : q.titleReality}</h3>
                                            <span className={`font-display uppercase text-[0.65rem] tracking-[0.25em] ${st === 'done' ? 'text-[var(--fl-gold)]' : st === 'active' ? 'text-[var(--fl-blood)]' : 'text-[var(--fl-ink)]/45'}`}>
                                                {st === 'done' ? '✓ accomplished' : st === 'active' ? '… in pursuit' : '— unknown —'}
                                            </span>
                                        </div>
                                        <p className="font-dialogue italic text-[var(--fl-ink)]/85 mt-0.5">{state.mode === 'fantasy' ? q.descFantasy : q.descReality}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {tab === 'relics' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.values(ITEMS).map(it => {
                                const owned = !!state.inventory[it.id];
                                return (
                                    <div key={it.id} className={`flex gap-3 p-3 border ${owned ? 'border-[var(--fl-gold)] bg-white/15' : 'border-[var(--fl-ink)]/20 opacity-55'}`}>
                                        <div className="w-12 h-12 flex items-center justify-center bg-[var(--fl-bg-deep)] text-[var(--fl-candle-soft)] font-script text-3xl">
                                            {owned ? it.glyph : '?'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-script text-lg text-[var(--fl-ink)]">{owned ? (state.mode === 'fantasy' ? it.nameFantasy : it.nameReality) : '— undiscovered —'}</div>
                                            <p className="font-dialogue italic text-[var(--fl-ink)]/80 text-sm leading-snug">
                                                {owned ? (state.mode === 'fantasy' ? it.descFantasy : it.descReality) : 'Its location is yet hidden.'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {tab === 'log' && (
                        <ol className="space-y-1.5 font-dialogue italic text-[var(--fl-ink)]/85">
                            {state.log.length === 0 && <li className="opacity-60">No entries yet. Strike out into the world.</li>}
                            {state.log.slice().reverse().map((e) => (
                                <li key={e.ts} className="border-b border-[var(--fl-ink)]/15 pb-1.5">
                                    <span className="font-display uppercase text-[0.62rem] tracking-[0.25em] text-[var(--fl-blood)] mr-2">{e.kind}</span>
                                    {e.text}
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        </div>
    );
}
