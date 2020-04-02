import { useContext, useState } from "react";
import styled from "styled-components";
import { MeContext } from "../../contexts/MeContext";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// material
import { Card, CardContent, Grid, TextField } from "@material-ui/core";
// styles
import { BaseButton } from "../styles/Button";
import { auth, firebase } from "../../config/firebase";
import { H4 } from "../styles/Typography";

const StyledInput = styled(TextField).attrs({
  variant: "outlined"
})`
  width: 100%;
`;

const LoginInformation = () => {
  const me = useContext(MeContext);
  const [updateMeMutation] = useMutation(UPDATE_ME_MUTATION);

  const email = me.emails && me.emails.length > 0 ? me.emails[0].email : "";
  const [loginInfo, setLoginInfo] = useState({
      email,
      curPass: "",
      pass: "",
      newPass: ""
    }),
    [error, setError] = useState({ noMatch: "", invalidPassword: "" }),
    [processing, setProcessing] = useState(false);

  const resetError = () => {
      setError({ noMatch: "", invalidPassword: "" });
    },
    resetLoginInfo = newEmail => {
      setLoginInfo({
        email: newEmail || email,
        curPass: "",
        pass: "",
        newPass: ""
      });
      resetError();
    },
    hasNewPassword = !!(loginInfo.pass || loginInfo.newPass),
    hasNewEmail = loginInfo.email !== email;

  const handleLoginInfoChange = e => {
    const { name, value } = e.target;
    const newState = { ...loginInfo, [name]: value };
    if (name === "email" && hasNewPassword) {
      // Clear password reset.
      newState.pass = "";
      newState.newPass = "";
    }
    if (name === "pass" && hasNewEmail) {
      // Reset password if we change the email.
      newState.email = email;
    }
    setLoginInfo(newState);
    resetError();
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const fbUser = auth.currentUser;

    if (hasNewPassword || hasNewEmail) {
      setProcessing(true);
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(
          email,
          loginInfo.curPass
        );
        await fbUser.reauthenticateWithCredential(credential);
      } catch (e) {
        console.log("Unable to re-authenticate");
        console.log(e);
        setError({ ...error, invalidPassword: e.message });
        setProcessing(false);
        return;
      }
    } else {
      return;
    }

    if (hasNewPassword) {
      if (loginInfo.pass === loginInfo.newPass) {
        try {
          await fbUser.updatePassword(loginInfo.pass);
          resetLoginInfo();
        } catch (e) {
          setProcessing(false);
          console.log("Password Change Error");
          console.log(error);
          return;
        }

        console.log("Password Change Success");
      } else {
        setProcessing(false);
        setError({ ...error, noMatch: "Passwords do not match" });
        return;
      }
    } else if (hasNewEmail) {
      try {
        await fbUser.updateEmail(loginInfo.email);
        const emails = me.emails;
        emails[0].email = loginInfo.email;
        await updateMeMutation({ variables: { emails } });
      } catch (e) {
        setProcessing(false);
        console.log("Email change error");
        console.log(e);
        return;
      }
      resetLoginInfo(loginInfo.email);
    }
    setProcessing(false);
  };

  return (
    <Card>
      <CardContent>
        <H4 style={{ marginBottom: 15 }}>Login Information</H4>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledInput
                label="Login Email"
                name="email"
                value={loginInfo.email}
                onChange={handleLoginInfoChange}
                disabled={hasNewPassword | processing}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInput
                label="Current Password"
                name="curPass"
                onChange={handleLoginInfoChange}
                value={loginInfo.curPass}
                type="password"
                disabled={processing}
                required
                error={!!error.invalidPassword}
                helperText={error.invalidPassword}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInput
                label="New Password"
                name="pass"
                onChange={handleLoginInfoChange}
                type="password"
                value={loginInfo.pass}
                disabled={processing || hasNewEmail}
                required={hasNewPassword}
                error={!!error.noMatch}
                helperText={error.noMatch}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledInput
                label="Repeat Password"
                name="newPass"
                onChange={handleLoginInfoChange}
                type="password"
                value={loginInfo.newPass}
                disabled={processing || hasNewEmail}
                required={hasNewPassword}
                error={!!error.noMatch}
              />
            </Grid>
            <Grid item xs={12}>
              <BaseButton primary type="submit" disabled={processing}>
                Save Changes
              </BaseButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginInformation;
