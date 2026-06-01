import React from 'react';
import { useGame } from '../../store/GameContext';
import { ASSETS } from '../../data/chapter1';

export default function FluffyCharacter() {
    const { state } = useGame();
    const { fluffyPos, fluffyFacing, mode } = state;

    return (
        <div
            className="fluffy-sprite"
            data-testid="fluffy-sprite"
            style={{
                left: `${fluffyPos}%`,
                transform: `translateX(-50%) scaleX(${fluffyFacing === 'right' ? -1 : 1})`,
            }}
        >
            <img
                src={ASSETS.fluffySprite}
                alt="Fluffy"
                className={`fluffy-img ${mode === 'fantasy' ? 'fluffy-fantasy' : 'fluffy-reality'}`}
                draggable={false}
            />
            <div className={`fluffy-shadow ${mode === 'fantasy' ? 'fantasy' : ''}`} />
        </div>
    );
}
