import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [theAuth, setTheAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ theAuth, setTheAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
