import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import ReactModal from 'react-modal';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

ReactModal.setAppElement('#root');

root.render(
  //<React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  //</React.StrictMode>
);
