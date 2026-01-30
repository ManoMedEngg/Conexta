// Authentication context for Conexta Medical IoT Platform

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, demoUsers } from '@/services/mockData';
import { authenticateUser, getUserByEmail, createUser as apiCreateUser, demoAuthenticateUser } from '@/services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  trialLogin: (role: User['role']) => void;
  demoLogin: (role: User['role']) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('conexta_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('conexta_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const authenticatedUser = await authenticateUser(email, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem('conexta_user', JSON.stringify(authenticatedUser));
        return authenticatedUser;
      }
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: User['role']): Promise<boolean> => {
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return false;
    }

    const newUser = await apiCreateUser({ name, email, password, role });
    setUser(newUser);
    localStorage.setItem('conexta_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('conexta_user');
  };

  const trialLogin = (role: User['role']) => {
    const demoUser = demoUsers.find((u) => u.role === role);
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('conexta_user', JSON.stringify(demoUser));
    }
  };

  const demoLogin = async (role: User['role']): Promise<User> => {
    setLoading(true);
    try {
      const demoUser = await demoAuthenticateUser(role);
      if (demoUser) {
        setUser(demoUser);
        localStorage.setItem('conexta_user', JSON.stringify(demoUser));
        return demoUser;
      }
      throw new Error('Demo user not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, trialLogin, demoLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
