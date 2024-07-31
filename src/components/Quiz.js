import React, { useState } from 'react';
import './Quiz.css'; 
import quizQuestions from "../quiz_questions.json"

  
  const Quiz = () => {
    // Initialize with the first question and options from the list
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null); // Reset selected option for the next question
        }
      };
    
      const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
          setSelectedOption(null); // Reset selected option for the previous question
        }
      };
  
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    
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
        <div className="navigation-buttons">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === quizQuestions.length - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

  
  export default Quiz;