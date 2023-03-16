import styled, { css, isStyledComponent } from 'styled-components';

export const WebWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const LoginWrapper = styled.div`
  width: 249px;
  height: ${props => (props.active ? '257px' : '143px')};
  display: flex;
  flex-grow: 3;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const SignInWrapper = styled.div`
  width: 249px;
  height: 30px;
  color: #262626;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AskAccount = styled.div`
  width: 249px;
  height: 38px;
  font-size: 12px;
  margin-top: 18px;
  display: flex;
  justify-content: center;
`;

export const SignInbutton = styled.button`
  width: 47px;
  height: 12px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: #8062b2;
`;

export const BackButton = styled.button`
  display: none;

  &.active {
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 21px;
    left: 16px;
  }
`;

export const LogoImg = styled.img`
  width: 179px;
  height: 48px;
`;

export const IntroduceText = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: #5c369a;
`;

export const LoginButton = styled.button`
  margin-top: 20px;
  width: 249px;
  height: ${props => (props.buttonType === 'login' ? '72px' : '43px')};
  background: linear-gradient(180deg, #734ae7 0%, #4f32a2 100%);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 16px;
  color: white;
`;

export const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
export const LoginInput = styled.input`
  width: 248px;
  height: 46px;
  display: flex;
  align-items: center;
  padding: 17px 0 17px 15px;
  font-size: 12px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;
