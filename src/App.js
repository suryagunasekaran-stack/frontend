import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import AppRoutes from './components/AppRoutes';
import { ToastProvider } from 'react-toast-notifications';
import Sidebaru from './components/Sideubaru';
import CircleButton from './components/MenuCustom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Overlay = ({ onClick }) => {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
          zIndex: 99
        }}
        onClick={onClick}
      ></div>
    );
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          {localStorage.getItem('token') && <CircleButton onClick={toggleSidebar} isOpen={isSidebarOpen} />}
          
          {isSidebarOpen && <Overlay onClick={() => setIsSidebarOpen(false)} />}
          
          <Sidebaru isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          <AppRoutes toggleSidebar={toggleSidebar} />
        </Router>
      </ToastProvider>
    </AuthProvider>

  );
}

export default App;
