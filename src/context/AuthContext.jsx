import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = authService.getSession();
    if (session && session.user) setUser(session.user);
  }, []);

  function login(credentials) {
    const res = authService.login(credentials);
    if (res.success) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.message };
  }

  function register(payload) {
    const res = authService.register(payload);
    if (res.success) {
      setUser(res.user);
      return { success: true };
    }
    return { success: false, message: res.message };
  }

  function logout() {
    authService.logout();
    setUser(null);
    navigate('/auth/login');
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}