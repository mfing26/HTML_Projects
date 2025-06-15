import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; 

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FilterPage from './pages/FilterPage';
import FactorsPage from './pages/FactorsPage';

function App() {
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/factors" element={<FactorsPage />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;