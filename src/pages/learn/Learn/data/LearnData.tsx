import picFlashCard from './images/flashcard.png';
import picSelect from './images/select.png';
import picTyping from './images/typing.png';
import picBlindMemo from './images/blind-memo.png';
import picBlindQuiz from './images/blind-quiz.png';

// 블라인드 추가하기

export const memoList = [
  {
    title: '단어암기',
    type: 'flashcard',
    icon: picFlashCard,
    iconWidth: '102px',
  },
  {
    title: '단어암기',
    type: 'blind',
    icon: picBlindMemo,
    iconWidth: '102px',
  },
];

export const quizList = [
  {
    title: '객관식',
    type: 'select',
    icon: picSelect,
    iconWidth: '102px',
  },
  {
    title: '주관식',
    type: 'typing',
    icon: picTyping,
    iconWidth: '102px',
  },
  {
    title: '객관식',
    type: 'blind',
    typeDetail: 'choice',
    icon: picBlindQuiz,
    iconWidth: '102px',
  },
  {
    title: '주관식',
    type: 'blind',
    typeDetail: 'typing',
    icon: picBlindQuiz,
    iconWidth: '102px',
  },
];
