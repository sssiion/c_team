import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState(''); //(+)사용자 password 저장

  const checkID = async () => { //userId 존재여부에 따른 메시지 출력
    try{
      const checkResponse = await axios.post('/api/checkUserId', { userId });
      if (checkResponse.data.exists) {
        console.log("checkResponse.data.exists: ", checkResponse.data.exists);
        handleLogin();
      }
      else{
        const confirmMessage = `ID: ${userId}로 계정을 생성하시겠습니까?`;
        const CreateCheck = window.confirm(confirmMessage);
        if(CreateCheck){
          handleLogin();
        }
        else{ alert('ID와 Password를 다시 입력해주세요.');}
      }
    }
    catch(error){
      console.error('Login error:', error);
      alert('ERROR IN [checkID]');
    }
  };


  // const selectslot = async(userId) => {
    
  // };


  // //기존 saveGameStateToServer 코드
  // const saveGameStateToServer = async (userId, gameState, playerX = 422, playerY = 866) => {
  //   try {
  //     const playerStatus = {
  //       x: playerX,
  //       y: playerY,
  //       progress: gameState // 예시로 gameState를 progress로 사용
  //     };
  //     await axios.post('/api/saveGameState', { userId, gameState, playerStatus });
  //     console.log(`현재 위치: ${playerX}, ${playerY}`)
  //   } catch (error) {
  //     console.error('Error saving game state to server:', error);
  //     alert('게임 상태를 저장하는 중 오류가 발생했습니다.');
  //   }
  // };

  //(+)수정한 코드
  const saveGameStateToServer = async (userId, gameState, playerX = 422, playerY = 866, selectedSlot) => {
    try {
      // 선택된 슬롯에 따라 저장할 playerStatus 필드 선택
      let playerStatusKey = `playerStatus`; // 기본값은 slot1
      if (selectedSlot === 2) playerStatusKey = `playerStatus2`;
      if (selectedSlot === 3) playerStatusKey = `playerStatus3`;
  
      const playerStatus = {
        x: playerX,
        y: playerY,
        progress: gameState // 예시로 gameState를 progress로 사용
      };
  
      // 요청을 보낼 데이터 구조
      const payload = {
        userId,
        gameState,
        [playerStatusKey]: playerStatus // 선택된 슬롯의 상태만 전송
      };
  
      await axios.post('/api/saveGameState', payload);
      console.log(`현재 위치: ${playerX}, ${playerY}, 저장된 슬롯: ${playerStatusKey}`);
    } catch (error) {
      console.error('Error saving game state to server:', error);
      alert('게임 상태를 저장하는 중 오류가 발생했습니다.');
    }
  };


  const loadGameStateFromServer = async (userId) => {
    try {
        const response = await axios.get(`/api/getGameState/${userId}`);
        const { gameState, playerStatus, playerStatus2, playerStatus3 } = response.data;

        // 선택된 슬롯에 따라 적절한 playerStatus를 설정
        const selectedSlot = sessionStorage.getItem('selectedSlot'); // 기본값은 1
        let selectedPlayerStatus;

        switch (parseInt(selectedSlot, 10)) {
            case 1:
                selectedPlayerStatus = playerStatus;
                break;
            case 2:
                selectedPlayerStatus = playerStatus2;
                break;
            case 3:
                selectedPlayerStatus = playerStatus3;
                break;
            default:
                selectedPlayerStatus = playerStatus; // 기본값은 슬롯 1
        }

        alert(`Game state: ${gameState}, Player X: ${selectedPlayerStatus.x}, Player Y: ${selectedPlayerStatus.y}`);

        return { gameState, playerStatus: selectedPlayerStatus }; // 선택된 playerStatus 반환
    } 
    catch (error) {
        console.error('ERROR:', error);
        alert(`로드 데이터 오류 발생: ${error.message}`);
        return null; // 오류 발생 시 null 반환
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { userId, userPw });
      const { data } = response;
  
      // 로그인 성공 시 userId 저장
      sessionStorage.setItem('userId', userId);
  
      // 슬롯 선택 페이지로 리디렉션
      window.location.href = '/selectslot';
    } catch (error) {
      if (error.response && error.response.status === 501) {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      } else if (error.response && error.response.status === 502) {
        alert('ID와 Password를 다시 입력해주세요.');
      } else {
        console.error('Login error:', error);
        const msg = `HandleLogin ERROR : ${error}`;
        alert(msg);
      }
    }
  };
  
  
  
  

  return (
    <div>
      <h2>Login</h2>
      <input  
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input //(+) userPw 입력받는 곳
        type="password"
        placeholder="Enter your password!"
        value={userPw}
        onChange={(e) => setUserPw(e.target.value)}
      />
      <button onClick={checkID}>Next</button>
    </div>
  );
};

export default App;
