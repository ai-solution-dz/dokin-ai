
import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  currentPlan: string;
  apiKey: string;
  lang: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, company?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simulate login with demo credentials
    if (email === 'demo@ai.dz' && password === 'demo123') {
      setUser({
        name: 'Ahmed Benaissa',
        email: 'demo@ai.dz',
        isLoggedIn: true,
        currentPlan: 'Pro',
        apiKey: 'dokin_abc123_xyz789',
        lang: 'en',
        company: 'Demo Company'
      });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, company?: string): boolean => {
    // Simulate signup
    setUser({
      name,
      email,
      isLoggedIn: true,
      currentPlan: 'Test',
      apiKey: `dokin_${Math.random().toString(36).substring(2, 15)}`,
      lang: 'en',
      company
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
