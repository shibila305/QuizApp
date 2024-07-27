import React from 'react';

type QuestionProps = {
  question: string;
  options: Record<string, string | null>;
  onSelectAnswer: (selectedOption: string) => void;
};

const Question: React.FC<QuestionProps> = ({ question, options, onSelectAnswer }) => {
  const handleOptionSelect = (option: string) => {
    onSelectAnswer(option);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto my-4">
      <h2 className="text-lg font-medium text-black mb-2">{question}</h2>
      <div className="space-y-2">
        {Object.values(options)
          .filter((option) => option !== null)
          .map((option) => (
            <label key={option} className="block mb-2 text-black">
              <input
                type="radio"
                value={option!}
                onChange={() => handleOptionSelect(option!)}
                name="radio"
              />
              {option}
            </label>
          ))}
      </div>
    </div>
  );
};

export default Question;
