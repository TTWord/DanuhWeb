import React, { useEffect, useState } from "react";
import BackButtonImg from "@/assets/svg/icons/icon-back-button.svg"
import * as Styled from "@/styles/AccountStyles"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { constSelector } from "recoil";

const sendMailURL = "http://api.tt-word.kr/api/user/sendmail";

const AuthInputBox = (props) => {
  return (
    <AuthInputWrapper>
      <CodeCounterBox>
        <CodeBox>{props.kind}</CodeBox>
      </CodeCounterBox>
      <AuthInput 
      placeholder={props.placeholder}
      onChange={props.func}
      type={props.type}
      autoComplete="off">
      </AuthInput>
    </AuthInputWrapper>
  );
}

const FunctionSignin = async (userEmail,userNickname, userPW, navigate) => {
  try {
    const response = await axios.post(sendMailURL, {
        user_id: userEmail,
        to_email: userEmail,
        subject: "TTWord 인증코드입니다.",
        body: "Content"
      });
      const getVerificationCode = response.data.verification_id;
      console.log(getVerificationCode);
      alert(response.data.message);
      navigate('/auth/join/code', {state: {
      userEmail: userEmail,
      userPW: userPW, 
      userNickname: userNickname,
      getCode: getVerificationCode
      }});
    } catch(e) {
      console.log(1313);
      // const errorCode = e.response.status;
      // const errorMessage = e.response.data.message;
      // if (errorCode === 409){
      //   console.log(errorMessage);
      // }
      // }
    }
}

const Join = () => {
  // Title 변경
  useEffect(() => {
    document.querySelector("title").innerHTML = "회원가입"
  }, []);

  const navigate = useNavigate();

  const [userEmail, SetUserEmail] = useState("");
  const [userPW, SetUserPW] = useState("");
  const [userPWConfirm, SetUserPWConfirm] = useState("");
  const [userNickname, SetUserNickname] = useState("");
  
  const inputUserEmail = (e) => {
    SetUserEmail(e.target.value);
  }
  const inputUserPW = (e) => {
    SetUserPW(e.target.value);
  }
  const inputUserPWConfirm = (e) => {
    SetUserPWConfirm(e.target.value);
  }
  const inputUserNickname = (e) => {
    SetUserNickname(e.target.value);
  }
  
  return (
    <Styled.MainWrapper>
      <BackButton onClick={() => {navigate(-1);}}>
        <img src={BackButtonImg} alt="BackButton"/>
      </BackButton>

      <SignInText>회원가입</SignInText>
      
      <SignInwrapper>
        <AuthInputBox kind="USERNAME" placeholder="이메일을 입력해주세요" type="text" func={inputUserEmail}/>
        <AuthInputBox kind="PASSWORD" placeholder="비밀번호를 입력해주세요" type="password" func={inputUserPW}/>
        <AuthInputBox kind="PASSWORD CONFIRM" placeholder="비밀번호를 한번 더 입력해주세요" type="password" func={inputUserPWConfirm}/>
        <AuthInputBox kind="NICKNAME" placeholder="닉네임을 입력해주세요" type="text" func={inputUserNickname}/>
      </SignInwrapper>
      
    <NextButton onClick={() => {FunctionSignin(userEmail,userNickname, userPW, navigate);}}>다음</NextButton>
    </Styled.MainWrapper> 
  );
};

export default Join;

const BackButton = styled.button`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 26px;
    left: 26px;
`

const SignInText = styled.div`
  width: 100px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #5C369A;
`

const SignInwrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-top: 28px;
  margin-bottom: 12;
`
const AuthInputWrapper = styled.div`
  width: 248px;
  height: 46px;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`
const CodeCounterBox = styled.div`
  width: 229px;
  display: flex;
  justify-content: space-between;
`
const CodeBox = styled.div`
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #333333;
`
const AuthInput = styled.input`
  width: 229px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
`

const NextButton = styled.button`
  width: 249px;
  height: 72px;
  background: linear-gradient(180deg, #734AE7 0%, #4C2F9C 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 24px;
  color: white;
`