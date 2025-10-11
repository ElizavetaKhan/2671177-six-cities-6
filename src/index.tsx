import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const offersCount = 5;

root.render(
  <React.StrictMode>
    <App cardsCount={offersCount} />
  </React.StrictMode>
);
