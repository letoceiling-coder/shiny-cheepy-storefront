import { createContext, useContext, useState, ReactNode } from "react";
import { mockUser, type UserProfile } from "@/data/mock-data";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, phone: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (_email: string, _password: string) => {
    setIsAuthenticated(true);
    setUser(mockUser);
  };

  const register = (name: string, email: string, phone: string, _password: string) => {
    setIsAuthenticated(true);
    setUser({ ...mockUser, name, email, phone });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
