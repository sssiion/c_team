const User = require('../models/User');
const GameState = require('../models/GameState');

// 로그인 엔드포인트 처리 함수
const login = async (req, res) => {
  const { userId } = req.body;

  try {
    // 사용자 확인
    const user = await User.findOne({ userId });

    if (!user) {
      // 신규 사용자 생성
      const newUser = new User({ userId });
      await newUser.save();

      // 게임 상태 초기화 및 생성
      const newGameState = new GameState({ userId, gameState: {} });
      await newGameState.save();

      // 새로운 사용자 응답
      return res.status(201).json({ message: 'New user created, starting new game', newUser: true });
    } else {
      // 기존 사용자일 경우 게임 상태 조회
      const gameState = await GameState.findOne({ userId });

      if (gameState) {
        // 기존 게임 상태 전송
        return res.status(200).json({ message: 'Resuming game', newUser: false, gameState: gameState.gameState });
      } else {
        // 게임 상태가 없는 경우 새 상태 생성
        const newGameState = new GameState({ userId, gameState: {} });
        await newGameState.save();
        return res.status(201).json({ message: 'No game state found, starting new game', newUser: true });
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
