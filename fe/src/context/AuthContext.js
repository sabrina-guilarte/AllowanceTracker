import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback(async (email, password, pin, isAdmin = false) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        pin,
        isAdmin
      });

      const { user: userData, token } = response.data;
      
      setUser(userData);
      localStorage.setItem('token', token);
      
      // Redirect based on user role
      switch (userData.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'parent':
          navigate('/parent');
          break;
        case 'child':
          navigate('/child');
          break;
        default:
          navigate('/login');
      }

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};