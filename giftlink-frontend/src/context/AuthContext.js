import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('giftlink-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (payload) => {
    setUser(payload);
    sessionStorage.setItem('giftlink-user', JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('giftlink-user');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
