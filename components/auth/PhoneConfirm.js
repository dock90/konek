import PropTypes from "prop-types";
import styled from "styled-components";
import { firebase, auth } from "../../config/firebase";
import { H1 } from "../styles/Typography";
import { StyledTextField } from "../material/StyledTextField";
import { useState } from "react";
import { BigButton } from "../styles/Button";
import { useRouter } from "next/router";

const ConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const PhoneConfirm = ({ verificationId }) => {
  const [code, setCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSetCode = e => {
    setCode(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth.signInWithCredential(credential);
    } catch (e) {
      setError("Invalid verification code. Please try again.");
      setProcessing(false);
      return;
    }

    if (router.query.name) {
      try {
        await auth.currentUser.updateProfile({
          displayName: decodeURIComponent(router.query.name),
        });
      } catch (e) {
        console.log("Error updating profile name.", e);
      }
    }

    let target = "/";
    if (router.query.target) {
      target = decodeURIComponent(router.query.target);
    }
    await router.push(target);
  };

  return (
    <ConfirmWrapper>
      <H1>Phone Confirmation</H1>
      <Form onSubmit={handleSubmit}>
        <p>
          A verification code will be sent to your phone. Please enter it below.
        </p>
        <StyledTextField
          label="Verification Code"
          name="code"
          margin="normal"
          required
          value={code}
          onChange={handleSetCode}
          disabled={processing}
          error={!!error}
          helperText={error}
        />
        <BigButton disabled={processing} type="submit" primary>
          Complete Sign In
        </BigButton>
      </Form>
    </ConfirmWrapper>
  );
};

PhoneConfirm.propTypes = {
  verificationId: PropTypes.string.isRequired
};

export default PhoneConfirm;
