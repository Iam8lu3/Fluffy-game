import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS, ASSETS } from '../data/chapter1';
import { FUTURE_ROOMS } from '../data/futureChapters';
import { POSES, resolveSprite } from '../data/sprites';
import SpriteRenderer from '../components/game/SpriteRenderer';
import '../preview.css';

const ALL_POSES = [
    { id: POSES.IDLE,         label: 'Idle' },
    { id: POSES.WALK_1,       label: 'Walk 1' },
    { id: POSES.WALK_2,       label: 'Walk 2' },
    { id: POSES.SIT,          label: 'Sit' },
    { id: POSES.LOOK,         label: 'Look (examine)' },
    { id: POSES.SNIFF,        label: 'Sniff' },
    { id: POSES.PAW,          label: 'Paw / Touch' },
    { id: POSES.PICKUP,       label: 'Pickup / Take' },
    { id: POSES.SLEEP,        label: 'Sleep' },
    { id: POSES.REGAL,        label: 'Regal (fantasy-only)' },
    { id: POSES.PROCLAMATION, label: 'Proclamation (fantasy-only)' },
];

const ACTION_BY_POSE = {
    [POSES.IDLE]:         'idle',
    [POSES.WALK_1]:       'walking',
    [POSES.WALK_2]:       'walking',
    [POSES.SIT]:          'sit',
    [POSES.LOOK]:         'examine',
    [POSES.SNIFF]:        'sniff',
    [POSES.PAW]:          'paw',
    [POSES.PICKUP]:       'pickup',
    [POSES.SLEEP]:        'sleep',
    [POSES.REGAL]:        'idle',
    [POSES.PROCLAMATION]: 'talk',
};

export default function Preview() {
    const [tab, setTab] = useState('character');

    return (
        <div className="preview-page" data-testid="preview-page">
            <header className="preview-header">
                <div>
                    <h1 className="preview-title">Dev Preview</h1>
                    <p className="preview-subtitle">A developer-only gallery — not a chapter, not a story beat. Use it to QA art and sprites.</p>
                </div>
                <nav className="preview-nav">
                    <button
                        data-testid="preview-tab-character"
                        className={`preview-tab ${tab === 'character' ? 'active' : ''}`}
                        onClick={() => setTab('character')}
                    >Fluffy Poses</button>
                    <button
                        data-testid="preview-tab-rooms"
                        className={`preview-tab ${tab === 'rooms' ? 'active' : ''}`}
                        onClick={() => setTab('rooms')}
                    >Room Backgrounds</button>
                    <Link to="/" className="preview-back" data-testid="preview-back">← Main Menu</Link>
                </nav>
            </header>

            {tab === 'character' ? <CharacterGrid /> : <RoomGrid />}

            <footer className="preview-footer">
                <small>Drop new sprites into <code>data/sprites.js</code> and they appear here automatically.</small>
            </footer>
        </div>
    );
}

function CharacterGrid() {
    return (
        <section className="preview-character-grid" data-testid="character-grid">
            {ALL_POSES.map((pose) => (
                <article key={pose.id} className="preview-pose-card">
                    <h3 className="preview-pose-label">{pose.label}</h3>
                    <div className="preview-pose-pair">
                        <PosePane mode="reality" pose={pose.id} />
                        <PosePane mode="fantasy" pose={pose.id} />
                    </div>
                </article>
            ))}
        </section>
    );
}

function PosePane({ mode, pose }) {
    const res = resolveSprite(mode, pose);
    const action = ACTION_BY_POSE[pose] || 'idle';
    const isCustom = res.kind !== 'fallback';
    return (
        <div className={`preview-pose-pane preview-mode-${mode}`} data-testid={`pose-pane-${mode}-${pose}`}>
            <div className="preview-pane-tag">
                <span className="preview-pane-mode">{mode}</span>
                <span className={`preview-pane-source ${isCustom ? 'custom' : 'fallback'}`}>
                    {isCustom ? 'CUSTOM SPRITE' : 'fallback'}
                </span>
            </div>
            <div className="preview-sprite-stage">
                <div className="preview-sprite-shadow" />
                <div className="preview-sprite-wrap">
                    <SpriteRenderer mode={mode} pose={pose} action={action} alt={`${mode} ${pose}`} />
                </div>
            </div>
        </div>
    );
}

function RoomGrid() {
    const liveRooms = Object.values(ROOMS).map(r => ({
        ...r,
        chapter: r.chapter || 1,
        wired: true,
    }));
    const futureRooms = Object.values(FUTURE_ROOMS).map(r => ({
        ...r,
        wired: false,
    }));
    const all = [...liveRooms, ...futureRooms].sort((a, b) => (a.chapter || 1) - (b.chapter || 1));

    return (
        <section className="preview-room-grid" data-testid="room-grid">
            {all.map(room => (
                <article key={room.id} className="preview-room-card" data-testid={`room-card-${room.id}`}>
                    <header className="preview-room-header">
                        <span className="preview-room-chapter">Ch. {room.chapter || '?'}</span>
                        <div className="preview-room-titles">
                            <div className="preview-room-title-fantasy">{room.titleFantasy}</div>
                            <div className="preview-room-title-reality">{room.titleReality}</div>
                        </div>
                        <span className={`preview-room-status ${room.wired ? 'wired' : 'placeholder'}`}>
                            {room.wired ? 'live' : 'placeholder art'}
                        </span>
                    </header>
                    <div className="preview-room-pair">
                        <RoomPane label="Reality" url={room.bgReality} />
                        <RoomPane label="Fantasy" url={room.bgFantasy} />
                    </div>
                </article>
            ))}
        </section>
    );
}

function RoomPane({ label, url }) {
    return (
        <div className="preview-room-pane" data-testid={`room-pane-${label.toLowerCase()}`}>
            <div className="preview-room-label">{label}</div>
            <div
                className="preview-room-bg"
                style={{ backgroundImage: `url("${url || ASSETS.menuBg}")` }}
            />
        </div>
    );
}
