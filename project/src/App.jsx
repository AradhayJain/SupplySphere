import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HandleLogin from './components/HandleLogin';
import ResetPasswordPage from './pages/Reset';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-inter">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/reset-password/:resettoken" element={<ResetPasswordPage />} />
            <Route path="/" element={
              <HandleLogin>
                <LandingPage />
              </HandleLogin>}/>
            <Route path="/auth/login" element={<HandleLogin><AuthPage type="login" /></HandleLogin>} />
            <Route path="/auth/signup" element={<HandleLogin><AuthPage type="signup" /></HandleLogin>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
