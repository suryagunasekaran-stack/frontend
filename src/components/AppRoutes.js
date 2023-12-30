import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute, SupervisorProtectedRoute } from './ProtectedRoutes';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AnchorageViewer from './ViewAnchorform';
import MassSafetyForm from './Masssafetyform';
import MassViewer from './ViewMasssafety';
import FeedItemForm from './CreateFeed';
import ToolboxForm from './ToolboxForm';
import TaskArrangementForm from './AnchoragePreForm';
import RecordsViewer from './ViewToolbox';
// ... other component imports

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
