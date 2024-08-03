import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('easy'); // Default difficulty

    const handleCardClick = (category) => {
        navigate(`/quiz/${category}?difficulty=${difficulty}`);
    };

    return (
        <div className="container">
            <div className="difficulty-container">
                <h3>Select Difficulty</h3>
                <button onClick={() => setDifficulty('easy')} className={difficulty === 'easy' ? 'selected' : ''}>Easy</button>
                <button onClick={() => setDifficulty('medium')} className={difficulty === 'medium' ? 'selected' : ''}>Medium</button>
                <button onClick={() => setDifficulty('hard')} className={difficulty === 'hard' ? 'selected' : ''}>Hard</button>
                <button onClick={() => setDifficulty('very-hard')} className={difficulty === 'very-hard' ? 'selected' : ''}>Very Hard</button>
            </div>
            <div className="card-container">
                <div className="card" onClick={() => handleCardClick('android')}>
                    <h2>Android</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('kotlin')}>
                    <h2>Kotlin</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('java')}>
                    <h2>Java</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('python')}>
                    <h2>Python</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('data-structures')}>
                    <h2>Data Structures and Algorithms</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('html')}>
                    <h2>HTML</h2>
                </div>
                <div className="card" onClick={() => handleCardClick('css')}>
                    <h2>CSS</h2>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;