import React from 'react';
import styled from 'styled-components';
import iconInfo from '@/assets/svg/icons/icon-info.svg';
import useToast from '@/hooks/useToast';

interface InfoProps {
  shareCount: number;
  downloadCount: number;
  recommendCount: number;
}

const ShareInfoBox: React.FC<InfoProps> = ({
  shareCount,
  downloadCount,
  recommendCount,
}) => {
  const toast = useToast();

  return (
    <ShareInfoWrapper>
      <ShareInfo>
        <InfoName>공유단어장</InfoName>
        <InfoNumber>{shareCount}</InfoNumber>
      </ShareInfo>
      <ShareInfo>
        <InfoName>
          다운로드
          <img
            src={iconInfo}
            alt="download"
            onClick={() => {
              toast.comment('내 공유 단어장이 다운된 횟수');
            }}
          />
        </InfoName>
        <InfoNumber>{downloadCount}</InfoNumber>
      </ShareInfo>
      <ShareInfo>
        <InfoName>
          추천
          <img
            src={iconInfo}
            alt="recommend"
            onClick={() => {
              toast.comment('내 공유 단어장이 추천받은 횟수');
            }}
          />
        </InfoName>
        <InfoNumber>{recommendCount}</InfoNumber>
      </ShareInfo>
    </ShareInfoWrapper>
  );
};

export default ShareInfoBox;

const ShareInfoWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 300;
  line-height: 36px;
  color: black;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const ShareInfo = styled.div`
  width: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgba(105, 74, 194, 0.08);
  padding: 12px;

  & + & {
    margin-left: 8px;
  }
`;

const InfoName = styled.div`
  ${({ theme }) => theme.typography.pretendard.b1.rg};
  color: ${({ theme }) => theme.colors.gray[600]};
  display: flex;
  font-size: 14px;
  justify-content: center;
  width: 100%;

  & > img {
    margin-left: 4px;
  }
`;

const InfoNumber = styled.div`
  width: 90%;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary.default};
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 6px 0;

  ${({ theme }) => theme.typography.pretendard.b1.sbd};
`;
