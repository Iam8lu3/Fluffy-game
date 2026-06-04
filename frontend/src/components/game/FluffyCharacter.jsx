import React, { useEffect, useState } from 'react';
import { useGame } from '../../store/GameContext';
import { FLUFFY_SELF } from '../../data/chapter1';
import { POSES, WALK_CYCLE } from '../../data/sprites';
import SpriteRenderer from './SpriteRenderer';

/**
 * FluffyCharacter — positioning + facing wrapper around SpriteRenderer.
 *
 * The pose ID for the renderer is derived from `fluffyAction`:
 *   - walking → cycles WALK_1 ↔ WALK_2 (so the engine can later swap in two
 *               PNGs without touching this component)
 *   - examine → LOOK
 *   - touch   → PAW
 *   - talk    → IDLE (mouth movement is implied; verb-specific bob in CSS)
 *   - pickup  → PICKUP
 *   - paw     → PAW
 *   - groom   → SIT
 *   - sit     → SIT
 *   - sleep   → SLEEP
 *   - idle    → ambient cycle: IDLE / SIT / LOOK / (rare) SLEEP
 */
export default function FluffyCharacter() {
    const { state, interact } = useGame();
    const { fluffyPos, fluffyFacing, mode, fluffyAction, fluffyWalkMs, room, verb } = state;

    // Walk-cycle frame swap while walking
    const [walkFrame, setWalkFrame] = useState(0);
    useEffect(() => {
        if (fluffyAction !== 'walking') return;
        const iv = setInterval(() => setWalkFrame(f => (f + 1) % WALK_CYCLE.length), 180);
        return () => clearInterval(iv);
    }, [fluffyAction]);

    // Ambient idle pose drift (so he's not a statue when nothing is happening)
    const [idlePose, setIdlePose] = useState(POSES.IDLE);
    useEffect(() => {
        if (fluffyAction !== 'idle') { setIdlePose(POSES.IDLE); return; }
        const t = setTimeout(() => {
            const r = Math.random();
            if (r < 0.15) setIdlePose(POSES.SIT);
            else if (r < 0.22) setIdlePose(POSES.LOOK);
            else if (r < 0.24) setIdlePose(POSES.SLEEP);
            else setIdlePose(POSES.IDLE);
        }, 3500 + Math.random() * 4500);
        return () => clearTimeout(t);
    }, [fluffyAction, idlePose]);

    const pose = (() => {
        switch (fluffyAction) {
            case 'walking': return WALK_CYCLE[walkFrame];
            case 'examine': return POSES.LOOK;
            case 'touch':   return POSES.PAW;
            case 'talk':    return POSES.IDLE;
            case 'pickup':  return POSES.PICKUP;
            case 'paw':     return POSES.PAW;
            case 'groom':   return POSES.SIT;
            case 'sit':     return POSES.SIT;
            case 'sleep':   return POSES.SLEEP;
            case 'take':    return POSES.PICKUP;
            default:        return idlePose;
        }
    })();

    const selfLabel = mode === 'fantasy' ? FLUFFY_SELF.labelFantasy : FLUFFY_SELF.labelReality;
    const verbWord  = { look: 'Look at', use: 'Touch', talk: 'Talk to', take: 'Claim' }[verb] || 'Examine';

    return (
        <button
            type="button"
            className={`fluffy-sprite fluffy-interactable ${fluffyAction === 'walking' ? 'walking' : ''}`}
            data-testid="fluffy-sprite"
            data-action={fluffyAction}
            data-pose={pose}
            title={`${verbWord} ${selfLabel}`}
            onClick={(e) => { e.stopPropagation(); interact(room, 'self'); }}
            style={{
                left: `${fluffyPos}%`,
                transform: `translateX(-50%) scaleX(${fluffyFacing === 'right' ? -1 : 1})`,
                // pipe the dynamically-computed walk duration into CSS
                transitionDuration: `${fluffyWalkMs || 600}ms, 250ms`,
            }}
        >
            <SpriteRenderer mode={mode} pose={pose} action={fluffyAction} alt={selfLabel} />
            <div className={`fluffy-shadow ${mode === 'fantasy' ? 'fantasy' : ''}`} />
        </button>
    );
}
