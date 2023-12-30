import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isSupervisor = () => {
  const role = localStorage.getItem('role');
  return role === 'supervisor';
};

export const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export const SupervisorProtectedRoute = ({ children }) => {
  return isAuthenticated() && isSupervisor() ? children : <Navigate to="/HomePage" />;
};
