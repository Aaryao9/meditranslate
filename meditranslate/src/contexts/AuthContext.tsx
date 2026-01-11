import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('meditranslate-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, _password: string) => {
    // Simulated login - replace with actual API call
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
    };
    setUser(mockUser);
    localStorage.setItem('meditranslate-user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, _password: string) => {
    // Simulated registration - replace with actual API call
    const mockUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
    };
    setUser(mockUser);
    localStorage.setItem('meditranslate-user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meditranslate-user');
    localStorage.removeItem('meditranslate-chats');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
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
