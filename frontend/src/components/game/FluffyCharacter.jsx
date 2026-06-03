import React, { useEffect, useState } from 'react';
import { useGame } from '../../store/GameContext';
import { ASSETS, FLUFFY_SELF } from '../../data/chapter1';

export default function FluffyCharacter() {
    const { state, interact } = useGame();
    const { fluffyPos, fluffyFacing, mode, fluffyAction, room, verb } = state;
    const [microIdle, setMicroIdle] = useState('idle'); // idle | sit | groom — random ambient

    // Random ambient idle micro-animations when no action is pending
    useEffect(() => {
        if (fluffyAction !== 'idle') return;
        const t = setTimeout(() => {
            const roll = Math.random();
            if (roll < 0.18) setMicroIdle('sit');
            else if (roll < 0.30) setMicroIdle('groom');
            else setMicroIdle('idle');
            const reset = setTimeout(() => setMicroIdle('idle'), 2400);
            return () => clearTimeout(reset);
        }, 4000 + Math.random() * 5000);
        return () => clearTimeout(t);
    }, [fluffyAction, microIdle]);

    const action = fluffyAction !== 'idle' ? fluffyAction : microIdle;
    const isWalking = false; // CSS transition handles visible walking already
    const selfLabel = mode === 'fantasy' ? FLUFFY_SELF.labelFantasy : FLUFFY_SELF.labelReality;

    const verbWord = { look: 'Look at', use: 'Touch', talk: 'Talk to', take: 'Claim' }[verb] || 'Examine';

    return (
        <button
            type="button"
            className={`fluffy-sprite fluffy-interactable ${isWalking ? 'walking' : ''}`}
            data-testid="fluffy-sprite"
            data-action={action}
            title={`${verbWord} ${selfLabel}`}
            onClick={(e) => { e.stopPropagation(); interact(room, 'self'); }}
            style={{
                left: `${fluffyPos}%`,
                transform: `translateX(-50%) scaleX(${fluffyFacing === 'right' ? -1 : 1})`,
            }}
        >
            <div className={`fluffy-anim action-${action}`}>
                <img
                    src={ASSETS.fluffySprite}
                    alt={selfLabel}
                    className={`fluffy-img ${mode === 'fantasy' ? 'fluffy-fantasy' : 'fluffy-reality'}`}
                    draggable={false}
                />
            </div>
            <div className={`fluffy-shadow ${mode === 'fantasy' ? 'fantasy' : ''}`} />
        </button>
    );
}
