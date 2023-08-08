import { instance } from '@/instance';

interface IGetMyInfoResponse extends BackendResponse {
  data: {
    id: number;
    login_type: string;
    username: string;
    nickname: string;
    recommend_count: number;
    share_count: number;
    word_count: number;
    download_count: number;
    url?: string;
  };
}

interface IGetOtherUserInfoResponse extends BackendResponse {
  data: {
    id: number;
    nickname: string;
    recommend_count: number;
    share_count: number;
    word_count: number;
    download_count: number;
    url?: string;
  };
}

interface ReportParams {
  reportType: string;
  contents: string;
}

export const userAPI = {
  getMyInfo: async () => {
    const response = await instance.get<IGetMyInfoResponse>(
      '/user/userservice',
    );

    return response;
  },

  deleteAccount: async () => {
    const response = await instance.delete('/user/userservice');

    return response;
  },

  changeNickname: async (newNickname: string) => {
    const response = await instance.put('/user/userservice', {
      to_nickname: newNickname,
    });

    return response;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    const response = await instance.patch(`/user/userservice`, {
      from_password: oldPassword,
      to_password: newPassword,
    });

    return response;
  },

  getUserInfo: async (userId: number) => {
    const response = await instance.get<IGetOtherUserInfoResponse>(
      `/user/profile/${userId}`,
    );

    return response;
  },

  report: async ({ reportType, contents }: ReportParams) => {
    const response = await instance.post(`/user/userservice/report`, {
      type: reportType,
      contents,
    });

    return response;
  },

  survey: async (contents: string | Array<string | object>) => {
    const response = await instance.post(`/user/userservice/survey`, {
      contents,
    });

    return response;
  },
};
