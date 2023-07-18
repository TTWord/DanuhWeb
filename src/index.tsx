import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import ReactModal from 'react-modal';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

ReactModal.setAppElement('#root');
ReactModal.defaultStyles = {
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 100,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    outline: 'none',
  },
};

root.render(
  //<React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  //</React.StrictMode>
);
