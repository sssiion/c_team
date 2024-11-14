import React, { useState } from 'react';
import { loginUser } from '../utils/api'; // api.js에서 loginUser 함수 임포트
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentUser }) => {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState(''); //(+)사용자 password 저장
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(userId, userPw); // loginUser 함수 호출
            setCurrentUser(data.user); // 로그인 성공 시 사용자 설정
            navigate('/webgl');
        } catch (error) {
            alert(error.message + "여기 오류1"); // 에러 메시지 출력
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your ID"
                    required
                />
                <input //(+) userPw 입력받는 곳
                    type="password"
                    placeholder="Enter your password!"
                    value={userPw}
                    onChange={(e) => setUserPw(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
