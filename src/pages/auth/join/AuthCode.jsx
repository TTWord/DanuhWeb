import React, {useState, useEffect} from "react";
import styled from "styled-components";
import BackButtonImg from "@/assets/svg/icons/icon-back-button.svg"
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const signupURL = "http://api.tt-word.kr/api/user/signup";

const SignUp = async (userEmail, userNickname, userPW, inputCode, navigate) => {
  try{
    const response = await axios.post(signupURL, {
      "username": userEmail,
      "password": userPW,
      "nickname": userNickname,
      "certification_id": inputCode
  });
  alert(response.data.message);
  navigate("/auth/join/welcome", {state: {
    userNickname: userNickname,
    userEmail: userEmail
  }});
  }catch(e){
    console.log(e);
  }
}

const AuthCode = () => {
  
  // 넘겨받은 데이터
  const location = useLocation();
  const signinValues = location.state;

  const userEmail = signinValues.userEmail;
  const userNickname = signinValues.userNickname;
  const userPW = signinValues.userPW;

  // 카운트 다운
  const [minutes, setMinutes] = useState(3); // 1분으로 초기화
  const [seconds, setSeconds] = useState(0); // 0초로 초기화

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);
  
  //Title 변경
  useEffect(() => {
    document.querySelector("title").innerHTML = "코드인증";
  }, []);

  // 네비게이트
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState("");

  const getInputCode = (e) => {
    const inputUserCode = e.target.value;
    setInputCode(inputUserCode);
  }

  return (
  <MainWrapper>
    <BackButton onClick={() => {
        navigate(-1);
      }}><img src={BackButtonImg} alt="BackButton"/>
    </BackButton>
    
    <AuthGuideBox>
      <AuthText>인증코드 입력</AuthText>
      <EmailBox>{userEmail}</EmailBox>
      <RequsetAuthCodeButton>인증코드 재발송</RequsetAuthCodeButton>
    </AuthGuideBox>

    <AuthInputBox>
      <CodeCounterBox>
        <CodeBox>CODE</CodeBox>
        <CounterBox>0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</CounterBox>
      </CodeCounterBox>
      <AuthInput placeholder="이메일에 적혀있는 인증코드를 입력해주세요." onChange={getInputCode}></AuthInput>
    </AuthInputBox>

    <NextButton onClick={()=> {
      SignUp(userEmail, userNickname, userPW, inputCode, navigate);
    }}>다음</NextButton>
  </MainWrapper>
  );
};

export default AuthCode;

// 스타일 정의 => 나중에 스타일파일로 옮길 예정
export const MainWrapper = styled.div`
    width: 100%;
    height: 852px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BackButton = styled.button`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 26px;
    left: 26px;
`;
const AuthGuideBox = styled.div`
  width: 146px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AuthInputBox = styled.div`
  width: 248px;
  height: 46px;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`
const AuthText = styled.div`
  width: 146px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #5C369A;
`
const CodeBox = styled.div`
  width: 35px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #333333;
`
const EmailBox = styled.div`
  width: 119px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  text-align: center;
  color: #333333;
  margin-top: 7px;
  margin-bottom: 10px;
`
const RequsetAuthCodeButton = styled.button`
  width: 85px;
  height: 20px;
  background: linear-gradient(180deg, #734AE7 0%, #4C2F9C 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  font-size: 10px;
  color: white;
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
const CodeCounterBox = styled.div`
  width: 229px;
  display: flex;
  justify-content: space-between;
`
const CounterBox = styled.div`
  width: 27px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
`
const AuthInput = styled.input`
  width: 229px;
  height: 10px;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #666666;
`