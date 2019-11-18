import React from 'react';
import styled from 'styled-components';
// material
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// components
import { H1 } from '../../components/Typography';
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
  width: 250px;
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
      <Button variant="contained">Login</Button>
    </LoginWrapper>
  </Layout>
);

export default Login;
