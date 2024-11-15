import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';
import ChildDashboard from './pages/child/Dashboard';
import NotFound from './pages/NotFound';

// Theme
import theme from './theme';

// Context
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<Login adminMode />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<MainLayout />}>
                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />
                
                {/* Parent Routes */}
                <Route path="/parent/*" element={<ParentDashboard />} />
                
                {/* Child Routes */}
                <Route path="/child/*" element={<ChildDashboard />} />
              </Route>

              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;