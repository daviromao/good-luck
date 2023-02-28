import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/app"
        element={
          <>
            <h1>APP</h1>
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
