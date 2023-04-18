import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

type AppProviderProps = React.PropsWithChildren;

const AppProvider: React.FC<AppProviderProps> = ({
  children,
}: AppProviderProps) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
