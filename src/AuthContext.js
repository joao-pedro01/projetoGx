import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('jwt_authorization') || null);

  useEffect(() => {
    const tokenFromCookie = Cookies.get('jwt_authorization');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    Cookies.set('jwt_authorization', token);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('jwt.authorization');
  };

  const isAuthenticated = !!token;

  const api = Axios.create({
    baseURL: 'http://localhost:3030/api',
  });

  api.interceptors.request.use((config) => {
    const token = Cookies.get('jwt_authorization');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
