import { api } from '@/api';
import { AxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { useEffect, useState } from 'react';
import { globalState } from '@/recoil';
import { useSetRecoilState } from 'recoil';

const useMySharePageLogics = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const setActiveMenu = useSetRecoilState(globalState.layout.activeMenuNumber);
  const [sortType, setSortType] = useState('최신순');
  const [isToggle, setIsToggle] = useState(false); // 정렬 팝업 속 토글
  const [currentBooks, setCurrentBooks] = useState([]); // API로 받아온 공유 단어장
  const [mode, setMode] = useState('share'); // 화면 출력 단어장 리스트 선택
  const [order, setOrder] = useState('DESC'); // 단어장 order 선택

  const sharingSelectList = [
    {
      text: '최신순',
      onClick: () => {
        setSortType('최신순');
        setOrder('DESC');
      },
    },
    {
      text: '오래된순',
      onClick: () => {
        setSortType('오래된순');
        setOrder('ASC');
      },
    },
  ];

  const sharedSelectList = [
    {
      text: '최신순',
      onClick: () => {
        setSortType('최신순');
        setOrder('DESC');
      },
    },
    {
      text: '오래된순',
      onClick: () => {
        setSortType('오래된순');
        setOrder('ASC');
      },
    },
    {
      text: '추천한 단어장만 보기',
      onClick: () => setMode('download'),
      hasToggle: true,
    },
  ];

  const [selectList, setSelectList] = useState(sharingSelectList);

  const getSharedBooks = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await api.share.getUserShareBooks({
        mode,
        order,
        filter: isToggle,
      });

      setCurrentBooks(response);

      setIsLoading(false);
      return response;
    } catch (e: unknown) {
      const err = e as AxiosError<{
        message: string;
      }>;

      const errorMessage = err?.response?.data.message;

      switch (errorMessage) {
        default:
          toast.error('에러가 발생하였습니다.');
          break;
      }
    }
  };

  const onClickShareMode = () => {
    setIsToggle(false);
    setMode('share');
  };

  const onClickDownloadMode = () => {
    setMode('download');
  };

  const onToggle = () => {
    setIsToggle((current) => !current);
  };

  /* UseEffect */
  useEffect(() => {
    if (mode === 'share') setSelectList(sharingSelectList);
    if (mode === 'download') setSelectList(sharedSelectList);
  }, [mode]);

  useEffect(() => {
    getSharedBooks();
  }, [mode, order, isToggle]);

  useEffect(() => {
    setActiveMenu(2);
  }, []);

  return {
    sortType,
    mode,
    onClickDownloadMode,
    onClickShareMode,
    selectList,
    isLoading,
    onToggle,
    currentBooks,
    isToggle,
  };
};

export default useMySharePageLogics;
