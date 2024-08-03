import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/Quiz.css';
import quizQuestions from '../quiz_questions.json';

const Quiz = () => {
    const { category } = useParams(); // Get category from URL
    const location = useLocation(); // Get the location object to parse query parameters
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({}); // Tracks whether a question has been answered
    const [correctAnswers, setCorrectAnswers] = useState(0);

    // Extract difficulty level from query parameters
    const searchParams = new URLSearchParams(location.search);
    const difficulty = searchParams.get('difficulty') || 'easy'; // Default to 'easy' if not specified

    // Map difficulty levels to the number of questions
    const difficultyMapping = {
        easy: 12,
        medium: 20,
        hard: 30,
        'very-hard': 40
    };

    const numberOfQuestions = difficultyMapping[difficulty] || 12; // Default to 12 if difficulty is not recognized

    useEffect(() => {
        // Filter questions by category and shuffle them to pick random ones
        const filteredQuestions = quizQuestions.filter(q => q.category === category);
        const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions); // Select questions based on difficulty

        // Shuffle options for each question
        const questionsWithShuffledOptions = selectedQuestions.map(q => ({
            ...q,
            options: shuffleArray(q.options)
        }));

        setQuestions(questionsWithShuffledOptions);
    }, [category, numberOfQuestions]);

    const handleOptionClick = (questionIndex, option) => {
        // Prevent re-answering if already answered
        if (!answeredQuestions[questionIndex]) {
            setSelectedOptions(prev => ({ ...prev, [questionIndex]: option }));
            setAnsweredQuestions(prev => ({ ...prev, [questionIndex]: true }));

            // Check if the selected option is correct
            if (questions[questionIndex].answer === option) {
                setCorrectAnswers(prev => prev + 1);
            }
        }
    };

    return (
        <div className="quiz-container">
            <h1 className="quiz-header">Study Session</h1>
            <div className="quiz-grid">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="quiz-box">
                        <p>{questionIndex + 1 + ') ' + question.question}</p>
                        <div className="options">
                            {question.options.map((option, optionIndex) => {
                                const isCorrect = option === question.answer;
                                const isSelected = selectedOptions[questionIndex] === option;
                                const isAnswered = answeredQuestions[questionIndex];

                                let buttonClass = 'option-button';
                                if (isAnswered) {
                                    if (isCorrect) {
                                        buttonClass += ' correct';
                                    } else if (isSelected) {
                                        buttonClass += ' incorrect';
                                    }
                                }

                                return (
                                    <button
                                        key={optionIndex}
                                        className={buttonClass}
                                        onClick={() => handleOptionClick(questionIndex, option)}
                                        disabled={isAnswered}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
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
