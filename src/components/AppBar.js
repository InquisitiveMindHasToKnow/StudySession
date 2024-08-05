import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/AppBar.css';

const AppBar = () => {
    const [difficulty, setDifficulty] = useState('easy');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Extract difficulty from URL query parameters if available
        const searchParams = new URLSearchParams(location.search);
        const queryDifficulty = searchParams.get('difficulty');
        if (queryDifficulty) {
            setDifficulty(queryDifficulty);
        }
    }, [location.search]);

    const handleDifficultyChange = (event) => {
        const newDifficulty = event.target.value;
        setDifficulty(newDifficulty);
        // Update URL with the new difficulty
        navigate(`?difficulty=${newDifficulty}`);
    };

    return (
        <div className="app-bar">
            <Link to="/" className="app-bar-link">Study Session</Link>
            {location.pathname === '/' && (
                <div className="app-bar-dropdown">
                    <select
                        value={difficulty}
                        onChange={handleDifficultyChange}
                        className="app-bar-select"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="very-hard">Very Hard</option>
                    </select>
                </div>
            )}
        </div>
    );
};

export default AppBar;
