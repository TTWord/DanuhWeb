import picFlashCard from './images/flashcard.png';
import picSelect from './images/select.png';
import picTyping from './images/typing.png';

export const memoList = [
  {
    title: '단어암기',
    type: 'flashcard',
    icon: picFlashCard,
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
];
