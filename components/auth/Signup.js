import { useState } from 'react';
import Link from 'next/link';
// material
import { Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';

// components
import { H1 } from '../styles/Typography';
import { StyledTextField } from '../material/StyledTextField';
import AuthFields, { MODE_SIGN_UP } from './AuthFields';

const Signup = () => {
  const [state, setState] = useState({
    name: '',
    acceptedTerms: false,
  });

  const handleNameChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const handleTermsChange = (e) => {
    setState({ ...state, acceptedTerms: e.target.checked });
  };

  return (
    <AuthFields
      mode={MODE_SIGN_UP}
      valid={state.acceptedTerms}
      name={state.name}
      prefix={(processing) => (
        <>
          <H1>Sign Up</H1>
          <StyledTextField
            label="Name"
            name="name"
            margin="normal"
            value={state.lastName}
            onChange={handleNameChange}
            disabled={processing}
          />
        </>
      )}
      infix={(processing) => (
        <FormGroup row style={{ marginBottom: 10, marginTop: -10 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="acceptedTerms"
                checked={state.acceptedTerms}
                onChange={handleTermsChange}
                value="acceptedTerms"
                disabled={processing}
                required
              />
            }
            label="I have read the Terms and Conditions"
          />
        </FormGroup>
      )}
      suffix={
        <Link href="/auth/login">
          <a>Have an account?</a>
        </Link>
      }
    />
  );
};

export default Signup;
