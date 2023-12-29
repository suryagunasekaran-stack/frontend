import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router-dom';
import Sidebarr from './components/Sidebar';
import ToolboxForm from './components/ToolboxForm';
import TaskArrangementForm from './components/AnchoragePreForm';
import RecordsViewer from './components/ViewToolbox';
import { jwtDecode } from "jwt-decode"
import AnchorageViewer from './components/ViewAnchorform';
import MassSafetyForm from './components/Masssafetyform';
import MassViewer from './components/ViewMasssafety';
import FeedItemForm from './components/CreateFeed';
import './css/App.css';
import { ToastProvider } from 'react-toast-notifications';


const Layout = () => {
  const location = useLocation();

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" />;
  };

  const SupervisorProtectedRoute = ({ children }) => {
    return isAuthenticated() && isSupervisor() ? children : <Navigate to="/HomePage" />;
  };
  
  const isSupervisor = () => {
    const role = localStorage.getItem('role');
    return role === 'supervisor';
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
      <Container fluid className="layout-container">
      <Row className="flex-grow-1"> {/* Ensures the row fills the height */}
        {location.pathname !== '/' && 
          <Col xs={12} md={3}> {/* Adjust size as needed */}
            <Sidebarr />
          </Col>
        }

        <Col xs={12} md={location.pathname !== '/' ? 9 : 12}>
          <div className="content-container">
            <Routes>
            <Route path="/" element={<LoginPage />} />
              <Route path="/HomePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/ToolboxCreate" element={<ProtectedRoute><ToolboxForm /></ProtectedRoute>} />
              <Route path="/ToolboxView" element={<ProtectedRoute><RecordsViewer /></ProtectedRoute>} />
              <Route path="/AnchorView" element={<ProtectedRoute><AnchorageViewer /></ProtectedRoute>} />
              <Route path="/AnchoragePreForm" element={<ProtectedRoute><TaskArrangementForm /></ProtectedRoute>} />
              <Route path="/MassSafetyForm" element={<ProtectedRoute><MassSafetyForm /></ProtectedRoute>} />
              <Route path="/MassSafetyView" element={<ProtectedRoute><MassViewer/></ProtectedRoute>} />
              <Route path="/CreateFeeditem" element={<SupervisorProtectedRoute><FeedItemForm/></SupervisorProtectedRoute>} />
            </Routes>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

function App() {

return (
  <ToastProvider>
  <Router>
      <Layout />
  </Router>
  </ToastProvider>
);
}

export default App;


