import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='profile' element={<ProfilePage/> } />
      </Routes>
    </Router>
  );
}

export default App;
