
import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
  register: (name: string, email: string, pass: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login
  const login = (email: string, pass: string) => {
    console.log("Logging in with", email, pass);
    setUser({ id: '1', name: 'John Doe', email: email });
  };

  // Mock logout
  const logout = () => {
    setUser(null);
  };

  // Mock register
  const register = (name: string, email: string, pass: string) => {
    console.log("Registering with", name, email, pass);
    setUser({ id: '1', name: name, email: email });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
