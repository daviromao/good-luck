import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { AuthProvider } from './contexts/AuthContext';
import environment from './relay/relayEnviroment';
import MyRoutes from './routes';

function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <MyRoutes />
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
