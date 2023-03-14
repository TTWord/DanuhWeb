import React, { useEffect, useState } from "react";
import BackButtonImg from "@/assets/svg/icons/icon-back-button.svg"
import LogoImg from "@/assets/svg/icons/logo-img.svg"
import * as Styled from "@/styles/LoginStyle.jsx"
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";

const signInURL = "http://api.tt-word.kr/api/user/signin";

//onClick={() => { setLoginMain((current => !current)); console.log(isLoginMain); }}
//(e) => {const current_username = e.target.value; setUsername(current_username);}
const LoginBox = (props) => {
    //console.log(state.state);
    return (
      props.state ? 
      <Styled.LoginBoxWrapper>
        <Styled.LoginInput  autoFocus={true} placeholder="USERNAME" type="email" onChange={props.func1}></Styled.LoginInput>
        <Styled.LoginInput placeholder="PASSWORD" type="password" onChange={props.func2}></Styled.LoginInput>
      </Styled.LoginBoxWrapper>
      : <Styled.IntroduceText>이미지, PDF, 글을 단어장으로 만들자!</Styled.IntroduceText>
    );
  }

const FunctionLogin = async (signinUsername, signinPassword, navigate, getToken, userToken) => {
  try {
    const response = await axios.post(signInURL, {
      username: signinUsername,
      password: signinPassword
    });
      getToken(response.data.access_token);
      localStorage.setItem("accessToken", response.data.access_token);
      console.log(response.data.access_token);
      navigate('/');
      alert(response.data.message);
  } catch(e) {
    const errorCode = e.response.status;
    const errorMessage = e.response.data.message;

    if (errorCode === 403 || errorCode === 409) {
      alert(errorMessage);
    } else if (errorCode === 400) {
      alert("Bad Request");
    } else if (errorCode === 404) {
      navigate("*")
    } else if (errorCode === 405) {
      alert("Not Allowed");
    }
  }
}

const Login = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(signInURL);
  },[]);

  const [isLoginMain, setLoginMain] = useState(false);
  const [username, setUsername] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [userToken, saveToken] = useState("");

  const LoginButton = () => {
    return (
      isLoginMain ?
      <Styled.LoginButton buttonType="login" onClick={() => {
        FunctionLogin(username, userpassword, navigate, saveToken, userToken);
      }}>로그인</Styled.LoginButton>
      :
      <Styled.LoginButton onClick={() => {setLoginMain((current => !current));}}>
        이메일로 로그인
      </Styled.LoginButton>
    );
  };

  const inputUsername = (e) => {
    setUsername(e.target.value);
  }
  const inputUserpassword = (e) => {
    setUserPassword(e.target.value);
  }

  return (
  <Styled.WebWrapper>
    <Styled.BackButton className={isLoginMain ? "active" : ""} onClick={() => {
          setLoginMain((current => !current));}}><img src={BackButtonImg} alt="BackButton"/></Styled.BackButton>
    <div>
      <Styled.LoginWrapper active={isLoginMain}>
        <Styled.LogoImg src={LogoImg} alt="logo-img" />
        <LoginBox state = {isLoginMain} func1 = {inputUsername} func2 = {inputUserpassword}/>
        <LoginButton/>
      </Styled.LoginWrapper>
      <Styled.SignInWrapper>
          <Styled.AskAccount>계정이 없으신가요?</Styled.AskAccount>
          <Link to='/auth/join/account'>
            <Styled.SignInbutton onClick={() => {navigate('/auth/join/account');}}>회원가입</Styled.SignInbutton>
          </Link>
      </Styled.SignInWrapper>
    </div>
    
  </Styled.WebWrapper>
);
};

export default Login;
