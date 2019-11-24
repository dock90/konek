import React from 'react';
import styled from 'styled-components';

// layout components
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: Roboto, Oxygen, Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

// TODO: subscribe to backend for auth changes
// TODO: remove temp localStorage test
const authToken = localStorage.getItem('AUTH_TOKEN');

const App = () => (
  <AppWrapper>{authToken ? <DashboardLayout /> : <AuthLayout />}</AppWrapper>
);

export default App;
