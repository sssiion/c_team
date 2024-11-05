import React from 'react';
import App from './App';
import './styles/index.css'; // 기본 CSS 파일
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
