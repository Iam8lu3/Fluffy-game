import React, { useEffect, useState } from 'react';
import { useGame } from '../../store/GameContext';
import { ASSETS } from '../../data/chapter1';

export default function FluffyCharacter() {
    const { state } = useGame();
    const { fluffyPos, fluffyFacing, mode, fluffyAction } = state;
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

    return (
        <div
            className={`fluffy-sprite ${isWalking ? 'walking' : ''}`}
            data-testid="fluffy-sprite"
            data-action={action}
            style={{
                left: `${fluffyPos}%`,
                transform: `translateX(-50%) scaleX(${fluffyFacing === 'right' ? -1 : 1})`,
            }}
        >
            <div className={`fluffy-anim action-${action}`}>
                <img
                    src={ASSETS.fluffySprite}
                    alt="Fluffy"
                    className={`fluffy-img ${mode === 'fantasy' ? 'fluffy-fantasy' : 'fluffy-reality'}`}
                    draggable={false}
                />
            </div>
            <div className={`fluffy-shadow ${mode === 'fantasy' ? 'fantasy' : ''}`} />
        </div>
    );
}
