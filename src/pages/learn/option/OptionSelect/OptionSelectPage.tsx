import CheckBox from '@/components/common/switch/CheckBox';
import StackLayout from '@/components/layout/StackLayout';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import BookSelectPop from './components/BookSelectPop';
import { useNavigate, useParams } from 'react-router-dom';
import Toggle from '@/components/common/switch/Toggle';

const getTopBarText = (type: string, kind: string) => {
  if (type === 'memo') {
    switch (kind) {
      case 'flashcard':
        return 'Flashcard';
      case 'blind':
        return 'Blind';
    }
  }

  if (type === 'quiz') {
    switch (kind) {
      case 'select':
        return 'Select';
      case 'typing':
        return 'Typing';
      case 'blind_select':
        return 'Blind Select';
      case 'blind_typing':
        return 'Blind Typing';
    }
  }

  return '';
};

const OptionSelectPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const kind = params.kind; // flashcard
  const type = params.type; // quiz, memo

  const [checked, setChecked] = useState(false); // 암기 랜덤모드 선택 변수
  const [langOption, setLangOption] = useState<'word' | 'mean' | 'all'>('word');
  const [timerOption, setTimerOption] = useState<'quiz' | 'book'>('quiz');
  const [haveMemoWord, setHaveMemoWord] = useState(false);
  const [isOpenBookSelectPop, setIsOpenBookSelectPop] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<
    {
      id: number;
      word_count: number;
      memorized_count: number;
    }[]
  >([]);
  const [viewSelectedBooksText, setViewSelectedBooksText] = useState<
    string | null
  >(null);

  const [quizCount, setQuizCount] = useState(5);
  const [quizTime, setQuizTime] = useState(10);
  const [quizAllTime, setQuizAllTime] = useState(60);

  const [reduceCount, setReduceCount] = useState({
    word: 0,
    memorized: 0,
  });

  // 단어장 단어 카운트 계산
  useEffect(() => {
    let count = selectedBooks.reduce((result, book) => {
      return result + book.word_count;
    }, 0);

    let memorizedCount = selectedBooks.reduce((result, book) => {
      return result + book.memorized_count;
    }, 0);

    setReduceCount({
      word: count,
      memorized: memorizedCount,
    });

    // 기존에 선택되어 있던 카운트 개수가 부족할 경우 카운트 초기화
    if (haveMemoWord) {
      if (quizCount > memorizedCount) {
        setQuizCount(5);
      }
    } else {
      if (quizCount > count) {
        setQuizCount(5);
      }
    }
  }, [selectedBooks]);

  const onClickCheck = () => {
    setChecked((current) => !current);
  };

  const onClickSelectBook = () => {
    setIsOpenBookSelectPop(true);
  };

  const onClickConfirm = () => {
    if (selectedBooks.length) {
      navigate(`/learn/${type}/${kind}`, {
        state: {
          bookIds: selectedBooks.map((book) => book.id),
          mode: langOption,
          quizType: type,
          quizCount,
          quizTime,
          timerOption,
          memorizedFilter: haveMemoWord,
        },
      });
    } else {
      alert('단어장을 선택해주세요!!!');
    }
  };

  if (!type || !kind) {
    alert('type, kind 값이 없습니다');
    return null;
  }

  return (
    <>
      <BookSelectPop
        isOpen={isOpenBookSelectPop}
        setIsOpen={setIsOpenBookSelectPop}
        selectedBooks={selectedBooks}
        setSelectedBooks={setSelectedBooks}
        setViewSelectedBooksText={setViewSelectedBooksText}
        viewSelectedBooksText={viewSelectedBooksText}
        haveMemoWord={haveMemoWord}
      />
      <StackLayout
        topBar={{
          title: getTopBarText(type, kind),
          back: {
            location: '/learn',
          },
        }}
      >
        <Container>
          <Content>
            <TopView>
              <SelectedBook onClick={onClickSelectBook}>
                {viewSelectedBooksText || (
                  <SelectedBookText>
                    단어장 선택 <span>*</span>
                  </SelectedBookText>
                )}
                <SelectedBookGoButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.5 7L14.5 12L9.5 17"
                      stroke="#6B6C76"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </SelectedBookGoButton>
              </SelectedBook>
              <OptionGroup>
                <CheckedLine>
                  <ClickableCheck onClick={onClickCheck}>
                    <CheckBox isChecked={checked} onClick={() => {}} />
                    <CheckBoxText>전체 랜덤 모드</CheckBoxText>
                  </ClickableCheck>
                </CheckedLine>
                <OptionBox>
                  <LanguageOption>
                    <OptionHeader>
                      <OptionHeaderItem
                        isActive={langOption === 'word'}
                        onClick={() => {
                          setLangOption('word');
                        }}
                      >
                        단어 암기
                      </OptionHeaderItem>
                      <OptionHeaderItem
                        isActive={langOption === 'mean'}
                        onClick={() => {
                          setLangOption('mean');
                        }}
                      >
                        뜻 암기
                      </OptionHeaderItem>
                    </OptionHeader>
                    <OptionContent>
                      <OptionContentText>문제 수 지정</OptionContentText>
                      <OptionContentNumberBox>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          onClick={() => {
                            setQuizCount((current) => {
                              if (current <= 5) {
                                return current;
                              } else {
                                return current - 5;
                              }
                            });
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.20655 10.5192C6.82067 11.1807 5.86487 11.1807 5.47899 10.5192L0.220031 1.50387C-0.168852 0.837214 0.312019 0 1.08381 0H11.6017C12.3735 0 12.8544 0.837214 12.4655 1.50387L7.20655 10.5192Z"
                            fill="#6E5FED"
                          />
                        </svg>
                        <OptionCount>{quizCount}개</OptionCount>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="12"
                          viewBox="0 0 13 12"
                          fill="none"
                          onClick={() => {
                            setQuizCount((current) => {
                              if (current >= 50) {
                                return current;
                              } else {
                                return current + 5;
                              }
                            });
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.79345 0.980762C6.17933 0.319257 7.13513 0.319259 7.52101 0.980764L12.78 9.99613C13.1689 10.6628 12.688 11.5 11.9162 11.5H1.39826C0.626473 11.5 0.145602 10.6628 0.534485 9.99613L5.79345 0.980762Z"
                            fill="#6E5FED"
                          />
                        </svg>
                      </OptionContentNumberBox>
                    </OptionContent>
                  </LanguageOption>
                  {type !== 'memo' && (
                    <TimerOption>
                      <OptionHeader>
                        <OptionHeaderItem
                          isActive={timerOption === 'quiz'}
                          onClick={() => {
                            setTimerOption('quiz');
                          }}
                        >
                          문제당 시간제한
                        </OptionHeaderItem>
                        <OptionHeaderItem
                          isActive={timerOption === 'book'}
                          onClick={() => {
                            setTimerOption('book');
                          }}
                        >
                          전체 시간제한
                        </OptionHeaderItem>
                      </OptionHeader>
                      <OptionContent>
                        <OptionContentText>시간 지정</OptionContentText>
                        <OptionContentNumberBox>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            onClick={() => {
                              if (timerOption === 'quiz') {
                                setQuizTime((current) => {
                                  if (current <= 10) {
                                    return current;
                                  } else {
                                    return current - 5;
                                  }
                                });
                              }

                              if (timerOption === 'book') {
                                setQuizAllTime((current) => {
                                  if (current <= 30) {
                                    return current;
                                  }
                                  return current - 30;
                                });
                              }
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.20655 10.5192C6.82067 11.1807 5.86487 11.1807 5.47899 10.5192L0.220031 1.50387C-0.168852 0.837214 0.312019 0 1.08381 0H11.6017C12.3735 0 12.8544 0.837214 12.4655 1.50387L7.20655 10.5192Z"
                              fill="#6E5FED"
                            />
                          </svg>
                          <OptionCount>
                            {timerOption === 'quiz' && quizTime + '초'}
                            {timerOption === 'book' && quizAllTime + '초'}
                          </OptionCount>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            onClick={() => {
                              if (timerOption === 'quiz') {
                                setQuizTime((current) => {
                                  if (current >= 60) {
                                    return current;
                                  }
                                  return current + 5;
                                });
                              }

                              if (timerOption === 'book') {
                                setQuizAllTime((current) => {
                                  if (current >= 300) {
                                    return current;
                                  }
                                  return current + 30;
                                });
                              }
                            }}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.79345 0.980762C6.17933 0.319257 7.13513 0.319259 7.52101 0.980764L12.78 9.99613C13.1689 10.6628 12.688 11.5 11.9162 11.5H1.39826C0.626473 11.5 0.145602 10.6628 0.534485 9.99613L5.79345 0.980762Z"
                              fill="#6E5FED"
                            />
                          </svg>
                        </OptionContentNumberBox>
                      </OptionContent>
                    </TimerOption>
                  )}
                </OptionBox>
              </OptionGroup>
            </TopView>
            <BottomView>
              <ToggleSwitchGroup>
                <Toggle
                  type="default"
                  isToggle={haveMemoWord}
                  onClick={() => {
                    setHaveMemoWord((current) => !current);
                  }}
                />
                <ToggleSwitchText>암기된 단어 미포함</ToggleSwitchText>
              </ToggleSwitchGroup>
            </BottomView>
          </Content>
          <BottomButton onClick={onClickConfirm}>확인</BottomButton>
        </Container>
      </StackLayout>
    </>
  );
};

export default OptionSelectPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomButton = styled.button`
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.primary.default};
  ${({ theme }) => theme.typography.gmarketSans.md[16]};
  color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;
`;

const SelectedBook = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.typography.pretendard.t3.sbd};
`;

const SelectedBookText = styled.div`
  span {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const SelectedBookGoButton = styled.button`
  display: flex;
  align-items: center;
`;

const OptionGroup = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const CheckedLine = styled.div`
  display: flex;
  padding: 8px;
`;

const ClickableCheck = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const CheckBoxText = styled.div`
  margin-left: 8px;
  margin-top: 2px;
`;

const OptionBox = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const LanguageOption = styled.div``;

const TimerOption = styled.div`
  margin-top: 24px;
`;

const OptionHeader = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  display: flex;
  padding: 8px;
`;

const OptionHeaderItem = styled.button<{
  isActive: boolean;
}>`
  width: 50%;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary.default};
  ${({ theme }) => theme.typography.pretendard.t3.sbd};
  cursor: pointer;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.colors.primary.default};
    `};

  & + & {
    margin-left: 8px;
  }
`;

const OptionContent = styled.div`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  border-radius: 4px;
  margin-top: 8px;
  display: flex;
  padding: 8px 8px 8px 16px;
`;

const OptionContentText = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary[600]};

  ${({ theme }) => theme.typography.pretendard.t4.sbd};
`;

const OptionContentNumberBox = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  user-select: none;

  svg {
    cursor: pointer;

    &:active {
      path {
        fill: ${({ theme }) => theme.colors.primary[400]};
      }
    }
  }
`;

const OptionCount = styled.div``;

const TopView = styled.div`
  overflow-y: scroll;
`;

const BottomView = styled.div`
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  padding-bottom: 16px;
  display: flex;
  justify-content: center;
`;

const ToggleSwitchGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleSwitchText = styled.div``;
