import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");

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

  html, body {
    font-family: 'Pretendard', sans-serif;
    font-size: 10px;
    font-weight: 500;
    width: 100%;
    height: 100%;
  }

  body > div {
    font-size: 16px;
    height: 100%;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
