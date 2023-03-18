import styled from 'styled-components';
import { instance } from '@/instance';
import { useNavigate } from 'react-router-dom';

import plusIcon from '@/assets/svg/icons/icon-add.svg';

const deleteWord = async (bookId, word, mean) => {
  try {
    const response = await instance.delete(`/word/${bookId}`);
    window.location.reload();
    alert(response.data.message);
  } catch (e) {
    alert('Error');
  }
};

const NewWord = ({ bookId, word, mean }) => {
  return (
    <WordWrapper>
      <WordBox>
        <Word>{word}</Word>
        <Meaning>{mean}</Meaning>
      </WordBox>

      <DeleteButton>
        <img
          src={plusIcon}
          alt="plusIcon"
          onClick={() => {
            deleteWord(bookId, word, mean);
          }}
        />
      </DeleteButton>
      {/* 체크에 관련된 조건 추가할 것 */}
    </WordWrapper>
  );
};

export default NewWord;

const WordWrapper = styled.div`
  width: 100%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  display: flex;
  align-items: center;
  position: relative;
`;
const WordBox = styled.div`
  position: absolute;
  left: 29px;
  top: 20px;
  width: auto;
  height: 58px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Word = styled.div`
  //width: 50px;
  height: 24px;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  color: #333333;
`;
const Meaning = styled.div`
  //width: 31px;
  height: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
`;
const DeleteButton = styled.button`
  position: absolute;
  right: 24px;
  top: 32px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: #e45454;
  img {
    width: 30px;
    height: 30px;
  }
`;
