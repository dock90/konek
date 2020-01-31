import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
// material
import Divider from '@material-ui/core/Divider';
// firebase
import { auth } from '../firebase';
// components
import { H1 } from './styles/Typography';
import AuthLayout from './styles/AuthLayout';
import { StyledButton } from './material/StyledButton';
import { StyledTextField } from './material/StyledTextField';

// styles
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        Router.push('/');
      })
      .catch(error => console.log('Error Loggin In: ', error));
    // TODO: add better error handling
    // TODO: alert users on errors in ui
  };

  return (
    <AuthLayout>
      <LoginWrapper>
        <H1>Login</H1>
        <FormWrapper onSubmit={event => handleSubmit(event)}>
          <StyledTextField
            id="outlined-basic"
            label="Email"
            margin="normal"
            variant="outlined"
            value={state.email}
            onChange={handleChange('email')}
          />
          <StyledTextField
            id="outlined-basic"
            label="Password"
            margin="normal"
            type="password"
            variant="outlined"
            value={state.password}
            onChange={handleChange('password')}
          />
          <StyledButton variant="contained" type="submit">
            Login
          </StyledButton>
        </FormWrapper>
        <Divider style={{ marginBottom: 15 }} />
        <Actions>
          <Link href="/auth/signup">
            <a>Need an account?</a>
          </Link>
          <Link href="/auth/reset">
            <a>Forgot password?</a>
          </Link>
        </Actions>
      </LoginWrapper>
    </AuthLayout>
  );
};

export default Login;
