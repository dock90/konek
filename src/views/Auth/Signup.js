import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// material
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const Signup = () => {
  const [state, setState] = React.useState({
    acceptedTerms: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Layout>
      <SignupWrapper>
        <H1>Sign Up</H1>
        <StyledTextField
          id="outlined-basic"
          label="First Name"
          margin="normal"
          variant="outlined"
        />
        <StyledTextField
          id="outlined-basic"
          label="Last Name"
          margin="normal"
          variant="outlined"
        />
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
        <FormGroup row style={{ marginBottom: 20 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.acceptedTerms}
                onChange={handleChange('acceptedTerms')}
                value="acceptedTerms"
              />
            }
            label="I have read the Terms and Conditions"
          />
        </FormGroup>
        <StyledButton variant="contained">Sign Up</StyledButton>
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

export default Signup;
