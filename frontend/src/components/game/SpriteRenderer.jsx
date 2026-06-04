import React from 'react';
import { resolveSprite } from '../../data/sprites';

/**
 * SpriteRenderer — renders Fluffy in the requested pose.
 *
 * Resolution order:
 *   1. If a custom PNG is registered for (mode, pose) → render that image.
 *   2. If a sprite-sheet rect is registered           → render that crop.
 *   3. Otherwise                                       → fall back to the
 *      single static sprite with the matching CSS animation class.
 *
 * Either way, the same parent wrapper handles position, scaleX (facing) and
 * walking transitions — so the rest of the game does not care which path
 * is taken.
 */
export default function SpriteRenderer({ mode, pose, action, alt }) {
    const r = resolveSprite(mode, pose);

    if (r.kind === 'image') {
        return (
            <div className={`fluffy-anim action-${action}`}>
                <img
                    src={r.url}
                    alt={alt}
                    className={`fluffy-img fluffy-${mode}`}
                    draggable={false}
                />
            </div>
        );
    }

    if (r.kind === 'sheet') {
        const { url, x, y, w, h, naturalWidth, naturalHeight } = r;
        // Render the whole sheet as a giant <img> and clip it to (x,y,w,h)
        // using an overflow:hidden viewport. The viewport itself stays a
        // 1:1 square so the pose is always centred in the same footprint.
        return (
            <div className={`fluffy-anim action-${action}`}>
                <div
                    className={`fluffy-sheet-viewport fluffy-${mode}`}
                    style={{ aspectRatio: `${w} / ${h}` }}
                >
                    <img
                        src={url}
                        alt={alt}
                        draggable={false}
                        style={{
                            position: 'absolute',
                            left:   `${(-x / w) * 100}%`,
                            top:    `${(-y / h) * 100}%`,
                            width:  `${(naturalWidth  / w) * 100}%`,
                            height: `${(naturalHeight / h) * 100}%`,
                            maxWidth: 'none',
                        }}
                    />
                </div>
            </div>
        );
    }

    // Fallback — current single-sprite path. CSS animation class drives the
    // visible "pose" (walking bob, sniff dip, paw-up, sleep breathing…).
    return (
        <div className={`fluffy-anim action-${action}`}>
            <img
                src={r.url}
                alt={alt}
                className={`fluffy-img fluffy-${mode}`}
                draggable={false}
            />
        </div>
    );
}
