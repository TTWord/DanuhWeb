import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const CustomStyles = createGlobalStyle`
  ${reset}

  @font-face {
      font-family: 'GmarketSans';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
      font-weight: 300;
      font-style: normal;
  }
  
  @font-face {
      font-family: 'GmarketSans';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }

  @font-face {
      font-family: 'GmarketSans';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
      font-weight: 700;
      font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
      font-family: 'Pretendard';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff') format('woff');
      font-weight: 500;
      font-style: normal;
  }

  @font-face {
      font-family: 'Pretendard';
      src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff') format('woff');
      font-weight: 600;
      font-style: normal;
  }

  :root {
    --vh: 100%;
  }

  html, body {
    font-family: "Pretendard", sans-serif;
    font-size: 10px;
    font-weight: 500;
    width: 100%;
    height: 100%;
  }

  body > #root {
    font-size: 16px;
    width: 100%;
    height: 100%;
    position: fixed;
  }

  div {
    ::-webkit-scrollbar {
      display: none;
    }   
  }
  

  textarea {
    resize: none;
    outline: none;
    border-radius: 0;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  input {
    outline: none;
    border-radius: 0;
  }


  input:-webkit-autofill {
   -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
   -webkit-text-size-adjust: inherit;
  }
  
  button, input, a {
    -webkit-tap-highlight-color: transparent;
  }

  * {
    box-sizing: border-box;
  }

  button, input, textarea {
    border: none;
    background-color: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button {
    cursor: pointer;
    color: inherit;
    user-select: none;
  }
`;

const GlobalStyles = () => (
  <>
    <CustomStyles />
  </>
);

export default GlobalStyles;
