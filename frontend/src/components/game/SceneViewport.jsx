import React from 'react';
import { useGame } from '../../store/GameContext';
import FluffyCharacter from './FluffyCharacter';

export default function SceneViewport({ room, mode, children }) {
    const { interact, state } = useGame();

    if (!room) return null;
    const bg = mode === 'fantasy' ? room.bgFantasy : room.bgReality;
    const showHints = state.showHotspots;

    return (
        <div className="scene-frame vignette" data-testid="scene-viewport">
            <div
                key={`${room.id}-${mode}`}
                className={`scene-bg ${mode} scene-fade-in`}
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="scene-overlay-grad" />
            <div className={`scene-magic-overlay ${mode === 'fantasy' ? 'on' : ''}`} />

            {/* Hotspots — invisible unless hover or hints mode */}
            {room.hotspots.map(hs => {
                const label = mode === 'fantasy' ? hs.labelFantasy : hs.labelReality;
                return (
                    <button
                        key={hs.id}
                        type="button"
                        title={label}
                        data-testid={`hotspot-${hs.id}`}
                        onClick={(e) => { e.stopPropagation(); interact(room.id, hs.id); }}
                        className={`hotspot ${showHints ? 'hints-on' : ''}`}
                        style={{
                            left: `${hs.x}%`,
                            top: `${hs.y}%`,
                            width: `clamp(28px, ${hs.w}%, ${hs.w * 1.2}%)`,
                            height: `clamp(28px, ${hs.h}%, ${hs.h * 1.2}%)`,
                        }}
                    >
                        <span className="hotspot-label">{label}</span>
                    </button>
                );
            })}

            <FluffyCharacter />

            {children}
        </div>
    );
}
