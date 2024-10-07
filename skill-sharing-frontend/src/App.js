import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/UserProfilePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import UserDashboard from './pages/UserDashboard';
import './index.css';
import EditProfile from './components/EditUserProfile';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path='/profile' element={< UserProfilePage /> } />
        <Route path='/edit-profile' element={< EditProfile /> } />
        <Route path='/signup' element={< SignUpForm />} />
        <Route path='/login' element={< LoginForm />} />
        <Route path='/dashboard' element={< UserDashboard />} />
        <Route path='/explore' element={< Explore /> } />
        <Route path='/about' element={< About /> } />
        <Route path='/contact' element={< Contact /> } />
      </Routes>
    </Router>
  );
}

export default App;
