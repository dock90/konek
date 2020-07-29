import { useRouter } from 'next/router';
import styled from 'styled-components';
// components
import { H1, H5 } from '../styles/Typography';
import { TextField } from '../styles/TextField';
import { BigButton } from '../styles/Button';
import { useState } from 'react';
import { auth } from '../../config/firebase';

// styles
const ResetPassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleResetPass = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (e) {
      setError(e.message);
      return;
    }
    await router.push('/auth/reset-confirm');
  };

  return (
    <ResetPassWrapper>
      <H1>Reset Password</H1>
      <H5>Forgot your password? No problem!</H5>
      <TextField
        label="Email"
        name="email"
        margin="normal"
        error={!!error}
        helperText={error}
        onChange={handleEmailChange}
      />
      <BigButton onClick={handleResetPass} primary>
        Reset
      </BigButton>
    </ResetPassWrapper>
  );
};

export default ResetPass;
