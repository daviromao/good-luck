import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const MyRoutes: React.FC = () => {
  const { signed } = useAuth();
  return (
    <BrowserRouter>{signed ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
};

export default MyRoutes;
