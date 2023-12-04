import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignoutPage from './components/SignoutPage';
import HomePage from './components/HomePage';


function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/HomePage" element={<HomePage />} />
  </Routes>
</BrowserRouter>

  );
}

export default App;


