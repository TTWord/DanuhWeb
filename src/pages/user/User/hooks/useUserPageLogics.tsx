import { api } from '@/api';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/recoil';
import useToast from '@/hooks/useToast';
import { AxiosError } from 'axios';

const useUserPageLogics = (userId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const sortType = useRecoilValue(globalState.user.sortType);

  const { data: userinfo } = useQuery(
    'UserPage/Userinfo',
    async () => {
      const { data: response } = await api.user.getUserInfo(userId);

      return response.data;
    },
    {
      onError: e => {
        const error = e as AxiosError<{
          message: string;
        }>;
        const errorMessage = error?.response?.data.message;

        switch (errorMessage) {
          case 'USER_NOT_FOUND':
            toast.error('존재하지 않는 유저입니다.');
            break;

          default:
            toast.error('에러가 발생하였습니다.');
            break;
        }
      },
    },
  );

  const { data: userBooks } = useQuery(
    ['UserPage/UserBooks', sortType],
    async () => {
      let type;
      switch (sortType) {
        case '최신순':
          type = 'updated_at';
          break;
        case '인기순':
          type = 'popularity';
          break;
        case '다운로드순':
          type = 'downloaded';
          break;
        default:
          type = 'updated_at';
          break;
      }

      const { data: response } = await api.share.getOtherUserShareBooks({
        userId,
        type,
      });

      return response.data;
    },
    {
      onError: e => {
        const error = e as AxiosError<{
          message: string;
        }>;
        const errorMessage = error?.response?.data.message;
        switch (errorMessage) {
          default:
            toast.error('에러가 발생하였습니다.');
            break;
        }
      },
    },
  );

  return { userinfo, userBooks };
};

export default useUserPageLogics;
