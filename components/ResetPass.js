import styled from 'styled-components';
// components
import { H1, H5 } from './styles/Typography';
import AuthLayout from './styles/AuthLayout'
import { StyledButton } from './StyledButton';
import { StyledTextField } from './StyledTextField';

// styles
const ResetPassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 350px;
`;

const ResetPass = () => (
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
      <StyledButton variant="contained">Reset</StyledButton>
    </ResetPassWrapper>
  </AuthLayout>
);

export default ResetPass;
