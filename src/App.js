import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import Sidebarr from './components/Sidebar';
import ToolboxForm from './components/ToolboxForm';
import TaskArrangementForm from './components/AnchoragePreForm';
import RecordsViewer from './components/ViewToolbox';
import NotificationBell from './components/Notifcations';
import { jwtDecode } from "jwt-decode"
import AnchorageViewer from './components/ViewAnchorform';



const Layout = () => {
  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const {exp} = jwtDecode(token);
        
        // Check if the token is expired
        if (exp < Date.now() / 1000) {
            localStorage.removeItem('token'); // Token has expired, remove it
            return false;
        }

        return true;
    } catch (error) {
      console.log(error);
        return false; // If there's an error, consider the user not authenticated
    }
};

  return (
      <div style={{ display: 'flex' }}>
          {location.pathname !== '/' && <Sidebarr />}
          <div style={{ flex: 1 }}>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/HomePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                  <Route path="/ToolboxCreate" element={<ProtectedRoute><ToolboxForm /></ProtectedRoute>} />
                  <Route path="/ToolboxView" element={<ProtectedRoute><RecordsViewer /></ProtectedRoute>} />
                  <Route path="/AnchorView" element={<ProtectedRoute><AnchorageViewer /></ProtectedRoute>} />
                  <Route path="/AnchoragePreForm" element={<ProtectedRoute><TaskArrangementForm /></ProtectedRoute>} />
                  {/* ... other routes ... */}
              </Routes>
          </div>
          {location.pathname !== '/' && <NotificationBell />}
      </div>
  );
};

function App() {

return (
  <Router>
      <Layout />
  </Router>
);
}

export default App;


