# Danuh

인공지능 AI와 결합하여 단어장입니다.<br>
Webpack을 사용하여 만든 웹프로젝트입니다.

## URL & IOS APP

[Danuh Link](https://danuh.kr/)

<img src="https://github.com/TTWord/DanuhWeb/assets/87410294/43db4c76-7a8b-44c3-b79f-5f995563de3b"/>

## Service Architecture

<img align=center width="60%" alt="Architecture" src="https://github.com/TTWord/DanuhWeb/assets/87410294/0a886066-e95c-4366-b1a5-52e3f7ef1af0">

## Member

박수봉 (PM & FrontEnd)<br>
노지훈 (FrontEnd)<br>
김정현 (BackEnd)<br>
구슬 (Designer)<br>

## Using Library

<details>
  <summary>TypeScript</summary>
  <ul>
    <li>JavaScript의 타입 에러를 방지를 통해 버그 방지 & 빠른 작업 효율 증가를 위해 도입하였습니다.</li>
  </ul>
</details>

<details>
  <summary>Styled Components</summary>
  <ul>
    <li>CSS-in-JS의 대표적인 라이브러리로 컴포넌트 자체에 바로 CSS를 작성할 수 있습니다.</li>
    <li> CSS, SASS 파일을 따로 작성하여 import하는 것보다 작업 속도와 유지 보수 측면에서의 이점이 있어 사용하게 되었습니다.</li>
  </ul>
</details>

<details>
  <summary>Axios</summary>
  <ul>
    <li>React에서 가장 많이 사용되는 HTTP 비동기 통신 라이브러리로, fetch api와 다르게 라이브러리이기 때문에 더 많은 편의 기능을 제공해주어 사용했습니다.</li>
  </ul>
</details>

<details>
  <summary>React Query</summary>
  <ul>
    <li>API를 통해 가져오는 서버 데이터를 관리하기 위해 사용하였습니다.</li>
    <li>키값을 이용한 캐싱 기능으로 데이터 refresh 등에서 이점이 있습니다.</li>
  </ul>
</details>

<details>
  <summary>Recoil</summary>
  <ul>
    <li>더 빠른 작업 속도를 위해 리액트 쿼리를 도입하고 나서 전역 상태 관리에 대해서도 고민하게 되었습니다. 서버 상태 관리가 리액트 쿼리로 빠지면서 관리해야 할 전역 상태의 크기가 작아졌고, 그에 따라 전역 상태를 리덕스로 관리하는 것보다 더욱 쉽게 관리할 수 있는 전역 상태 관리 라이브러리를 사용해도 되겠다고 판단하였습니다. 그래서 useState와 같이 전역 상태를 관리할 수 있는 Recoil이라는 전역 상태 관리 라이브러리를 알게 되었고 적용하게 되었습니다.</li>
  </ul>
</details>

<details>
  <summary>React Router</summary>
  <ul>
    <li>앱처럼 보이게 하기 위해 네비게이트 푸쉬/팝을 구현하였습니다.</li>
  </ul>
</details>

<details>
  <summary>RN + WebView</summary>
  <ul>
    <li>웹개발이 메인이기에 앱개발을 새로 하는것보다 빠른 개발이 가능하여 적용하였습니다.</li>
    <li>또한 앱 업데이트 시, 심사에 시간이 소요되지 않는 부분도 있어 적용하였습니다.</li>
  </ul>
</details>
