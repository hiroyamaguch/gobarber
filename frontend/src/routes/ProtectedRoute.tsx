import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

type ProtectedRouteProps = {
  component: React.ComponentType;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
