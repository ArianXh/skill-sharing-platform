import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='profile' element={< ProfilePage /> } />
        <Route path='/signup' element={< SignUpForm />} />
        <Route path='/login' element={< LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
