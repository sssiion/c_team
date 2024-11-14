//GPT가 수정한 코드
const GameState = require('../models/GameState');

// 게임 상태 불러오기 함수
// 수정된 코드

// 게임 상태 불러오기 함수
const getGameState = async (req, res) => {
  const { userId } = req.params;

  try {
    const gameState = await GameState.findOne({ userId });

    if (gameState) {
      return res.status(200).json({ 
        playerStatus: gameState.playerStatus,
        playerStatus2: gameState.playerStatus2,
        playerStatus3: gameState.playerStatus3,
        message: "Data retrieved successfully"
      });
    } else {
      return res.status(404).json({ message: 'Game state not found' });
    }
  } catch (error) {
    console.error('Error retrieving game state:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};









// // 기존 게임 상태 저장 함수
// const saveGameState = async (req, res) => {
//   const { userId, state, playerStatus } = req.body; // playerStatus 추가

//   try {
//     // 기존 게임 상태 업데이트 또는 새로 생성
//     console.log('Received body:', req.body);
//     //기존코드
//     const updatedGameState = await GameState.findOneAndUpdate(
//       { userId },
//       {
//         state, // state 필드 업데이트
//         playerStatus: {
//           x: playerStatus.x,
//           y: playerStatus.y
//         } // playerStatus 필드 추가
//       },
//       { new: true, upsert: true } // upsert: true로 설정하여 없는 경우 새로 생성
//     );

//     return res.status(200).json({ message: 'Game state saved', updatedGameState });
//   } catch (error) {
//     console.error('Error saving game state:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }

//   //   //(+)수정한 코드
//   //   const updatedGameState = await GameState.findOneAndUpdate(
//   //     { userId },
//   //     { state, playerStatus },
//   //     { new: true, upsert: true }
//   //   ) ;
//   //   res.status(200).json({ message: 'Game state saved', updatedGameState });
//   // } catch (error) {
//   //   console.error('Error saving game state:', error);
//   //   res.status(500).json({ message: 'Server error', error });
//   // }
// };


//(+) 수정한 게임 상태 저장 필드....
const saveGameState = async (req, res) => {
  const { userId, playerStatus, playerStatus2, playerStatus3 } = req.body;

  try {
    // 기존 게임 상태 업데이트 또는 새로 생성
    const updateFields = {};
    if (playerStatus) {
      updateFields.playerStatus = playerStatus;
    }
    if (playerStatus2) {
      updateFields.playerStatus2 = playerStatus2;
    }
    if (playerStatus3) {
      updateFields.playerStatus3 = playerStatus3;
    }

    const updatedGameState = await GameState.findOneAndUpdate(
      { userId },
      { ...updateFields, state }, // 선택적으로 업데이트할 필드만 포함
      { new: true, upsert: true } // upsert: true로 설정하여 없는 경우 새로 생성
    );

    return res.status(200).json({ message: 'Game state saved', updatedGameState });
  } catch (error) {
    console.error('Error saving game state:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};







//(+)webgl이랑 연동할 함수 (데이터 불러오기)
const loadProgress = async(req,res) =>{
  const { userId } = req.query;
  try {
    const gameState = await GameState.findOne({ userId });
    if (gameState) {
      res.status(200).json({ progress: gameState.state });
    } else {
      res.status(404).json({ message: '진행도를 찾을 수 없음' });
    }
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
}


//(+)webgl이랑 연동할 함수 (데이터 저장하기)
const saveProgress = async(req, res) => {
  const { userId, progress } = req.body;
  try {
    const updatedGameState = await GameState.findOneAndUpdate(
      { userId },
      { state: progress },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: '진행도 저장 완료', gameState: updatedGameState });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error });
  }
}


module.exports = { getGameState, saveGameState, loadProgress, saveProgress};
