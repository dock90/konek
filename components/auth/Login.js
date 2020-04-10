import React  from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

// components
import { H1 } from "../styles/Typography";
import AuthFields, { MODE_LOG_IN } from "./AuthFields";

// styles

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Login = () => {
  const router = useRouter();

  return (
    <AuthFields
      mode={MODE_LOG_IN}
      prefix={() => <H1>Login</H1>}
      valid
      suffix={
        <Actions>
          <Link href={{ pathname: "/auth/signup", query: router.query }}>
            <a>Need an account?</a>
          </Link>
          <Link href={{ pathname: "/auth/reset", query: router.query }}>
            <a>Forgot password?</a>
          </Link>
        </Actions>
      }
    />
  );
};

export default Login;
