const GameState = require('../models/GameState');

// 게임 상태 불러오기 함수
const getGameState = async (req, res) => {
  const { userId } = req.params;

  try {
    // 게임 상태 조회
    const gameState = await GameState.findOne({ userId });

    if (gameState) {
      return res.status(200).json({ gameState: gameState.gameState });
    } else {
      return res.status(404).json({ message: 'Game state not found' });
    }
  } catch (error) {
    console.error('Error retrieving game state:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 게임 상태 저장 함수
const saveGameState = async (req, res) => {
  const { userId, gameState } = req.body;

  try {
    // 기존 게임 상태 업데이트 또는 새로 생성
    const updatedGameState = await GameState.findOneAndUpdate(
      { userId },
      { gameState },
      { new: true, upsert: true } // upsert: true로 설정하여 없는 경우 새로 생성
    );

    return res.status(200).json({ message: 'Game state saved', gameState: updatedGameState.gameState });
  } catch (error) {
    console.error('Error saving game state:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getGameState, saveGameState };
