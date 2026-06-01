import React from 'react';

export default function TopBar({ chapter, room, mode, onBack, onJournal }) {
    return (
        <div className="top-hud" data-testid="top-bar">
            <div className="flex items-center gap-3">
                <button data-testid="back-menu" onClick={onBack} className="icon-btn">⟵ Menu</button>
                <span className="font-display uppercase text-[var(--fl-light)]/70 text-[0.7rem] tracking-[0.3em]">
                    Chapter {chapter.number} · {mode === 'fantasy' ? chapter.titleFantasy : chapter.titleReality}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <button data-testid="open-journal" onClick={onJournal} className="icon-btn">✦ Quest Journal</button>
            </div>
        </div>
    );
}
