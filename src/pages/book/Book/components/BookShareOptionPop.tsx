import BottomSlidePop from '@/components/common/popup/BottomSlidePop';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import iconCloseSVG from '@/assets/svg/icons/icon-close.svg';

interface BookShareOptionPopProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const BookShareOptionPop: React.FC<BookShareOptionPopProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <BottomSlidePop
      isOpen={isOpen ? true : true}
      onPopClose={() => setIsOpen(false)}
      height={300}
    >
      <Header>
        <BookName>단어장 A</BookName>
        <CloseButton>
          <img src={iconCloseSVG} alt="close" />
        </CloseButton>
      </Header>
      <Content>
        <ContentTitle>공유 설정</ContentTitle>
      </Content>
    </BottomSlidePop>
  );
};

export default BookShareOptionPop;

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const BookName = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.primary.default};
  ${({ theme }) => theme.typography.pretendard.t2.sbd}
`;

const CloseButton = styled.button`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Content = styled.div``;
const ContentTitle = styled.div`
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;
