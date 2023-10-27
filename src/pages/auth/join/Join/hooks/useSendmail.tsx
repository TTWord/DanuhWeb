import { api } from '@/api';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useNavigatePush from '@/hooks/useNavigatePush';

const useSendmail = () => {
  const navigatePush = useNavigatePush();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { mutateAsync: certification } = useMutation(
    async ({
      username,
      password,
      nickname,
    }: {
      username: string;
      password: string;
      nickname: string;
    }) => {
      const { data: response } = await api.auth.sendmail(
        username,
        password,
        nickname,
      );
      return response;
    },
  );

  const sendmail = async (
    username: string,
    password: string,
    nickname: string,
  ) => {
    try {
      setLoading(true);

      const response = await certification({ username, password, nickname });
      setLoading(false);
      navigatePush('/auth/join/code', {
        state: {
          username,
          password,
          nickname,
        },
      });
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;
      setError(err?.response?.data.message ?? '');
      setLoading(false);
    }
  };

  return { isLoading: loading, sendmail, error, setError };
};

export default useSendmail;
