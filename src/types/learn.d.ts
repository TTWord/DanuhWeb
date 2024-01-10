declare interface IReviewNote {
  word: string;
  mean: string;
  isMemo: boolean;
  wordId: number;
}

declare interface IAnswerData {
  mean: string;
  word: string;
}

declare interface ILearnOptions {
  bookIds: number[];
  mode: 'word' | 'mean';
  quizCount: number;
  quizTime: number;
  timerOption: 'quiz' | 'book';
  memorizedFilter: boolean;
}
