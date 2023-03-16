import * as Styled from '@/styles/LoginStyle.jsx';
import { useState } from 'react';
import useLogin from './hooks/useLogin';

const LoginForm = ({ isLogin, setLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState('');
  const login = useLogin();

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <div>
      {isLogin ? (
        <Styled.LoginBoxWrapper>
          <Styled.LoginInput
            autoFocus={true}
            placeholder="USERNAME"
            type="email"
            onChange={onChangeUsername}
          ></Styled.LoginInput>
          <Styled.LoginInput
            placeholder="PASSWORD"
            type="password"
            onChange={onChangePassword}
          ></Styled.LoginInput>
        </Styled.LoginBoxWrapper>
      ) : (
        <Styled.IntroduceText>
          이미지, PDF, 글을 단어장으로 만들자!
        </Styled.IntroduceText>
      )}
      {isLogin ? (
        <Styled.LoginButton
          buttonType="login"
          onClick={() => {
            login(username, password, setUserToken, userToken);
          }}
        >
          로그인
        </Styled.LoginButton>
      ) : (
        <Styled.LoginButton
          onClick={() => {
            setLogin(current => !current);
          }}
        >
          이메일로 로그인
        </Styled.LoginButton>
      )}
    </div>
  );
};

export default LoginForm;
