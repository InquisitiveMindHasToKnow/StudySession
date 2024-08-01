import React, { useState } from 'react';
import '../css/Quiz.css'; 
import quizQuestions from "../quiz_questions.json"
  
const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion?.answer;

    const handleOptionClick = (option) => {
        if (!answered) {
            setSelectedOption(option);
            setAnswered(true); // Lock in the answer after selection
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setAnswered(false); // Reset for the next question
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
            setAnswered(false); // Reset for the previous question
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-box">
                <h2>{currentQuestion?.question}</h2>
                <div className="options">
                    {currentQuestion?.options.map((option, index) => {
                        const isCorrect = option === correctAnswer;
                        const isSelected = option === selectedOption;

                        // Determine the class name based on the answer state
                        let buttonClass = 'option-button';
                        if (answered) {
                            if (isCorrect) {
                                buttonClass += ' correct';
                            } else if (isSelected) {
                                buttonClass += ' incorrect';
                            } else if (!isSelected && !isCorrect) {
                                buttonClass += ' incorrect-when-disabled'; // Class for incorrect options that were not selected
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={buttonClass}
                                onClick={() => handleOptionClick(option)}
                                disabled={answered}
                            >
                                {option}
                            </button>
                        );
                    })}
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