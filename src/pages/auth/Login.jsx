import React, { useEffect, useState } from "react";
import BackButtonImg from "@/assets/svg/icons/icon-back-button.svg"
import LogoImg from "@/assets/svg/icons/logo-img.svg"
import * as Styled from "@/styles/LoginStyle.jsx"

/* function BackButton(props) {
  return (
    <BackImg onClick={props.onClick}>
      <img src={props.src} alt={props.alt} />
    </BackImg>
  )
}; */
//<div>{props.text}</div>

//onClick={() => { setLoginMain((current => !current)); console.log(isLoginMain); }}
const Login = () => {

  const [isLoginMain, setLoginMain] = useState(false);

  const LoginBox = () => {
    return (
      isLoginMain ? 
      <div>
        <Styled.LoginInput placeholder="USERNAME"></Styled.LoginInput>
        <Styled.LoginInput placeholder="PASSWORD" type="password"></Styled.LoginInput>
      </div>
      : <Styled.IntroduceText>이미지, PDF, 글을 단어장으로 만들자!</Styled.IntroduceText>
    );
  }



  return (
  <Styled.WebWrapper>
    <Styled.BackButton className={isLoginMain ? "active" : ""}><img src={BackButtonImg} alt="BackButton"/></Styled.BackButton>
    <div>
      <Styled.LoginWrapper>
        <Styled.LogoImg src={LogoImg} alt="logo-img" />
        <LoginBox/>
        <Styled.LoginButton onClick={() => {
          setLoginMain((current => !current));}}>이메일로 로그인</Styled.LoginButton>
      </Styled.LoginWrapper>
      <Styled.SignInWrapper>
        <Styled.AskAccount>계정이 없으신가요?</Styled.AskAccount>
        <Styled.SignInbutton>회원가입</Styled.SignInbutton>
      </Styled.SignInWrapper>
    </div>
    
  </Styled.WebWrapper>
);
};

export default Login;
