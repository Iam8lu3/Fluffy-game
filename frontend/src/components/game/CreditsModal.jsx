import React from 'react';

export default function CreditsModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]" data-testid="credits-modal">
            <div className="surface-parchment frame-ornate w-[min(620px,92%)] p-8 text-center">
                <h2 className="font-script text-4xl text-[var(--fl-blood)] mb-1">Fluffy</h2>
                <p className="font-display uppercase tracking-[0.34em] text-[var(--fl-ink)]/75 text-xs mb-6">— Nine Lives, Nine Legends —</p>
                <div className="space-y-3 font-dialogue text-[var(--fl-ink)]">
                    <p><span className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-blood)]">Conceived by</span><br/>An evening of staring at the family cat<br/>and assuming the worst.</p>
                    <p><span className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-blood)]">Inspired by</span><br/>Monkey Island · Broken Sword · Night in the Woods<br/>Ren'Py · LucasArts SCUMM</p>
                    <p><span className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-blood)]">Starring</span><br/>Fluffy, as himself.<br/>The Vacuum Cleaner, as the antagonist.<br/>The Gnome, in silent dignity.</p>
                </div>
                <button data-testid="credits-close" onClick={onClose} className="mt-7 icon-btn !text-[var(--fl-ink)] !bg-transparent !border-[var(--fl-ink)]/50">Return ⟵</button>
            </div>
        </div>
    );
}
