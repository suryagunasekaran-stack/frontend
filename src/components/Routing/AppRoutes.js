import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute, SupervisorProtectedRoute } from '../Routing/ProtectedRoutes';
import LoginPage from '../MainPages/LoginPage';
import HomePage from '../MainPages/HomePage';
import AnchorageViewer from '../Views/ViewAnchorform';
import MassSafetyForm from '../Forms/Masssafetyform';
import MassViewer from '../Views/ViewMasssafety';
import FeedItemForm from '../Forms/CreateFeed';
import ToolboxForm from '../Forms/ToolboxForm';
import TaskArrangementForm from '../Forms/AnchoragePreForm';
import ViewToolbox from '../Views/ViewToolbox';
import ExcelUploadComponent from '../Forms/IpcForm';
// ... other component imports

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
              <Route path="/HomePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/ToolboxCreate" element={<ProtectedRoute><ToolboxForm /></ProtectedRoute>} />
              <Route path="/ToolboxView" element={<ProtectedRoute><ViewToolbox /></ProtectedRoute>} />
              <Route path="/AnchorView" element={<ProtectedRoute><AnchorageViewer /></ProtectedRoute>} />
              <Route path="/AnchoragePreForm" element={<ProtectedRoute><TaskArrangementForm /></ProtectedRoute>} />
              <Route path="/MassSafetyForm" element={<ProtectedRoute><MassSafetyForm /></ProtectedRoute>} />
              <Route path="/MassSafetyView" element={<ProtectedRoute><MassViewer/></ProtectedRoute>} />
              <Route path="/CreateFeeditem" element={<SupervisorProtectedRoute><FeedItemForm/></SupervisorProtectedRoute>} />
              <Route path="/ipc" element={<SupervisorProtectedRoute><ExcelUploadComponent/></SupervisorProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
