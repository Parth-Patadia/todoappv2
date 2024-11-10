import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const response = await authService.login(userData);
      if (response && response.token) {
        const userToStore = {
          _id: response._id,
          name: response.name,
          email: response.email,
          token: response.token
        };
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response && response.token) {
        const userToStore = {
          _id: response._id,
          name: response.name,
          email: response.email,
          token: response.token
        };
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);