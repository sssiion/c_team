export const loginUser = async (userId, userPw) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, userPw }),
    });
    
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message+"여기에러2" || 'Login failed'); // 에러 처리
    }

    return await response.json(); // JSON 응답 반환
};

// 게임 상태 저장 요청 함수
export const saveGameState = async (userId, state) => {
    const response = await fetch('/api/saveGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, state }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error saving game state');
    }

    return await response.json(); // JSON 응답 반환
};

// 게임 상태 로드 요청 함수
export const loadGameState = async (userId) => {
    const response = await fetch(`/api/loadGame?userId=${userId}`);
    
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error loading game state');
    }

    return await response.json(); // JSON 응답 반환
};
