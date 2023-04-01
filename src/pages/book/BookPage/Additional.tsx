import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

interface AdditionalProps {}

const Additional: React.FC<AdditionalProps> = () => {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  return (
    <Container>
      <PlusBox onClick={() => setActive(current => !current)}>
        <PlusBoxNotActive isActive={isActive} />
        <PlusBoxActive isActive={isActive} />
        <PlusIcon isActive={isActive} />
      </PlusBox>
      <AdditionalItems isActive={isActive}>
        <AdditionalItem
          isActive={isActive}
          targetPos={'200px'}
          onClick={() => navigate('/book/create')}
        >
          <Text>단어장 만들기</Text>
        </AdditionalItem>
        <AdditionalItem
          isActive={isActive}
          targetPos={'140px'}
          onClick={() => navigate('/book/generate')}
        >
          <Text>단어장 생성기</Text>
        </AdditionalItem>
        <AdditionalItem isActive={isActive} targetPos={'80px'}>
          <Text>단어장 다운로드</Text>
        </AdditionalItem>
      </AdditionalItems>
    </Container>
  );
};

export default Additional;

const Container = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  cursor: pointer;
`;

const PlusBox = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  z-index: 1;
`;

const PlusBoxNotActive = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(180deg, #6928bf 0%, #a112a3 100%);
  box-shadow: 0 0 6px 0 rgba(89, 0, 255, 0.361);
  transition: opacity 0.3s;
  opacity: ${({ isActive }) => (isActive ? 0 : 1)};
`;

const PlusBoxActive = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(180deg, #bf2828 0%, #781515 100%);
  box-shadow: 0 0 6px 0 rgba(89, 0, 255, 0.361);
  transition: opacity 0.3s;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
`;

const PlusIcon = styled.div<{
  isActive: boolean;
}>`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s;

  &:before {
    content: '';
    width: 100%;
    height: 3px;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    transition: transform 0.3s;
  }
  &:after {
    content: '';
    width: 3px;
    height: 100%;
    background-color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    transition: transform 0.3s;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &:before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    `}
`;

const AdditionalItems = styled.div<{
  isActive: boolean;
}>`
  position: absolute;
  bottom: 0px;
  right: 0px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Text = styled.div``;
const AdditionalItem = styled.div<{
  isActive: boolean;
  targetPos: string;
}>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 30%;
  border-radius: 30px;
  background: black;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  right: 30px;
  bottom: 30px;

  ${Text} {
    font-size: 12px;
    transform: scale(0);
    transition: all 0.3s;
  }

  ${({ isActive, targetPos }) =>
    isActive &&
    css`
      width: 150px;
      height: 50px;
      bottom: ${targetPos};
      right: 0px;

      ${Text} {
        transform: scale(1);
      }
    `}
`;