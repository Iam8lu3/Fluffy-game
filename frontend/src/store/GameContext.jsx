import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { CHAPTER_META, ROOMS, ITEMS, COMBOS, DIALOGUE_TREES, deriveQuestStates } from '../data/chapter1';

const SAVE_KEY = 'fluffy_save_v1';

const initialState = {
    mode: 'fantasy', // 'fantasy' | 'reality'
    room: CHAPTER_META.startRoom,
    verb: 'look', // look | use | talk | take | combine
    inventory: {}, // {itemId: true}
    selectedItem: null, // for use/combine
    flags: {}, // story flags
    visited: {}, // visited rooms
    seenMonologue: {}, // monologue once-trackers
    log: [], // [{kind:'mono'|'dialog'|'sys', text, speakerFantasy?, speakerReality?, portrait?}]
    chapterDone: false,
    dialogue: null, // active dialogue node id ref { treeId, nodeId } or null
    lastTake: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_MODE':
            return { ...state, mode: state.mode === 'fantasy' ? 'reality' : 'fantasy' };
        case 'SET_VERB':
            return { ...state, verb: action.verb, selectedItem: null };
        case 'SET_ITEM_SELECTED':
            return { ...state, selectedItem: action.item };
        case 'GOTO_ROOM':
            return { ...state, room: action.room, visited: { ...state.visited, [action.room]: true }, dialogue: null, selectedItem: null };
        case 'VISIT':
            return { ...state, visited: { ...state.visited, [action.room]: true } };
        case 'PUSH_LOG':
            return { ...state, log: [...state.log.slice(-40), action.entry] };
        case 'SET_FLAG':
            return { ...state, flags: { ...state.flags, [action.flag]: true } };
        case 'SEEN_MONO':
            return { ...state, seenMonologue: { ...state.seenMonologue, [action.key]: true } };
        case 'GIVE_ITEM':
            return { ...state, inventory: { ...state.inventory, [action.item]: true }, lastTake: action.item };
        case 'CONSUME_ITEMS': {
            const inv = { ...state.inventory };
            (action.items || []).forEach(i => { delete inv[i]; });
            return { ...state, inventory: inv, selectedItem: null };
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
            return { ...initialState, visited: { [CHAPTER_META.startRoom]: true } };
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
                return { ...initialState, ...parsed };
            }
        } catch { /* ignore */ }
        return { ...initialState, visited: { [CHAPTER_META.startRoom]: true } };
    });

    // Auto-save
    useEffect(() => {
        try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
    }, [state]);

    const quests = useMemo(() => deriveQuestStates(state), [state]);

    const pushLog = useCallback((entry) => dispatch({ type: 'PUSH_LOG', entry: { ts: Date.now(), ...entry } }), []);

    const pickMode = useCallback((variant) => (state.mode === 'fantasy' ? variant.fantasy : variant.reality), [state.mode]);

    const enterRoom = useCallback((roomId) => {
        dispatch({ type: 'GOTO_ROOM', room: roomId });
        const room = ROOMS[roomId];
        if (!room) return;
        const key = `enter_${roomId}`;
        if (room.onEnterMonologue) {
            if (room.onEnterMonologue.once && state.seenMonologue[key]) return;
            const text = state.mode === 'fantasy' ? room.onEnterMonologue.fantasy : room.onEnterMonologue.reality;
            pushLog({ kind: 'mono', text });
            dispatch({ type: 'SEEN_MONO', key });
        }
    }, [pushLog, state.mode, state.seenMonologue]);

    const interact = useCallback((roomId, hotspotId) => {
        const room = ROOMS[roomId];
        const hs = room.hotspots.find(h => h.id === hotspotId);
        if (!hs) return;
        const verb = state.verb;

        // movement (use on door)
        if (verb === 'use' && hs.use && hs.use.goto && !state.selectedItem) {
            enterRoom(hs.use.goto);
            return;
        }

        // look
        if (verb === 'look' && hs.look) {
            pushLog({ kind: 'mono', text: pickMode(hs.look) });
            return;
        }

        // take
        if (verb === 'take') {
            if (hs.take) {
                const have = state.inventory[hs.take.item];
                if (have) {
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'I already possess this relic.' : "You already have that. It's in your... mouth-bag? Inventory." });
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
                    pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'No further relics hide here.' : 'You already searched. Nothing else jumped out.' });
                    return;
                }
                dispatch({ type: 'GIVE_ITEM', item: hs.searchItem.item });
                pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? hs.searchItem.onceFantasy : hs.searchItem.onceReality });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'There is nothing here to claim.' : 'Nothing to take here.' });
            return;
        }

        // talk
        if (verb === 'talk') {
            if (hs.talk?.tree) {
                dispatch({ type: 'START_DIALOGUE', treeId: hs.talk.tree, nodeId: 'g_intro' });
                return;
            }
            if (hs.talk) {
                pushLog({ kind: 'mono', text: pickMode(hs.talk) });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'Silence is its only tongue.' : "It's an inanimate object. It will not chat." });
            return;
        }

        // use (with selected item if any)
        if (verb === 'use') {
            if (state.selectedItem) {
                // useWith mapping on hotspot
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
                pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'The relic refuses to act upon it.' : "That doesn't seem to do anything." });
                return;
            }
            if (hs.use) {
                if (hs.use.goto) { enterRoom(hs.use.goto); return; }
                pushLog({ kind: 'mono', text: pickMode(hs.use) });
                return;
            }
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'I have no use for this.' : "Nothing happens." });
            return;
        }
    }, [enterRoom, pickMode, pushLog, state.inventory, state.mode, state.selectedItem, state.verb]);

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
            pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? 'These relics do not call to one another.' : "Those don't go together. You're sure of it. Mostly." });
            return false;
        }
        dispatch({ type: 'CONSUME_ITEMS', items: combo.consume });
        dispatch({ type: 'GIVE_ITEM', item: combo.result });
        pushLog({ kind: 'mono', text: state.mode === 'fantasy' ? combo.fantasy : combo.reality });
        return true;
    }, [pushLog, state.mode]);

    const resetGame = useCallback(() => {
        try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ }
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
    try { return !!localStorage.getItem(SAVE_KEY); } catch { return false; }
}
