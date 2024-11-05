import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { saveGameState as saveGame, loadGameState as loadGame } from '../utils/api'; // api.js에서 함수 임포트
import './styles/Game.css'; // 스타일 파일 임포트

const Game = ({ currentUser }) => {
    const [loading, setLoading] = useState(true);
    const [gameState, setGameState] = useState(null);

    const saveGameState = async () => {
        const state = {
            playerPosition: { x: 100, y: 200 },
            score: 1500,
            inventory: ['sword', 'shield'],
        };

        try {
            const data = await saveGame(currentUser.userId, state); // saveGame 함수 호출
            console.log(data.message);
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    };

    const loadGameState = async () => {
        setLoading(true);
        try {
            const data = await loadGame(currentUser.userId); // loadGame 함수 호출
            setGameState(data); // 불러온 게임 상태 설정
        } catch (error) {
            console.error('Error loading game state:', error);
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        loadGameState();
    }, [currentUser]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="game-container">
            <h1 className="game-title">Game Component</h1>
            <div className="player-status">
                <h2>Player Position: {gameState?.playerPosition?.x}, {gameState?.playerPosition?.y}</h2>
                <h2>Score: {gameState?.score}</h2>
                <h3>Inventory: {gameState?.inventory.join(', ')}</h3>
            </div>
            <button className="save-button" onClick={saveGameState}>Save Game</button>
        </div>
    );
};

export default Game;
