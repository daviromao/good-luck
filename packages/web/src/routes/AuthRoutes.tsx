import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default AuthRoutes;
