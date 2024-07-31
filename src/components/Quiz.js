import React, { useState } from 'react';
import './Quiz.css'; 
import androidQuestions from "../quiz_questions.json"

  
  const Quiz = () => {
    // Initialize with the first question and options from the list
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
  
    const currentQuestion = androidQuestions[currentQuestionIndex];
  
    return (
      <div className="quiz-container">
        <div className="quiz-box">
          <h2>{currentQuestion.question}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
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