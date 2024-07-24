
"use client";
import React, { useState } from 'react';
import Question from './Question';
import { quizQuestions, QuizQuestion } from '../components/quizData'

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const questions: QuizQuestion[] = quizQuestions;

  const handleSelectAnswer = (selectedOption: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      calculateCorrectAnswers();
      setIsQuizComplete(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const calculateCorrectAnswers = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    setCorrectAnswersCount(correctCount);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {!isQuizComplete ? (
        <>
          <Question
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            onSelectAnswer={handleSelectAnswer}
          />
          <div className="flex justify-between mt-4">
            {currentQuestion > 0 && (
              <button
                onClick={handlePreviousQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Previous Question
              </button>
            )}
            <button
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
