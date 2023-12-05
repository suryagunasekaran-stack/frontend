import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import Sidebarr from './components/Sidebar';
import ToolboxForm from './components/ToolboxForm';



function App() {
  const isAuthenticated = () => {
    // Check for authentication logic
    // For example, check if a session token is present in the cookies
    return document.cookie.includes('sessionToken');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

  return (
<Router>
  <div style={{ display: 'flex' }}>
                <Sidebarr />
    <div style={{ flex: 1 }}>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/HomePage" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>} />
    <Route path="/ToolboxCreate" element={ <ProtectedRoute> <ToolboxForm /> </ProtectedRoute>} />
    
  </Routes>
  </div>
  </div>
</Router>

  );
}

export default App;


