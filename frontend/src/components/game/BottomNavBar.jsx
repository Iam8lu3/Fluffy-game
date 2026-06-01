import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../store/GameContext';
import { CHAPTER_META, ROOMS } from '../../data/chapter1';

export default function BottomNavBar({ onJournal }) {
    const navigate = useNavigate();
    const { state, dispatch } = useGame();
    const room = ROOMS[state.room];
    const isFantasy = state.mode === 'fantasy';
    const locTitle = isFantasy ? room.titleFantasy : room.titleReality;

    return (
        <div className="nav-bar surface-parchment-solid" data-testid="bottom-nav">
            <div className="nav-section nav-left">
                <button data-testid="back-menu" onClick={() => navigate('/')} className="nav-btn">
                    <span className="nav-btn-glyph">⟵</span>
                    <span className="nav-btn-label">Menu</span>
                </button>
            </div>

            <div className="nav-section nav-center">
                <div className="nav-chapter font-display">Chapter {CHAPTER_META.number}</div>
                <div className="nav-location font-script">{locTitle}</div>
                <div className="nav-mode-hint font-dialogue">
                    {isFantasy ? 'as Fluffy understands it' : 'what is actually there'}
                </div>
            </div>

            <div className="nav-section nav-right">
                <button
                    data-testid="fantasy-toggle"
                    onClick={() => dispatch({ type: 'TOGGLE_MODE' })}
                    className={`mode-toggle ${isFantasy ? 'fantasy' : 'reality'}`}
                    aria-label="Toggle Fantasy / Reality"
                >
                    <span className={`mode-side ${isFantasy ? 'active' : ''}`}>Fantasy</span>
                    <span className="mode-pip" />
                    <span className={`mode-side ${!isFantasy ? 'active' : ''}`}>Reality</span>
                </button>
                <button
                    data-testid="hotspot-toggle"
                    onClick={() => dispatch({ type: 'TOGGLE_HOTSPOT_HINTS' })}
                    className={`nav-btn ${state.showHotspots ? 'pressed' : ''}`}
                    title="Show interactable spots"
                >
                    <span className="nav-btn-glyph">{state.showHotspots ? '◉' : '○'}</span>
                    <span className="nav-btn-label">Hints</span>
                </button>
                <button
                    data-testid="open-journal"
                    onClick={onJournal}
                    className="nav-btn nav-btn-primary"
                >
                    <span className="nav-btn-glyph">✦</span>
                    <span className="nav-btn-label">Journal</span>
                </button>
            </div>
        </div>
    );
}
