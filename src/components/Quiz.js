import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Quiz.css';
import quizQuestions from '../quiz_questions.json';

const Quiz = () => {
    const { category } = useParams(); // Get category from URL
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        // Filter questions by category and shuffle them to pick random ones
        const filteredQuestions = quizQuestions.filter(q => q.category === category);
        const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, 10); // Select 10 questions

        // Shuffle options for each question
        const questionsWithShuffledOptions = selectedQuestions.map(q => ({
            ...q,
            options: shuffleArray(q.options)
        }));

        setQuestions(questionsWithShuffledOptions);
    }, [category]);

    useEffect(() => {
        if (selectedOption && questions.length) {
            if (selectedOption === questions[currentQuestionIndex]?.answer) {
                setCorrectAnswers(prev => prev + 1);
            }
        }
    }, [answered, questions, currentQuestionIndex, selectedOption]);

    const handleOptionClick = (option) => {
        if (!answered) {
            setSelectedOption(option);
            setAnswered(true); // Lock in the answer after selection
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
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

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return <p>Loading questions...</p>;
    }

    return (
        <div className="quiz-container">
            <h1 className="quiz-header">Study Session</h1>
            <div className="quiz-box">
                <h2>Question {currentQuestion.question}</h2>
                <p className="score">Correct Answers: {correctAnswers} out of {questions.length}</p>
                <div className="options">
                    {currentQuestion.options.map((option, index) => {
                        const isCorrect = option === currentQuestion.answer;
                        const isSelected = option === selectedOption;

                        let buttonClass = 'option-button';
                        if (answered) {
                            if (isCorrect) {
                                buttonClass += ' correct';
                            } else if (isSelected) {
                                buttonClass += ' incorrect';
                            } else if (!isSelected && !isCorrect) {
                                buttonClass += ' incorrect-when-disabled';
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
                    <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default Quiz;