import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './store/GameContext';
import MainMenu from './pages/MainMenu';
import Game from './pages/Game';
import Trailer from './pages/Trailer';
import Preview from './pages/Preview';

function App() {
    return (
        <div className="App" data-testid="app-root">
            <GameProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainMenu />} />
                        <Route path="/game" element={<Game />} />
                        <Route path="/trailer" element={<Trailer />} />
                        <Route path="/preview" element={<Preview />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </GameProvider>
        </div>
    );
}

export default App;
