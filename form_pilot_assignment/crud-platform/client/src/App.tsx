import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { CrudProvider } from './context/CrudContext';

// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ApiKeyManager from './components/ApiKeyManager';
import ApiDemo from './components/ApiDemo';
import EmailSetup from './components/EmailSetup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CrudProvider>
        <Router>
          <div className="App">
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/callback" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/api-keys" element={
                  <ProtectedRoute>
                    <ApiKeyManager />
                  </ProtectedRoute>
                } />
                <Route path="/api-demo" element={
                  <ProtectedRoute>
                    <ApiDemo />
                  </ProtectedRoute>
                } />
                <Route path="/email-setup" element={<EmailSetup />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CrudProvider>
    </AuthProvider>
  );
}

export default App; 