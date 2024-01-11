import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from './AuthContext';

const isAuthenticated = (setTheAuth) => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      setTheAuth(false);
      return false;
    }

    return true;
  } catch (error) {
    setTheAuth(false);
    return false;
  }
};

const isSupervisor = () => {
  const role = localStorage.getItem('role');
  return role === 'supervisor';
};

export const ProtectedRoute = ({ children }) => {
  const { setTheAuth } = useContext(AuthContext); // Use setTheAuth from AuthContext
  return isAuthenticated(setTheAuth) ? children : <Navigate to="/" />;
};

export const SupervisorProtectedRoute = ({ children }) => {
  return isAuthenticated() && isSupervisor() ? children : <Navigate to="/HomePage" />;
};
