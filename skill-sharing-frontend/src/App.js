import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/UserProfilePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import './index.css';
import EditProfile from './components/EditUserProfile';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';
import SkillsMarketplace from './pages/SkillsMarketplace';
import SingleSkill from './components/SingleSkill';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< HomePage />} />
        <Route path="/profile" element={<PrivateRoute element={< UserProfilePage />} />} />
        <Route path='/edit-profile' element={< EditProfile /> } />
        <Route path="/unauthorized" element={< Unauthorized />} />
        <Route path='/signup' element={< SignUpForm />} />
        <Route path='/marketplace' element={< SkillsMarketplace /> } />
        <Route path='/login' element={< LoginForm />} />
        <Route path='/explore' element={< Explore /> } />
        <Route path='/about' element={< About /> } />
        <Route path='/contact' element={< Contact /> } />
        <Route path='/skills/:id' element={< SingleSkill /> } />

        {/* Admin Protected Routes */}
        <Route element={<AdminRoute />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
