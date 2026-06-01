import React from 'react';

const CHAPTERS = [
    { num: 'I',    fantasy: 'The Apartment Kingdom',    reality: 'A morning in apartment 4B',         status: 'available', },
    { num: 'II',   fantasy: 'The Food Bowl Temple',     reality: 'Breakfast is, unforgivably, late',  status: 'locked',    },
    { num: 'III',  fantasy: 'The Curtain Realm',        reality: 'Behind the green curtains',         status: 'locked',    },
    { num: 'IV',   fantasy: 'The Laundry Labyrinth',    reality: 'Down to the basement laundry room', status: 'locked',    },
    { num: 'V',    fantasy: 'The Bathroom Ocean',       reality: 'Someone left the tap dripping',     status: 'locked',    },
    { num: 'VI',   fantasy: 'The Back Alley Kingdom',   reality: 'The neighborhood cats convene',     status: 'locked',    },
    { num: 'VII',  fantasy: 'The Rooftop Throne',       reality: 'Up the fire escape after dusk',     status: 'locked',    },
    { num: 'VIII', fantasy: 'The Human Servant Trials', reality: 'The dad is trying to give me a pill', status: 'locked',  },
    { num: 'IX',   fantasy: 'The Cosmic Window',        reality: 'A long evening of stars',           status: 'locked',    },
];

export default function ChaptersModal({ onClose, onStart }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]" data-testid="chapters-modal">
            <div className="surface-parchment frame-ornate w-[min(760px,92%)] max-h-[88vh] flex flex-col p-7">
                <div className="flex items-baseline justify-between border-b border-[var(--fl-gold)]/40 pb-3 mb-4">
                    <div>
                        <h2 className="font-script text-3xl text-[var(--fl-blood)] leading-none">The Nine Chapters</h2>
                        <p className="font-dialogue italic text-[var(--fl-ink)]/70 mt-1">Ordinary places. Larger-than-life cat.</p>
                    </div>
                    <button data-testid="chapters-close" onClick={onClose} className="icon-btn !text-[var(--fl-ink)] !bg-transparent !border-[var(--fl-ink)]/40">Close ✕</button>
                </div>
                <ul className="space-y-2 overflow-y-auto pr-2">
                    {CHAPTERS.map((c) => (
                        <li
                            key={c.num}
                            data-testid={`chapter-${c.num}`}
                            className={`flex items-center gap-4 p-3 border ${c.status === 'available' ? 'border-[var(--fl-gold)] bg-white/15' : 'border-[var(--fl-ink)]/20 opacity-60'}`}
                        >
                            <span className="font-script text-3xl text-[var(--fl-blood)] w-12 text-center">{c.num}</span>
                            <div className="flex-1 min-w-0">
                                <div className="font-display uppercase tracking-[0.16em] text-sm text-[var(--fl-ink)] truncate">{c.fantasy}</div>
                                <div className="font-dialogue italic text-[var(--fl-ink)]/70 text-sm truncate">{c.reality}</div>
                            </div>
                            {c.status === 'available' ? (
                                <button onClick={onStart} data-testid="chapter-play" className="icon-btn !text-[var(--fl-ink)] !bg-[var(--fl-candle)] !border-[var(--fl-gold)] shrink-0">Begin ›</button>
                            ) : (
                                <span className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-ink)]/55 shrink-0">— not yet —</span>
                            )}
                        </li>
                    ))}
                </ul>
                <p className="font-dialogue italic text-[var(--fl-ink)]/65 text-sm mt-4 text-center">
                    Each chapter is one place in the cat's world.<br />The same place is also somewhere quite ordinary.
                </p>
            </div>
        </div>
    );
}
