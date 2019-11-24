import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// material
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { auth } from '../../firebase';
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

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const Signup = ({ history }) => {
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
          .then(authUser => {
            console.log('authUser Data: ', authUser);
            history.push(`/auth/confirm`);
          })
          .catch(error => {
            console.log('Signup Error: ', error);
          })
      : console.log('TOO BAD SAUSAGE');
  };

  // TODO: setup mutations for signup

  return (
    <Layout>
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
        <Link
          to="/auth/login"
          style={{
            textDecoration: 'none',
          }}
        >
          Have an account?
        </Link>
      </SignupWrapper>
    </Layout>
  );
};

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
