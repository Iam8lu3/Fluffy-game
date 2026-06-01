import React from 'react';
import { useGame } from '../../store/GameContext';
import FluffyCharacter from './FluffyCharacter';

export default function SceneViewport({ room, mode, children }) {
    const { interact } = useGame();

    if (!room) return null;
    const bg = mode === 'fantasy' ? room.bgFantasy : room.bgReality;

    const onHotspotClick = (hsId, e) => {
        e.stopPropagation();
        interact(room.id, hsId);
    };

    return (
        <div className="scene-frame vignette" data-testid="scene-viewport">
            <div
                key={`${room.id}-${mode}`}
                className={`scene-bg ${mode} scene-fade-in`}
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div className="scene-overlay-grad" />
            <div className={`scene-magic-overlay ${mode === 'fantasy' ? 'on' : ''}`} />

            {/* Hotspots */}
            {room.hotspots.map(hs => {
                const label = mode === 'fantasy' ? hs.labelFantasy : hs.labelReality;
                return (
                    <button
                        key={hs.id}
                        type="button"
                        title={label}
                        data-testid={`hotspot-${hs.id}`}
                        onClick={(e) => onHotspotClick(hs.id, e)}
                        className="hotspot group"
                        style={{
                            left: `${hs.x}%`,
                            top: `${hs.y}%`,
                            width: `clamp(28px, ${hs.w}%, ${hs.w * 1.2}%)`,
                            height: `clamp(28px, ${hs.h}%, ${hs.h * 1.2}%)`,
                        }}
                    >
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-2 py-1 text-[0.72rem] tracking-widest font-display uppercase text-[var(--fl-candle-soft)] bg-[var(--fl-bg-deep)]/85 border border-[var(--fl-gold)]/50">
                            {label}
                        </span>
                    </button>
                );
            })}

            {/* Scene title */}
            <div className="scene-title">
                <span className="title-main">{mode === 'fantasy' ? room.titleFantasy : room.titleReality}</span>
                <span className="opacity-70">{mode === 'fantasy' ? '— as Fluffy understands it —' : '— what is actually there —'}</span>
            </div>

            <FluffyCharacter />

            {children}
        </div>
    );
}
