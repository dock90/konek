import React from 'react';
import styled from 'styled-components';

// styles
const Layout = styled.div`
  grid-area: main;
  background: #f4f6f8;
`;

const ProfileContainer = () => (
  <Layout>
    <h1>PROFILE</h1>
  </Layout>
);

export default ProfileContainer;
