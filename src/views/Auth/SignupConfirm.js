import React from 'react';
import styled from 'styled-components';

// components
import { H1, H3 } from '../../components/Typography';

// styles
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 400px;
`;

const SignupConfirm = () => (
  <Layout>
    <SignupWrapper>
      <H1>Thanks for signing up!</H1>
      <H3>Check your email for a confirmation to activate your account.</H3>
    </SignupWrapper>
  </Layout>
);

export default SignupConfirm;
