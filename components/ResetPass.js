import Router from 'next/router';
import styled from 'styled-components';
// components
import { H1, H5 } from './styles/Typography';
import AuthLayout from './styles/AuthLayout';
import { StyledTextField } from './material/StyledTextField';
import {BigButton} from "./styles/Button";

// styles
const ResetPassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const ResetPass = () => {
  const handleResetPass = () => {
    Router.push('/auth/reset-confirm');
  };
  return (
    <AuthLayout>
      <ResetPassWrapper>
        <H1>Reset Password</H1>
        <H5>Forgot your password? No problem!</H5>
        <StyledTextField
          id="outlined-basic"
          label="Email"
          margin="normal"
          variant="outlined"
        />
        <BigButton onClick={handleResetPass} variant="contained" primary>
          Reset
        </BigButton>
      </ResetPassWrapper>
    </AuthLayout>
  );
};

export default ResetPass;
