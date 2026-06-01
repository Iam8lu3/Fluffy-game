import React, { useState } from 'react';
import { useGame } from '../../store/GameContext';
import { ITEMS } from '../../data/chapter1';

export default function InventoryBar() {
    const { state, dispatch, combineItems, pushLog } = useGame();
    const [hover, setHover] = useState(null);
    const [combineWith, setCombineWith] = useState(null);

    const owned = Object.keys(state.inventory);
    const slots = [...owned, ...Array(Math.max(0, 6 - owned.length)).fill(null)].slice(0, 8);

    const onSlotClick = (itemId) => {
        if (!itemId) return;

        if (state.verb === 'combine' || combineWith) {
            if (combineWith && combineWith !== itemId) {
                combineItems(combineWith, itemId);
                setCombineWith(null);
                return;
            }
            setCombineWith(itemId);
            return;
        }

        if (state.verb === 'use') {
            dispatch({ type: 'SET_ITEM_SELECTED', item: itemId === state.selectedItem ? null : itemId });
            return;
        }

        if (state.verb === 'look' || state.verb === 'take') {
            const item = ITEMS[itemId];
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? item.descFantasy : item.descReality });
            return;
        }

        // default: select for use
        dispatch({ type: 'SET_ITEM_SELECTED', item: itemId === state.selectedItem ? null : itemId });
    };

    return (
        <div className="surface-parchment-solid frame-soft p-3 flex flex-col" data-testid="inventory-bar">
            <div className="flex items-center justify-between mb-2">
                <div className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-ink)]/80">Satchel of Relics</div>
                <button
                    data-testid="combine-toggle"
                    onClick={() => { setCombineWith(null); dispatch({ type: 'SET_VERB', verb: state.verb === 'combine' ? 'use' : 'combine' }); }}
                    className={`text-[0.7rem] font-display uppercase tracking-[0.2em] px-2 py-0.5 border ${state.verb === 'combine' ? 'bg-[var(--fl-arcane)] text-[var(--fl-candle-soft)] border-[var(--fl-candle)]' : 'border-[var(--fl-gold)]/60 text-[var(--fl-ink)]/85'}`}
                >
                    {state.verb === 'combine' ? (combineWith ? 'Pick 2nd' : 'Pick 1st') : 'Combine'}
                </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
                {slots.map((id, i) => {
                    const item = id ? ITEMS[id] : null;
                    const selected = state.selectedItem === id;
                    const inCombine = combineWith === id;
                    return (
                        <div
                            key={i}
                            className={`inv-slot relative ${selected || inCombine ? 'active' : ''}`}
                            data-testid={id ? `inv-${id}` : `inv-empty-${i}`}
                            onClick={() => onSlotClick(id)}
                            onMouseEnter={() => setHover(id)}
                            onMouseLeave={() => setHover(null)}
                        >
                            {item ? (
                                <span className="font-script text-2xl text-[var(--fl-candle-soft)] glow-candle">{item.glyph}</span>
                            ) : <span className="text-[var(--fl-gold)]/30 font-script">·</span>}
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 min-h-[2.2em] text-[0.78rem] font-dialogue italic text-[var(--fl-ink)]/85 text-center leading-tight">
                {hover && ITEMS[hover] ? (state.mode === 'fantasy' ? ITEMS[hover].nameFantasy : ITEMS[hover].nameReality) :
                  (state.verb === 'combine' ? (combineWith ? `Combine ${combineWith.replace('_',' ')} with…` : 'Tap a relic to begin combining.') :
                  'Hover a relic to read its name.')}
            </div>
        </div>
    );
}
