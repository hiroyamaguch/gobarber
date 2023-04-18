import React from 'react';
import { Routes as RouterDomRoutes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <RouterDomRoutes>
    <Route path="/" Component={SignIn} />
    <Route path="/signup" Component={SignUp} />
    <Route path="/forgot-password" Component={ForgotPassword} />
    <Route path="/reset-password" Component={ResetPassword} />

    <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
    <Route
      path="/dashboard"
      element={<ProtectedRoute component={Dashboard} />}
    />
  </RouterDomRoutes>
);

export default Routes;
