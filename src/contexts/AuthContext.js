import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken, getUserInfo, refreshToken } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = getToken();
      if (token) {
        try {
          setLoading(true);
          const userData = await getUserInfo();
          setUser(userData);
        } catch (err) {
          console.error('Failed to validate token:', err);
          setError('Authentication failed');
          removeToken();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    removeToken();
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const refreshUserToken = async () => {
    try {
      const newToken = await refreshToken();
      // 여기서 새 토큰을 저장하고 사용자 정보를 업데이트합니다.
    } catch (err) {
      console.error('Failed to refresh token:', err);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, clearError, refreshUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);