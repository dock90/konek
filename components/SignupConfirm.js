import styled from 'styled-components';
// components
import AuthLayout from './styles/AuthLayout';
import { H1, H3 } from './styles/Typography';

// styles
const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 400px;
`;

const SignupConfirm = () => (
  <AuthLayout>
    <SignupWrapper>
      <H1>Thanks for signing up!</H1>
      <H3>Check your email for a confirmation to activate your account.</H3>
    </SignupWrapper>
  </AuthLayout>
);

export default SignupConfirm;
