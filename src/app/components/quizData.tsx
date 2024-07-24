
export type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export const quizQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is the largest mammal in the world?',
      options: ['Elephant', 'Blue Whale', 'Giraffe', 'Rhino'],
      correctAnswer: 'Blue Whale',
    }
  ];
  