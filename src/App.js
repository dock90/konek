import React from 'react';
import styled from 'styled-components';
import { auth } from './firebase';

// layout components
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: Roboto, Oxygen, Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const authToken = auth;

console.log('Auth: ', auth);

const App = () => (
  <AppWrapper>
    {authToken ? (
      <DashboardLayout authToken={authToken} />
    ) : (
      <AuthLayout authToken={authToken} />
    )}
  </AppWrapper>
);

export default App;
