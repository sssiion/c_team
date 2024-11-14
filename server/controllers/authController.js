const User = require('../models/User');
const GameState = require('../models/GameState');

// 로그인 엔드포인트 처리 함수
const login = async (req, res) => {
  const { userId, userPw } = req.body;
  try {
    // 사용자 확인
    const user = await User.findOne({ userId });

    if (!user) { // 신규유저인 경우
      // 신규 사용자 생성
      const newUser = new User({ userId, userPw });
      await newUser.save();

      // 게임 상태 초기화 및 생성
      const newGameState = new GameState({ 
        userId, 
        // state: 1,
        playerStatus: {
          x: 422, // 기본 x 좌표 값 설정
          y: 866, // 기본 y 좌표 값 설정
          progress: 0 // 기본 progress 값 설정
        },
        playerStatus2: {
          x: 422, // 기본 x 좌표 값 설정
          y: 866, // 기본 y 좌표 값 설정
          progress: 0 // 기본 progress 값 설정
        },
        playerStatus3: {
          x: 422, // 기본 x 좌표 값 설정
          y: 866, // 기본 y 좌표 값 설정
          progress: 0 // 기본 progress 값 설정
        }
      });
      await newGameState.save();

      // 새로운 사용자 응답
      return res.status(201).json({ message: 'New user created, starting new game', newUser: true });
    } 
    else { // 기존유저인 경우
      if (user.userPw === userPw) { // 패스워드 일치 확인
        // 기존 사용자일 경우 게임 상태 조회
        const gameState = await GameState.findOne({ userId });

        if (gameState) {
          // 기존 게임 상태 전송
          return res.status(200).json({ 
            message: 'Resuming game', 
            newUser: false, 
            // gameState: gameState.state,
            playerStatus: gameState.playerStatus,
            playerStatus2: gameState.playerStatus2,
            playerStatus3: gameState.playerStatus3
          });
        } else {
          // 게임 상태가 없는 경우 새 상태 생성
          const newGameState = new GameState({ 
            userId, 
            // state: 1,
            playerStatus: {
              x: 422, // 기본 x 좌표 값 설정
              y: 866, // 기본 y 좌표 값 설정
              progress: 0 // 기본 progress 값 설정
            },
            playerStatus2: {
              x: 422, // 기본 x 좌표 값 설정
              y: 866, // 기본 y 좌표 값 설정
              progress: 0 // 기본 progress 값 설정
            },
            playerStatus3: {
              x: 422, // 기본 x 좌표 값 설정
              y: 866, // 기본 y 좌표 값 설정
              progress: 0 // 기본 progress 값 설정
            }
          });

          await newGameState.save();
          return res.status(201).json({ message: 'No game state found, starting new game', newUser: false });
        }
      } else {
        return res.status(501).json({ message: 'User Data is incorrect' }); // 패스워드 불일치
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const checkUserId = async (req, res) => {
  const { userId } = req.body;

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('ERROR checking user id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, checkUserId };
