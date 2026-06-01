import React, { useEffect, useMemo, useState } from 'react';
import { useGame } from '../../store/GameContext';
import { ASSETS } from '../../data/chapter1';

export default function MonologueCaption() {
    const { state } = useGame();
    const lastMono = useMemo(() => {
        for (let i = state.log.length - 1; i >= 0; i--) {
            if (state.log[i].kind === 'mono') return state.log[i];
        }
        return null;
    }, [state.log]);

    const [typed, setTyped] = useState('');
    const [done, setDone] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!lastMono) { setVisible(false); return; }
        if (state.dialogue) { setVisible(false); return; }
        setVisible(true); setDone(false); setTyped('');
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setTyped(lastMono.text.slice(0, i));
            if (i >= lastMono.text.length) { clearInterval(iv); setDone(true); }
        }, 22);

        const hideTimer = setTimeout(() => setVisible(false), Math.min(13000, 2200 + lastMono.text.length * 45));

        return () => { clearInterval(iv); clearTimeout(hideTimer); };
    }, [lastMono?.ts, state.dialogue]);

    if (!visible || !lastMono) return null;

    const portrait = state.mode === 'fantasy' ? ASSETS.portraitFantasy : ASSETS.portraitReality;
    const label = state.mode === 'fantasy' ? 'Fluffy, the Demon Destroyer' : 'Fluffy';

    return (
        <div className="dialogue-overlay" data-testid="monologue-caption">
            <div className="pointer-events-auto surface-parchment frame-ornate flex gap-5 p-4 md:p-5">
                <div className="hidden md:block shrink-0 w-24 h-24 frame-soft overflow-hidden">
                    <img alt="fluffy" src={portrait} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-script text-[var(--fl-blood)] text-xl mb-0.5">{label}</div>
                    <div className="font-dialogue text-[var(--fl-ink)] text-base md:text-lg italic leading-relaxed">
                        {typed}{!done && <span className="caret">▌</span>}
                    </div>
                    <div className="mt-2 text-right">
                        <button onClick={() => setVisible(false)} data-testid="mono-dismiss" className="text-[0.72rem] font-display uppercase tracking-[0.22em] text-[var(--fl-ink)]/65 hover:text-[var(--fl-arcane)]">
                            ▾ dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
