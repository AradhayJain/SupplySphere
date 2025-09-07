import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('supply_token');
      const savedUser = localStorage.getItem('supply_user');
      const savedRole = localStorage.getItem('supply_user_role');

      if (savedToken && savedUser && savedRole) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        setRole(savedRole);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse auth data from localStorage", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = ({ token, Role, ...userData }) => {
    localStorage.setItem('supply_token', token);
    localStorage.setItem('supply_user', JSON.stringify(userData));
    localStorage.setItem('supply_user_role', Role);

    setToken(token);
    setUser(userData);
    setRole(Role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('supply_token');
    localStorage.removeItem('supply_user');
    localStorage.removeItem('supply_user_role');

    setToken(null);
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, role, isAuthenticated, loading, login, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
