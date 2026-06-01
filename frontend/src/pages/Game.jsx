import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../store/GameContext';
import { ROOMS } from '../data/chapter1';
import SceneViewport from '../components/game/SceneViewport';
import VerbPanel from '../components/game/VerbPanel';
import InventoryBar from '../components/game/InventoryBar';
import DialogueBox from '../components/game/DialogueBox';
import MonologueCaption from '../components/game/MonologueCaption';
import QuestJournal from '../components/game/QuestJournal';
import EndingOverlay from '../components/game/EndingOverlay';
import BottomNavBar from '../components/game/BottomNavBar';
import useAmbientMusic from '../components/game/useAmbientMusic';

export default function Game() {
    const navigate = useNavigate();
    const { state, enterRoom } = useGame();
    const [journalOpen, setJournalOpen] = useState(false);
    const music = useAmbientMusic(state.room, state.mode);

    useEffect(() => {
        if (!state.visited[state.room]) enterRoom(state.room);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const room = ROOMS[state.room];

    return (
        <div className="game-stage" data-testid="game-stage">
            <SceneViewport room={room} mode={state.mode}>
                <MonologueCaption />
                <DialogueBox />
            </SceneViewport>

            <BottomNavBar onJournal={() => setJournalOpen(true)} music={music} />

            <div className="bottom-hud">
                <VerbPanel />
                <InventoryBar />
                <RoomMap currentRoom={state.room} />
            </div>

            {state.transitioning && <div className="room-transition" data-testid="room-transition" />}
            {journalOpen && <QuestJournal onClose={() => setJournalOpen(false)} />}
            {state.chapterDone && <EndingOverlay onMenu={() => navigate('/')} />}
        </div>
    );
}

function RoomMap({ currentRoom }) {
    const { state, enterRoom } = useGame();
    const rooms = [
        { id: 'bedroom',    label: 'Sanctum' },
        { id: 'livingroom', label: 'Hall'    },
        { id: 'garden',     label: 'Realm'   },
    ];
    return (
        <div className="surface-parchment-solid frame-soft p-3 flex flex-col" data-testid="room-map">
            <div className="font-display uppercase text-xs tracking-[0.25em] text-[var(--fl-ink)]/80 mb-2 text-center">Map of Wandering</div>
            <div className="flex-1 grid grid-cols-1 gap-1.5">
                {rooms.map(r => {
                    const visited = !!state.visited[r.id];
                    const active = currentRoom === r.id;
                    return (
                        <button
                            key={r.id}
                            data-testid={`map-room-${r.id}`}
                            disabled={!visited}
                            onClick={() => enterRoom(r.id)}
                            className={`text-left px-3 py-1.5 font-dialogue italic transition-all
                                ${active ? 'bg-[var(--fl-blood)] text-[var(--fl-light)] border-l-2 border-[var(--fl-candle)] not-italic font-display tracking-[0.18em] text-xs uppercase' :
                                  visited ? 'text-[var(--fl-ink)] hover:bg-[var(--fl-candle)]/25 border-l-2 border-transparent' :
                                  'text-[var(--fl-ink)]/35 cursor-not-allowed border-l-2 border-transparent'}`}
                        >
                            {visited ? r.label : '? ? ?'}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
