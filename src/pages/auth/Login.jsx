import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import BackButtonImg from "@/assets/svg/icons/icon-back-button.svg"

const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const MainWrapper = styled.div`
  width: 393px;
  height: 852px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid black;
`;
const LoginWrapper = styled.div`
  width: 249px;
  height: 143px;
  //margin-bottom: 20px;
  background-color: #3d3d3d;
  color: white;
`;
const SignInWrapper = styled.div`
  width: 249px;
  height: 30px;
  background-color: #218376;
  color: white;
`;
const AskAccount = styled.div`
  width: 249px;
  height: 38px;
  font-size: 12px;
`;
const SingInbutton = styled.button`
  width: 47px;
  height: 12px;
  display: flex;
  justify-content: center;
  font-size: 12px;
`;
const BackButton = styled.button`
  width: 100px;
  height: 100px;
  position: fixed;
  top: 10px;
  left: 30px;
`;
/* function BackButton(props) {
  return (
    <BackImg onClick={props.onClick}>
      <img src={props.src} alt={props.alt} />
    </BackImg>
  )
}; */
//<div>{props.text}</div>


const Login = () => {

  const [isLoginMain, setLoginMain] = useState(false);

  return (
  <WebWrapper>
    <MainWrapper>
      <BackButton onClick={() => { setLoginMain((current => !current)); console.log(isLoginMain); }}><img src={BackButtonImg} alt="BackButton"/></BackButton>
      <LoginWrapper>
        111111
      </LoginWrapper>
      <SignInWrapper>
        <AskAccount>계정이 없으신가요?</AskAccount>
        <SingInbutton>회원가입</SingInbutton>
      </SignInWrapper>
    </MainWrapper>
  </WebWrapper>
);
};

export default Login;
