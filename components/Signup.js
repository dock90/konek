import React from 'react';
import Router from 'next/router'
import Link from 'next/link'
import styled from 'styled-components';
// material
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { auth } from '../firebase';
// components
import { H1 } from './styles/Typography';
import AuthLayout from './styles/AuthLayout'
import { StyledButton } from './StyledButton';
import { StyledTextField } from './StyledTextField';

// styles
const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const Signup = () => {
  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptedTerms: false,
  });

  const handleTermsChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleSubmit = () => {
    // TODO: better email validation
    // TODO: better password validation
    const email = state.email.length > 0;
    const password = state.password.length > 0;
    email && password
      ? auth
        .createUserWithEmailAndPassword(state.email, state.password)
        .then(() => {
          Router.push(`/auth/confirm`);
        })
        .catch(error => {
          console.log('Signup Error: ', error);
        })
      : console.log('TOO BAD SAUSAGE');
  };

  return (
    <AuthLayout>
      <SignupWrapper>
        <H1>Sign Up</H1>
        <StyledTextField
          id="outlined-basic"
          label="First Name"
          margin="normal"
          variant="outlined"
          value={state.firstName}
          onChange={handleChange('firstName')}
        />
        <StyledTextField
          id="outlined-basic"
          label="Last Name"
          margin="normal"
          variant="outlined"
          value={state.lastName}
          onChange={handleChange('lastName')}
        />
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
        <FormGroup row style={{ marginBottom: 20 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.acceptedTerms}
                onChange={handleTermsChange('acceptedTerms')}
                value="acceptedTerms"
              />
            }
            label="I have read the Terms and Conditions"
          />
        </FormGroup>
        <StyledButton
          disabled={!state.acceptedTerms}
          onClick={handleSubmit}
          variant="contained"
        >
          Sign Up
        </StyledButton>
        <Divider style={{ marginBottom: 15 }} />
        <Link href="/auth/login">
          <a>Have an account?</a>
        </Link>
      </SignupWrapper>
    </AuthLayout>
  );
};

export default Signup;
