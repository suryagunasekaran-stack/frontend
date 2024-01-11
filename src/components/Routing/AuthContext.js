import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state based on localStorage
  const [theAuth, setTheAuth] = useState(localStorage.getItem('token') ? true : false);

  // Update localStorage when theAuth changes
  useEffect(() => {
    if (theAuth) {
      // Assuming you're storing the token in localStorage when logging in
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token in localStorage, set theAuth to false
        setTheAuth(false);
      }
    } else {
      // If theAuth is false, clear the token from localStorage
      localStorage.removeItem('token');
    }
  }, [theAuth]);

  return (
    <AuthContext.Provider value={{ theAuth, setTheAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
