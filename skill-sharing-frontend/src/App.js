import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/ProfilePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import UserDashboard from './pages/UserDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/profile' element={< UserProfilePage /> } />
        <Route path='/signup' element={< SignUpForm />} />
        <Route path='/login' element={< LoginForm />} />
        <Route path='/dashboard' element={< UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
