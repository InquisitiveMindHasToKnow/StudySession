import React from 'react';
import Quiz from './components/Quiz.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/quiz/:category" element={<Quiz />} />
          </Routes>
      </Router>
  );
};
export default App;
