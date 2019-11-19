import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// material
import Divider from '@material-ui/core/Divider';
// components
import { H1 } from '../../components/Typography';
import { StyledButton } from '../../components/StyledButton';
import { StyledTextField } from '../../components/StyledTextField';

// styles
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => (
  <Layout>
    <LoginWrapper>
      <H1>Login</H1>
      <StyledTextField
        id="outlined-basic"
        label="Email"
        margin="normal"
        variant="outlined"
      />
      <StyledTextField
        id="outlined-basic"
        label="Password"
        margin="normal"
        variant="outlined"
      />
      <StyledButton variant="contained">Login</StyledButton>
      <Divider style={{ marginBottom: 15 }} />
      <Actions>
        <Link
          to="/auth/signup"
          style={{
            textDecoration: 'none',
          }}
        >
          Need an account?
        </Link>
        <Link
          to="/auth/reset"
          style={{
            textDecoration: 'none',
          }}
        >
          Forgot password?
        </Link>
      </Actions>
    </LoginWrapper>
  </Layout>
);

export default Login;
