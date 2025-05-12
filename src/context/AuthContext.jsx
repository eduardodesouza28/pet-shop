import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const MOCKAPI_LOGIN_URL = 'https://681258653ac96f7119a7be3d.mockapi.io/api/tt/login';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      if (email === 'vet@petcare.com' && password === '123456') {
        const response = {
          data: {
            token: `fake-jwt-token-${Date.now()}`,
            user: {
              name: 'Dra. Paula'
            }
          }
        };
        console.log('Simulated Login Success:', response.data);
        setToken(response.data.token);
        setUser(response.data.user);
        setLoading(false);
        return true;
      } else {
        console.log('Simulated Login Failed: Invalid credentials');
        throw new Error('Credenciais inválidas.');
      }
    } catch (err) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMessage);
      setToken(null);
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setToken(null);
    setUser(null);
    console.log('User logged out, token/user state cleared.');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
