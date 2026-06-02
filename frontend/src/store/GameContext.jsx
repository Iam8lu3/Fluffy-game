import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { CHAPTER_META, ROOMS, ITEMS, COMBOS, DIALOGUE_TREES, deriveQuestStates, pickByCount } from '../data/chapter1';

const SAVE_KEY = 'fluffy_save_v2';

const initialState = {
    mode: 'fantasy',
    room: CHAPTER_META.startRoom,
    verb: 'look',
    inventory: {},
    selectedItem: null,
    flags: {},
    visited: {},
    seenMonologue: {},
    interactionCounts: {}, // {`${room}:${hsId}:${verb}`: n}
    log: [],
    chapterDone: false,
    dialogue: null,
    fluffyPos: 30,
    fluffyFacing: 'right',
    fluffyAction: 'idle', // idle | walking | examine | touch | talk | take | sit | groom
    showHotspots: false,
    transitioning: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FLUFFY_ACTION':
            return { ...state, fluffyAction: action.action };
        case 'SET_TRANSITIONING':
            return { ...state, transitioning: action.value };
        case 'TOGGLE_HOTSPOT_HINTS':
            return { ...state, showHotspots: !state.showHotspots };
        case 'TOGGLE_MODE':
            return { ...state, mode: state.mode === 'fantasy' ? 'reality' : 'fantasy' };
        case 'SET_VERB':
            return { ...state, verb: action.verb, selectedItem: null };
        case 'SET_ITEM_SELECTED':
            return { ...state, selectedItem: action.item };
        case 'GOTO_ROOM': {
            const spawn = ROOMS[action.room]?.spawnX ?? 30;
            return { ...state, room: action.room, visited: { ...state.visited, [action.room]: true }, dialogue: null, selectedItem: null, fluffyPos: spawn, fluffyFacing: 'right' };
        }
        case 'SET_FLUFFY_POS': {
            const newPos = action.pos;
            const facing = newPos > state.fluffyPos ? 'right' : (newPos < state.fluffyPos ? 'left' : state.fluffyFacing);
            return { ...state, fluffyPos: newPos, fluffyFacing: facing };
        }
        case 'PUSH_LOG':
            return { ...state, log: [...state.log.slice(-40), action.entry] };
        case 'SET_FLAG':
            return { ...state, flags: { ...state.flags, [action.flag]: true } };
        case 'SEEN_MONO':
            return { ...state, seenMonologue: { ...state.seenMonologue, [action.key]: true } };
        case 'GIVE_ITEM':
            return { ...state, inventory: { ...state.inventory, [action.item]: true } };
        case 'CONSUME_ITEMS': {
            const inv = { ...state.inventory };
            (action.items || []).forEach(i => { delete inv[i]; });
            return { ...state, inventory: inv, selectedItem: null };
        }
        case 'BUMP_INTERACTION': {
            const key = action.key;
            return { ...state, interactionCounts: { ...state.interactionCounts, [key]: (state.interactionCounts[key] || 0) + 1 } };
        }
        case 'START_DIALOGUE':
            return { ...state, dialogue: { treeId: action.treeId, nodeId: action.nodeId } };
        case 'SET_DIALOGUE_NODE':
            return { ...state, dialogue: { ...state.dialogue, nodeId: action.nodeId } };
        case 'END_DIALOGUE':
            return { ...state, dialogue: null };
        case 'CHAPTER_DONE':
            return { ...state, chapterDone: true };
        case 'LOAD':
            return { ...initialState, ...action.state };
        case 'RESET':
            return { ...initialState, visited: { [CHAPTER_META.startRoom]: true }, fluffyPos: ROOMS[CHAPTER_META.startRoom]?.spawnX ?? 30 };
        default:
            return state;
    }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, () => {
        try {
            const raw = localStorage.getItem(SAVE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                // Light shape validation — discard if the saved object is the wrong type
                // (corrupt save / older incompatible schema / tampering).
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                    return { ...initialState, ...parsed };
                }
            }
        } catch (err) {
            console.warn('[Fluffy] failed to load save:', err);
        }
        return { ...initialState, visited: { [CHAPTER_META.startRoom]: true }, fluffyPos: ROOMS[CHAPTER_META.startRoom]?.spawnX ?? 30 };
    });

    useEffect(() => {
        try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (err) { console.warn('[Fluffy] failed to write save:', err); }
    }, [state]);

    const quests = useMemo(() => deriveQuestStates(state), [state]);

    const pushLog = useCallback((entry) => dispatch({ type: 'PUSH_LOG', entry: { ts: Date.now(), ...entry } }), []);

    const pickMode = useCallback((variant, count = 0) => pickByCount(state.mode === 'fantasy' ? variant.fantasy : variant.reality, count), [state.mode]);

    const enterRoom = useCallback((roomId) => {
        // Fade-to-black transition
        dispatch({ type: 'SET_TRANSITIONING', value: true });
        setTimeout(() => {
            dispatch({ type: 'GOTO_ROOM', room: roomId });
            const room = ROOMS[roomId];
            if (room) {
                const key = `enter_${roomId}`;
                if (room.onEnterMonologue && !(room.onEnterMonologue.once && state.seenMonologue[key])) {
                    const text = state.mode === 'fantasy' ? room.onEnterMonologue.fantasy : room.onEnterMonologue.reality;
                    pushLog({ kind: 'mono', text });
                    dispatch({ type: 'SEEN_MONO', key });
                }
            }
            setTimeout(() => dispatch({ type: 'SET_TRANSITIONING', value: false }), 60);
        }, 380);
    }, [pushLog, state.mode, state.seenMonologue]);

    const triggerAction = useCallback((action, durationMs = 900) => {
        dispatch({ type: 'SET_FLUFFY_ACTION', action });
        setTimeout(() => dispatch({ type: 'SET_FLUFFY_ACTION', action: 'idle' }), durationMs);
    }, []);

    const interact = useCallback((roomId, hotspotId) => {
        const room = ROOMS[roomId];
        const hs = room.hotspots.find(h => h.id === hotspotId);
        if (!hs) return;
        const verb = state.verb;
        const ikey = `${roomId}:${hs.id}:${verb}`;
        const count = state.interactionCounts[ikey] || 0;

        // Move Fluffy toward the hotspot before the response
        const targetX = Math.max(6, Math.min(94, hs.x + hs.w / 2));
        dispatch({ type: 'SET_FLUFFY_POS', pos: targetX });

        // Map verb → character action animation
        const actionByVerb = { look: 'examine', use: 'touch', talk: 'talk', take: 'take' };
        triggerAction(actionByVerb[verb] || 'idle', 900);

        // movement (use on door)
        if (verb === 'use' && hs.use && hs.use.goto && !state.selectedItem) {
            setTimeout(() => enterRoom(hs.use.goto), 350);
            return;
        }

        // look
        if (verb === 'look' && hs.look) {
            const text = pickByCount(state.mode === 'fantasy' ? hs.look.fantasy : hs.look.reality, count);
            pushLog({ kind: 'mono', text });
            dispatch({ type: 'BUMP_INTERACTION', key: ikey });
            return;
        }

        // take
        if (verb === 'take') {
            if (hs.take && typeof hs.take === 'object' && hs.take.item) {
                const have = state.inventory[hs.take.item];
                if (have) {
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'I already carry that.' : "I already have that. It's in the satchel." });
                    return;
                }
                dispatch({ type: 'GIVE_ITEM', item: hs.take.item });
                const text = state.mode === 'fantasy' ? hs.take.onceFantasy : hs.take.onceReality;
                pushLog({ kind: 'mono', text });
                return;
            }
            if (hs.searchItem) {
                const have = state.inventory[hs.searchItem.item];
                if (have) {
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'I have already drawn what is here.' : "Already searched. Nothing else jumped out." });
                    return;
                }
                dispatch({ type: 'GIVE_ITEM', item: hs.searchItem.item });
                pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? hs.searchItem.onceFantasy : hs.searchItem.onceReality });
                return;
            }
            if (hs.take) {
                pushLog({ kind: 'mono', text: pickByCount(state.mode === 'fantasy' ? hs.take.fantasy : hs.take.reality, count) });
                dispatch({ type: 'BUMP_INTERACTION', key: ikey });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'Nothing here yields to my paw.' : 'Nothing to pick up here.' });
            return;
        }

        // talk
        if (verb === 'talk') {
            if (hs.talk?.tree) {
                dispatch({ type: 'START_DIALOGUE', treeId: hs.talk.tree, nodeId: DIALOGUE_TREES[hs.talk.tree].start });
                return;
            }
            if (hs.talk) {
                const text = pickByCount(state.mode === 'fantasy' ? hs.talk.fantasy : hs.talk.reality, count);
                pushLog({ kind: 'mono', text });
                if (hs.talk.sets) dispatch({ type: 'SET_FLAG', flag: hs.talk.sets });
                dispatch({ type: 'BUMP_INTERACTION', key: ikey });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'It keeps its counsel. Out of respect, I keep mine.' : "It is not the sort of thing that speaks." });
            return;
        }

        // use (with selected item if any)
        if (verb === 'use') {
            if (state.selectedItem) {
                if (hs.useWith && hs.useWith[state.selectedItem]) {
                    const result = hs.useWith[state.selectedItem];
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? result.fantasy : result.reality });
                    if (result.ending) {
                        dispatch({ type: 'SET_FLAG', flag: 'wyrm_defeated' });
                        dispatch({ type: 'CHAPTER_DONE' });
                    }
                    dispatch({ type: 'SET_ITEM_SELECTED', item: null });
                    return;
                }
                if (hs.useWith && hs.useWith.default) {
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? hs.useWith.default.fantasy : hs.useWith.default.reality });
                    return;
                }
                pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'The relic refuses to act upon it.' : "That doesn't seem to do anything here." });
                return;
            }
            if (hs.use) {
                if (hs.use.goto) { setTimeout(() => enterRoom(hs.use.goto), 350); return; }
                const text = pickByCount(state.mode === 'fantasy' ? hs.use.fantasy : hs.use.reality, count);
                pushLog({ kind: 'mono', text });
                dispatch({ type: 'BUMP_INTERACTION', key: ikey });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'There is no use I can put it to.' : "Nothing happens." });
            return;
        }
    }, [enterRoom, pushLog, state.interactionCounts, state.inventory, state.mode, state.selectedItem, state.verb]);

    const chooseDialogue = useCallback((choice) => {
        if (!state.dialogue) return;
        const tree = DIALOGUE_TREES[state.dialogue.treeId];
        if (choice.sets) dispatch({ type: 'SET_FLAG', flag: choice.sets });
        if (choice.gives) dispatch({ type: 'GIVE_ITEM', item: choice.gives });
        if (choice.next) {
            const next = tree.nodes[choice.next];
            dispatch({ type: 'SET_DIALOGUE_NODE', nodeId: choice.next });
            if (next?.sets) dispatch({ type: 'SET_FLAG', flag: next.sets });
        } else {
            dispatch({ type: 'END_DIALOGUE' });
        }
    }, [state.dialogue]);

    const combineItems = useCallback((a, b) => {
        const key1 = `${a}|${b}`;
        const key2 = `${b}|${a}`;
        const combo = COMBOS[key1] || COMBOS[key2];
        if (!combo) {
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'These relics do not call to one another.' : "Those don't go together. I think." });
            return false;
        }
        dispatch({ type: 'CONSUME_ITEMS', items: combo.consume });
        dispatch({ type: 'GIVE_ITEM', item: combo.result });
        pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? combo.fantasy : combo.reality });
        return true;
    }, [pushLog, state.mode]);

    const resetGame = useCallback(() => {
        try { localStorage.removeItem(SAVE_KEY); } catch (err) { console.warn('[Fluffy] failed to clear save:', err); }
        dispatch({ type: 'RESET' });
    }, []);

    const value = useMemo(() => ({
        state, dispatch, quests, pickMode,
        enterRoom, interact, chooseDialogue, combineItems, pushLog, resetGame,
        ROOMS, ITEMS,
    }), [state, quests, pickMode, enterRoom, interact, chooseDialogue, combineItems, pushLog, resetGame]);

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGame must be inside GameProvider');
    return ctx;
}

export function hasSave() {
    try { return !!localStorage.getItem(SAVE_KEY); } catch (err) { console.warn('[Fluffy] failed to check save:', err); return false; }
}
