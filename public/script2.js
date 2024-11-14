const form = document.getElementById('loginForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  const userId = document.getElementById('userId').value;
  const userPw = document.getElementById('userPw').value; //(+)userPw 받을 변수

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, userPw }), // JSON 형식으로 요청 본문에 포함 (+) userPW 추가
    });

    const data = await response.json(); 

    // 응답에 따라 처리
    if (response.ok) {
      // 로그인 성공, WebGL 페이지로 이동
      localStorage.setItem('gameState', JSON.stringify({})); // 기본 게임 상태 설정
      window.location.href = '/webgl'; // WebGL 페이지로 리디렉션
    } else {
      alert(data.message); // 에러 메시지 표시
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});