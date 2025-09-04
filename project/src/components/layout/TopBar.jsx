import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('supply_user_role');

  const handleLogout = () => {
    logout();
    navigate('/'); // redirect to landing page
  };

  return (
    <header className="bg-dark-200/70 backdrop-blur-md border-b border-dark-300 p-4 flex justify-between items-center sticky top-0 z-10 shadow-card">
      {/* Page Title + Welcome */}
      <div>
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {userRole} Dashboard
        </h1>
        <p className="text-sm text-light-400">
          Welcome back, {user?.name || 'User'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="text-light-400 hover:text-primary transition-colors">
          <Bell size={20} />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 rounded-lg bg-gradient-primary text-white text-sm font-medium shadow-card hover:opacity-90 transition"
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
