import React from 'react';
import styled from 'styled-components';

// styles
const Layout = styled.div`
  grid-area: main;
  background: #f4f6f8;
`;

const SettingsContainer = () => (
  <Layout>
    <h1>SETTINGS</h1>
  </Layout>
);

export default SettingsContainer;
