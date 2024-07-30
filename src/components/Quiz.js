import React, { useState } from 'react';
import './Quiz.css'; // Create this CSS file for styling

const Quiz = () => {
  const [question, setQuestion] = useState("What is the capital of France?");
  const [options, setOptions] = useState([
    "Berlin",
    "Madrid",
    "Paris",
    "Rome"
  ]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <h2>{question}</h2>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;