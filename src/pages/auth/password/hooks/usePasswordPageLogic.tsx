import { api } from '@/api';
import useNavigatePush from '@/hooks/useNavigatePush';
import useNavigatePop from '@/hooks/useNavigatePop';
import { useMutation } from 'react-query';
import useToast from '@/hooks/useToast';
import { AxiosError } from 'axios';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { globalState } from '@/recoil';
import { useState } from 'react';

interface Logicprops {
  username: string;
  code: string;
  password?: string;
}

// 비밀번호를 변경하는 로직 추가 필요(백엔드의  대기 중)
const usePasswordPageLogic = () => {
  const toast = useToast();
  const navigatePush = useNavigatePush();
  const navigatePop = useNavigatePop();
  const setTimer = useSetRecoilState(globalState.auth.timer);
  const [codeTimeOut, setCodeTimeOut] = useRecoilState(
    globalState.auth.codeTimeOut,
  );
  const [pwError, setPwError] = useState('');

  const { mutateAsync: submitUsername, isLoading: userNameLoading } =
    useMutation(
      async (username: string) => {
        try {
          const { data: response } = await api.auth.findPassword(username);

          navigatePush('/auth/password/code', {
            state: {
              username,
            },
          });

          return response.data;
        } catch (error) {
          throw error;
        }
      },

      {
        onError: (e) => {
          const error = e as AxiosError<{
            message: string;
            data: {
              login_type: string;
            };
          }>;

          const errorMessage = error?.response?.data.message;
          const socialType = error?.response?.data?.data.login_type;

          switch (errorMessage) {
            case 'USER_INVALID_USERNAME':
              toast.error('존재하지 않는 유저입니다.');
              break;

            case 'USER_INVALID_FORMAT_USERNAME':
              toast.error('올바른 이메일 형식이 아닙니다.');
              break;

            case 'USER_SOCIAL_LOGIN':
              switch (socialType) {
                case 'google':
                  toast.error('구글로 가입하셨습니다.');

                case 'kakao':
                  toast.error('카카오로 가입하셨습니다.');

                case 'apple':
                  toast.error('애플로 가입하셨습니다.');

                case 'default':
                  toast.error('소셜 가입 유저입니다.');
              }
              navigatePop('/auth/login');
              break;

            default:
              toast.error('에러가 발생하였습니다.');
              break;
          }
        },
      },
    );

  const { mutateAsync: submitCertCode, isLoading: certCodeLoading } =
    useMutation(
      async ({ username, code }: Logicprops) => {
        try {
          const { data: response } = await api.auth.checkCert(username, code);

          navigatePush('/auth/password/initial', {
            state: {
              username,
              code,
            },
          });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onError: (e) => {
          const error = e as AxiosError<{
            message: string;
          }>;
          const errorMessage = error?.response?.data.message;

          switch (errorMessage) {
            case 'AUTH_EXPIRED_CODE':
              toast.error('코드가 만료되었습니다.');
              break;

            case 'AUTH_INCORRECT_CODE':
              toast.warning('인증코드를 다시 확인해주세요');
              break;

            default:
              toast.error('에러가 발생하였습니다.');
              break;
          }
        },
      },
    );

  const resendCode = async (username: string) => {
    const response = await submitUsername(username);
    toast.comment('인증번호를 재발송하였습니다.');
    setCodeTimeOut(false);
    setTimer(180);
  };

  // API가 아직 없는 관계로 임의로 생성 //
  const { mutateAsync: initializePassword, isLoading: initialLoading } =
    useMutation(
      async ({ username, code, password }: Logicprops) => {
        try {
          const { data: response } = await api.auth.initialPassword({
            username,
            code,
            password,
          });

          toast.success('비밀번호 초기화가 완료되었습니다.');
          navigatePush('/auth/login');
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      {
        onError: (e) => {
          const error = e as AxiosError<{
            message: string;
          }>;
          const errorMessage = error?.response?.data.message;

          switch (errorMessage) {
            case 'USER_INVALID_ACESSSS':
              setPwError('코드가 만료되었습니다.');
              break;

            case 'USER_INVALID_FORMAT_PASSWORD':
              setPwError('비밀번호 양식이 올바르지 않습니다.');
              break;

            case 'USER_SAME_PASSWORD':
              setPwError('비밀번호가 기존과 동일합니다.');
              break;

            default:
              setPwError('에러가 발생하였습니다.');
              break;
          }
        },
      },
    );

  return {
    submitUsername,
    userNameLoading,
    submitCertCode,
    certCodeLoading,
    resendCode,
    initializePassword,
    initialLoading,
    pwError,
  };
};

export default usePasswordPageLogic;
