import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from './types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const users: Record<UserRole, User> = {
  admin: { 
    id: 'A001', 
    name: 'Dr. Richard Hayes', 
    email: 'admin@hospiron.com', 
    role: 'admin', 
    department: 'Hospital Administration', 
    phone: '+1 (555) 000-1000', 
    lastLogin: '2025-01-15 08:30 AM' 
  },
  doctor: { 
    id: 'D001', 
    name: 'Dr. Michael Chen', 
    email: 'm.chen@hospiron.com', 
    role: 'doctor', 
    specialization: 'Interventional Cardiology', 
    department: 'Cardiology', 
    phone: '+1 (555) 111-2222', 
    lastLogin: '2025-01-15 07:45 AM' 
  },
  nurse: { 
    id: 'N001', 
    name: 'Patricia Lee', 
    email: 'p.lee@hospiron.com', 
    role: 'nurse', 
    department: 'Intensive Care Unit', 
    phone: '+1 (555) 222-3333', 
    lastLogin: '2025-01-15 06:55 AM' 
  },
  receptionist: { 
    id: 'R001', 
    name: 'Jennifer Adams', 
    email: 'j.adams@hospiron.com', 
    role: 'receptionist', 
    department: 'Front Desk', 
    phone: '+1 (555) 333-4444', 
    lastLogin: '2025-01-15 07:30 AM' 
  },
  patient: { 
    id: 'P001', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@email.com', 
    role: 'patient', 
    phone: '+1 (555) 123-4567', 
    lastLogin: '2025-01-14 09:15 PM' 
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    setUser(users[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
