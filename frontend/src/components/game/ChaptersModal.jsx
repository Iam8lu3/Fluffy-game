import React from 'react';

const CHAPTERS = [
    { num: 'I',    name: 'The Awakening of the Demon Destroyer',  status: 'available', sub: 'Vertical slice — playable now' },
    { num: 'II',   name: 'A Bowl Most Sacred',                    status: 'locked',    sub: 'The Quest for the Morning Crunch' },
    { num: 'III',  name: 'The Lawn of a Thousand Eyes',           status: 'locked',    sub: 'Pigeons beyond counting' },
    { num: 'IV',   name: 'Beneath the Couch of Eternity',         status: 'locked',    sub: 'Where lost relics gather' },
    { num: 'V',    name: 'The Beast in the Cylindrical Tower',    status: 'locked',    sub: 'Re: the washing machine' },
    { num: 'VI',   name: 'The Pact with the Refrigerator Wraith', status: 'locked',    sub: 'Cold storage runs deep' },
    { num: 'VII',  name: 'Of Mice, of Memory',                    status: 'locked',    sub: 'A mournful chapter' },
    { num: 'VIII', name: 'The Stranger at the Threshold',         status: 'locked',    sub: 'A new cat appears in the alley' },
    { num: 'IX',   name: 'Nine Lives, Nine Legends',              status: 'locked',    sub: 'The final reckoning' },
];

export default function ChaptersModal({ onClose, onStart }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]" data-testid="chapters-modal">
            <div className="surface-parchment frame-ornate w-[min(720px,92%)] max-h-[88vh] flex flex-col p-7">
                <div className="flex items-baseline justify-between border-b border-[var(--fl-gold)]/40 pb-3 mb-4">
                    <h2 className="font-script text-3xl text-[var(--fl-blood)]">The Nine Chapters</h2>
                    <button data-testid="chapters-close" onClick={onClose} className="icon-btn !text-[var(--fl-ink)] !bg-transparent !border-[var(--fl-ink)]/40">Close ✕</button>
                </div>
                <ul className="space-y-2 overflow-y-auto pr-2">
                    {CHAPTERS.map((c) => (
                        <li key={c.num} data-testid={`chapter-${c.num}`} className={`flex items-center gap-4 p-3 border ${c.status === 'available' ? 'border-[var(--fl-gold)] bg-white/15' : 'border-[var(--fl-ink)]/20 opacity-60'}`}>
                            <span className="font-script text-3xl text-[var(--fl-blood)] w-12 text-center">{c.num}</span>
                            <div className="flex-1">
                                <div className="font-display uppercase tracking-[0.16em] text-sm text-[var(--fl-ink)]">{c.name}</div>
                                <div className="font-dialogue italic text-[var(--fl-ink)]/75 text-sm">{c.sub}</div>
                            </div>
                            {c.status === 'available' ? (
                                <button onClick={onStart} data-testid="chapter-play" className="icon-btn !text-[var(--fl-ink)] !bg-[var(--fl-candle)] !border-[var(--fl-gold)]">Begin ›</button>
                            ) : (
                                <span className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-ink)]/55">— sealed —</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
