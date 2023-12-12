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
const Layout = () => {
  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };

  const isAuthenticated = () => {
    // Check for authentication logic
    // For example, check if a session token is present in the cookies
    return document.cookie.includes('sessionToken');
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


