"use client";
import React, { useEffect} from 'react';
import Question from './Question';
import { useReactiveVar } from '@apollo/client';
import { 
  QuizComplete, 
  CurrentQuestionVar, 
  AnswersVar, 
  CorrectAnswersCountVar, 
  SelectedAnswerVar, 
  TimeLeftVar,
  QuestionsVar,
  LoadingVar
} from '../reactiveVar';


const Quiz: React.FC = () => {
  const questions = useReactiveVar(QuestionsVar);
  const loading = useReactiveVar(LoadingVar);
  const answers = useReactiveVar(AnswersVar);
  const currentQuestion = useReactiveVar(CurrentQuestionVar);
  const isQuizComplete = useReactiveVar(QuizComplete);
  const correctAnswersCount = useReactiveVar(CorrectAnswersCountVar);
  const selectedAnswer = useReactiveVar(SelectedAnswerVar);
  const timeLeft = useReactiveVar(TimeLeftVar);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://quizapi.io/api/v1/questions?apiKey=w9LC2MQp2eTzUpPkVlUi34Xj5ziGBY8vd6NWGXf4&category=sql&difficulty=Easy&limit=5');
      const data = await response.json();
      console.log('API Response:', data);
      const formattedQuestions = data.map((item: any) => {
        const correctAnswerKey = Object.entries(item.correct_answers).find(
          ([key, value]) => value === "true"
        )?.[0];
        
        const correctAnswerKeyBase = correctAnswerKey?.replace('_correct', '');
        const correctAnswer = item.answers[correctAnswerKeyBase ?? ''];

        return {
          question: item.question,
          correctAnswer,
          options: item.answers 
        };
      });

      QuestionsVar(formattedQuestions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      LoadingVar(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      TimeLeftVar(timeLeft > 0 ? timeLeft - 1 : 0);
    }, 1500);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    TimeLeftVar(15);
  }, [currentQuestion]);

  

  const handleSelectAnswer = (selectedOption: string) => {
    SelectedAnswerVar(selectedOption);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    AnswersVar(newAnswers);
    console.log('Selected Answer:', selectedOption);
    console.log('Updated Answers:', newAnswers);
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
    let correctCount = 0;
    questions.forEach((question, index) => {
      console.log(`Question ${index}:`, question);
      console.log(`User Answer:`, answers[index]);
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    CorrectAnswersCountVar(correctCount);
    console.log('Correct Answers Count:', correctCount);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {!isQuizComplete ? (
        <>
          <div className="text-center">
            <p className="text-red-500">{timeLeft} seconds left!!!</p>
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
