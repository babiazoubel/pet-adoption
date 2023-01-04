import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { authenticated, register, logout, login } = useAuth();
  return (
    <AuthContext.Provider
      value={{ authenticated, register, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

