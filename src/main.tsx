import React from 'react'
// import ReactDOM from 'react-dom/client' // 리액트돔 사용 (클라용)
import { hydrateRoot } from 'react-dom/client'; // hydrate 사용 (서버용))
import App from './App.tsx';
import './index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

hydrateRoot(document.getElementById('root')!, 
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

