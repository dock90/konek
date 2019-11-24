import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import { auth } from '../../firebase';
// material
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

const Login = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(state.email, state.password)
      .then(authUser => {
        console.log('Action Login: Auth User: ', authUser.user);
      })
      .catch(error => console.log('Error Loggin In: ', error));
    // TODO: setup login mutation
    // TODO: add better error handling
    // TODO: alert users on errors in ui
  };

  return (
    <Layout>
      <LoginWrapper>
        <H1>Login</H1>
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
          variant="outlined"
          value={state.password}
          onChange={handleChange('password')}
        />
        <StyledButton variant="contained" onClick={handleSubmit}>
          Login
        </StyledButton>
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
};

export default Login;
