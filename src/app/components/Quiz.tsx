"use client";
import React, { useEffect } from 'react';
import Question from './Question';
import { quizQuestions, QuizQuestion } from '../components/quizData';
import { useReactiveVar } from '@apollo/client';
import { 
  QuizComplete, 
  CurrentQuestionVar, 
  AnswersVar, 
  CorrectAnswersCountVar, 
  SelectedAnswerVar, 
  TimeLeftVar 
} from '../reactiveVar';


const Quiz: React.FC = () => {
  const answers = useReactiveVar(AnswersVar);
  const currentQuestion = useReactiveVar(CurrentQuestionVar);
  const isQuizComplete = useReactiveVar(QuizComplete);
  const correctAnswersCount = useReactiveVar(CorrectAnswersCountVar);
  const selectedAnswer = useReactiveVar(SelectedAnswerVar);
  const timeLeft = useReactiveVar(TimeLeftVar);
  const questions: QuizQuestion[] = quizQuestions;

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      TimeLeftVar(timeLeft > 0 ? timeLeft - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    TimeLeftVar(10); 
  }, [currentQuestion]);

  const handleSelectAnswer = (selectedOption: string) => {
    SelectedAnswerVar(selectedOption); 
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    AnswersVar(newAnswers); 
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      CurrentQuestionVar(currentQuestion + 1); 
      SelectedAnswerVar(null); 
    } else {
      calculateCorrectAnswers();
      QuizComplete(true); 
    }
  };

  const calculateCorrectAnswers = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    CorrectAnswersCountVar(correctCount); 
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {!isQuizComplete ? (
        <>
          <div className="text-center">
            <p className="text-red-500"> {timeLeft} seconds left!!!</p>
          </div>
          <Question
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onSelectAnswer={handleSelectAnswer}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!selectedAnswer}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h2 className="text-lg font-medium text-black">Quiz Complete!</h2>
          <p className="mt-2 text-black">
            You answered {correctAnswersCount} out of {questions.length} questions correctly.
          </p>
        </div>
      )}
    </div>
  );
}; 

export default Quiz;
