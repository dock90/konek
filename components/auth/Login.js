import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// material
import Divider from "@material-ui/core/Divider";
// firebase
import { auth } from "../../config/firebase";
// components
import { H1 } from "../styles/Typography";
import { StyledTextField } from "../material/StyledTextField";
import { BigButton } from "../styles/Button";

// styles
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

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setError("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(state.email, state.password);
    } catch (e) {
      // TODO: add better error handling
      // TODO: alert users on errors in ui
      console.log("Error Logging In: ", e);
      setError(e.message);
      return;
    }

    let target = "/";
    if (router.query.target) {
      target = decodeURIComponent(router.query.target);
    }
    await router.push(target);
  };

  return (
    <LoginWrapper>
      <H1>Login</H1>
      <FormWrapper onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <StyledTextField
          label="Password"
          name="password"
          margin="normal"
          type="password"
          value={state.password}
          onChange={handleChange}
          error={!!error}
          helperText={error}
        />
        <BigButton primary variant="contained" type="submit">
          Login
        </BigButton>
      </FormWrapper>
      <Divider style={{ marginBottom: 15 }} />
      <Actions>
        <Link href={{ pathname: "/auth/signup", query: router.query }}>
          <a>Need an account?</a>
        </Link>
        <Link href={{ pathname: "/auth/reset", query: router.query }}>
          <a>Forgot password?</a>
        </Link>
      </Actions>
    </LoginWrapper>
  );
};

export default Login;
