import { makeVar } from '@apollo/client';



export interface QuizQuestion {
    question: string;
    correctAnswer: string;
    options: Record<string, string | null>;
  }

export const QuizComplete = makeVar<boolean>(false);
export const CurrentQuestionVar = makeVar<number>(0);
export const AnswersVar = makeVar<string[]>([]);
export const CorrectAnswersCountVar = makeVar<number>(0);
export const SelectedAnswerVar = makeVar<string | null>(null);
export const TimeLeftVar = makeVar<number>(10);
export const QuestionsVar = makeVar<QuizQuestion[]>([]);
export const LoadingVar = makeVar(true);