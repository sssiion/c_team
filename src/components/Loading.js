import React from 'react';
import './styles/Loading.css'; // 스타일 파일 임포트

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
