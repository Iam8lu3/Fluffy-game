import React, { useState, useEffect } from 'react';

const SETTINGS_KEY = 'fluffy_settings_v1';
const defaults = { textSpeed: 22, volume: 60, parchmentMode: true };

export default function SettingsModal({ onClose }) {
    const [s, setS] = useState(() => {
        try { return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; }
        catch { return defaults; }
    });

    useEffect(() => {
        try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* */ }
    }, [s]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]" data-testid="settings-modal">
            <div className="surface-parchment frame-ornate w-[min(560px,92%)] p-7">
                <div className="flex items-baseline justify-between border-b border-[var(--fl-gold)]/40 pb-3 mb-4">
                    <h2 className="font-script text-3xl text-[var(--fl-blood)]">Hearthside Settings</h2>
                    <button data-testid="settings-close" onClick={onClose} className="icon-btn !text-[var(--fl-ink)] !bg-transparent !border-[var(--fl-ink)]/40">Close ✕</button>
                </div>
                <div className="space-y-5">
                    <Field label="Narration Speed">
                        <input type="range" min="8" max="60" value={s.textSpeed} onChange={(e) => setS({ ...s, textSpeed: +e.target.value })} className="w-full" data-testid="settings-textspeed" />
                        <Hint>Currently: {s.textSpeed} ms per glyph</Hint>
                    </Field>
                    <Field label="Atmospheric Volume">
                        <input type="range" min="0" max="100" value={s.volume} onChange={(e) => setS({ ...s, volume: +e.target.value })} className="w-full" data-testid="settings-volume" />
                        <Hint>The mortal ear shall be respected.</Hint>
                    </Field>
                </div>
                <p className="font-dialogue italic text-[var(--fl-ink)]/70 mt-6 text-sm">
                    Settings are saved to your browser. They do not, alas, follow you across realms.
                </p>
            </div>
        </div>
    );
}

const Field = ({ label, children }) => (
    <div>
        <div className="font-display uppercase tracking-[0.22em] text-xs text-[var(--fl-ink)]/80 mb-1.5">{label}</div>
        {children}
    </div>
);
const Hint = ({ children }) => <div className="font-dialogue italic text-[var(--fl-ink)]/70 text-sm mt-1">{children}</div>;
