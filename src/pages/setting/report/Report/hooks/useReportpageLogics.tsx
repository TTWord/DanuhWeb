import { useEffect, useState } from 'react';
import useNavigatePop from '@/hooks/useNavigatePop';
import useToast from '@/hooks/useToast';
import { api } from '@/api';
import { useMutation } from 'react-query';

interface SubmitProps {
  reportType: string;
  contents: string;
}

const useReportpageLogics = () => {
  const toast = useToast();
  const navigate = useNavigatePop();
  const [reportType, setReportType] = useState('');
  const [contents, setContents] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (reportType !== '' && contents !== '') setCanSubmit(true);
    else setCanSubmit(false);
  }, [reportType, contents]);

  const setTypeSuggetion = () => {
    setReportType('건의사항');
  };

  const setTypeBugreport = () => {
    setReportType('버그신고');
  };

  const reportSubmit = async ({ reportType, contents }: SubmitProps) => {
    try {
      const { data: response } = await api.user.report({
        reportType,
        contents,
      });

      toast.success('의견 제출 감사합니다!');
      navigate('/setting');
    } catch (e) {
      toast.error('에러가 발생하였습니다.');
    }
  };

  const onSubmit = () => {
    if (reportType === '') toast.error('유형을 선택해주세요!');
    else if (contents === '') toast.error('내용을 입력해주세요!');
    else reportSubmit({ reportType, contents });
  };

  return {
    reportType,
    setTypeSuggetion,
    setTypeBugreport,
    contents,
    setContents,
    onSubmit,
    canSubmit,
  };
};

export default useReportpageLogics;
