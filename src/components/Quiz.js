import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../css/Quiz.css';
import quizQuestions from '../quiz_questions.json';

const Quiz = () => {
    const { category } = useParams();
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 5 minutes
    const location = useLocation();
    const [quizEnded, setQuizEnded] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const difficulty = searchParams.get('difficulty') || 'easy';

    const difficultyMapping = {
        easy: 12,
        medium: 21,
        hard: 30,
        'very-hard': 42
    };

    const numberOfQuestions = difficultyMapping[difficulty] || 12;

    useEffect(() => {
        const filteredQuestions = quizQuestions.filter(q => q.category === category);
        const shuffledQuestions = filteredQuestions.sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffledQuestions.slice(0, numberOfQuestions);

        const questionsWithShuffledOptions = selectedQuestions.map(q => ({
            ...q,
            options: shuffleArray(q.options),
        }));

        setQuestions(questionsWithShuffledOptions);
    }, [category, numberOfQuestions]);

    useEffect(() => {
        if (timeLeft > 0 && !quizEnded) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setQuizEnded(true);
        }
    }, [timeLeft, quizEnded]);

    const handleOptionClick = (questionIndex, option) => {
        if (!answeredQuestions[questionIndex]) {
            setSelectedOptions(prev => ({ ...prev, [questionIndex]: option }));
            setAnsweredQuestions(prev => ({ ...prev, [questionIndex]: true }));

            if (questions[questionIndex].answer === option) {
                setCorrectAnswers(prev => prev + 1);
            }
        }
    };

    return (
        <div className="quiz-container">
            <h1 className="quiz-header">Study Session</h1>
            <div className="quiz-info">
                <div className="timer">
                    <h2>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</h2>
                </div>
                <div className="score">
                    <h2>Score: {correctAnswers} / {questions.length}</h2>
                </div>
            </div>
            <div className="quiz-grid">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="quiz-box">
                        <p>{questionIndex + 1 + ') ' + question.question}</p>
                        <div className="options">
                            {question.options.map((option, optionIndex) => {
                                const isCorrect = option === question.answer;
                                const isSelected = selectedOptions[questionIndex] === option;
                                const isAnswered = answeredQuestions[questionIndex] || quizEnded;

                                let buttonClass = 'option-button';
                                if (isAnswered) {
                                    if (isCorrect) {
                                        buttonClass += ' correct';
                                    } else if (isSelected && !isCorrect || !isCorrect) {
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
                        {quizEnded && !answeredQuestions[questionIndex] && (
                            <p className="correct-answer">Correct answer: {question.answer}</p>
                        )}
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
