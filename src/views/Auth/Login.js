import React from 'react';
import PropTypes from 'prop-types';
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

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = ({ history }) => {
  const [state, setState] = React.useState({
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
      .then(authUser => {
        // TODO: remove temp store user id in localstorage to immitate login
        console.log('Login Success');
        localStorage.setItem('AUTH_TOKEN', authUser.user.uid);
        history.push(`/timeline`);
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

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
