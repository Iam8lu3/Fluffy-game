import React, { useEffect, useState } from 'react';
import { useGame } from '../../store/GameContext';
import { DIALOGUE_TREES, ASSETS } from '../../data/chapter1';

const GNOME_PORTRAIT = ASSETS.portraitFantasy; // reuse for gnome
const GNOME_PORTRAIT_REAL = ASSETS.portraitReality;

export default function DialogueBox() {
    const { state, chooseDialogue } = useGame();
    const [typed, setTyped] = useState('');
    const [done, setDone] = useState(false);

    const dlg = state.dialogue;
    const node = dlg ? DIALOGUE_TREES[dlg.treeId]?.nodes[dlg.nodeId] : null;
    const text = node ? (state.mode === 'fantasy' ? node.fantasy : node.reality) : '';
    const hint = node?.hint ? (state.mode === 'fantasy' ? node.hint.fantasy : node.hint.reality) : null;
    const speaker = node ? (state.mode === 'fantasy' ? node.speakerFantasy : node.speakerReality) : '';

    useEffect(() => {
        setTyped(''); setDone(false);
        if (!text) return;
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setTyped(text.slice(0, i));
            if (i >= text.length) { clearInterval(iv); setDone(true); }
        }, 18);
        return () => clearInterval(iv);
    }, [text, state.dialogue?.nodeId]);

    if (!node) return null;

    const portrait = state.mode === 'fantasy' ? GNOME_PORTRAIT : GNOME_PORTRAIT_REAL;

    return (
        <div className="dialogue-overlay" data-testid="dialogue-box">
            <div className="pointer-events-auto surface-parchment frame-ornate flex gap-5 p-5 md:p-6">
                <div className="hidden md:block shrink-0 w-36 h-36 frame-soft overflow-hidden bg-[var(--fl-arcane-deep)] grayscale-[0.05]">
                    <img alt="speaker" src={portrait} className="w-full h-full object-cover" style={{ filter: state.mode === 'fantasy' ? 'none' : 'sepia(0.4) saturate(0.7)' }} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-script text-[var(--fl-blood)] text-2xl mb-1 leading-none">{speaker}</div>
                    {hint && (
                        <div className="font-dialogue italic text-[var(--fl-ink)]/75 text-sm mb-2">{hint}</div>
                    )}
                    <div className="font-dialogue text-[var(--fl-ink)] text-lg leading-relaxed min-h-[3.2em]">
                        {typed}
                        {!done && <span className="caret">▌</span>}
                    </div>
                    <div className="mt-3 flex flex-col gap-1.5">
                        {(done || true) && node.choices?.map((c, idx) => (
                            <button
                                key={idx}
                                disabled={!done}
                                onClick={() => chooseDialogue(c)}
                                data-testid={`dlg-choice-${idx}`}
                                className="choice-btn disabled:opacity-50 disabled:cursor-wait"
                            >
                                <span className="text-[var(--fl-candle)] mr-2">›</span>{c.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
