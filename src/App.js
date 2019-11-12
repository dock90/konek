import React from 'react';
import styled from 'styled-components';

// layout components
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
`;
const authToken = false;

const App = () => (
  <AppWrapper>{authToken ? <DashboardLayout /> : <AuthLayout />}</AppWrapper>
);

export default App;
