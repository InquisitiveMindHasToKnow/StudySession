import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Quiz from './components/Quiz';
import AppBar from './components/AppBar';
import './App.css'; // Make sure you have a global CSS file for general styles

const App = () => {
    return (
        <Router>
            <AppBar /> {/* AppBar is included here so it appears on all pages */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/quiz/:category" element={<Quiz />} />
            </Routes>
        </Router>
    );
};

export default App;