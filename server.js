const express = require('express');
const path = require('path');
const app = express();

// 정적 파일을 서빙하는 디렉토리 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
