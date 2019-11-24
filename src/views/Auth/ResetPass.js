import React from 'react';
import styled from 'styled-components';
// components
import { H1, H5 } from '../../components/Typography';
import { StyledButton } from '../../components/StyledButton';
import { StyledTextField } from '../../components/StyledTextField';

// styles
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ResetPassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const ResetPass = () => (
  <Layout>
    <ResetPassWrapper>
      <H1>Reset Password</H1>
      <H5>Forgot your password? No problem!</H5>
      <StyledTextField
        id="outlined-basic"
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <StyledButton variant="contained">Reset</StyledButton>
    </ResetPassWrapper>
  </Layout>
);

export default ResetPass;
