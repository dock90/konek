import { useContext, useState } from "react";
import { MeContext } from "../../contexts/MeContext";
import { useMutation } from "@apollo/react-hooks";
import { useStateTimeout } from "../../hooks/useStateTimeout";
import { UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// material
import { Card, CardContent, Grid } from "@material-ui/core";
// styles
import { BaseButton } from "../styles/Button";
import { auth, firebase } from "../../config/firebase";
import { H4 } from "../styles/Typography";
import { StyledTextField } from "../material/StyledTextField";
import { hasEmailLogin } from "./helpers";
import { isEmailValid, isPasswordOk } from "../auth/validation";
import {
  INVALID_EMAIL,
  PASSWORD_NOT_STRONG,
  PASSWORDS_DONT_MATCH
} from "../auth/messages";
import { SuccessMessage } from "../styles/Messages";

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
    [error, setError] = useState({
      email: "",
      noMatch: "",
      invalidPassword: ""
    }),
    [processing, setProcessing] = useState(false),
    [success, setSuccess] = useStateTimeout("", 2500);

  const hasPwLogin = hasEmailLogin(auth.currentUser);

  const resetError = () => {
      setError({ email: "", noMatch: "", invalidPassword: "" });
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

  const handleSubmit = async e => {
    e.preventDefault();
    const fbUser = auth.currentUser;

    if (hasNewEmail && !isEmailValid(loginInfo.email)) {
      setError({ ...error, email: INVALID_EMAIL });
      return;
    }

    if (!hasPwLogin && hasNewEmail && !isPasswordOk(state.curPass)) {
      // We're adding an email/password to an existing login.
    }

    if (hasNewPassword && !isPasswordOk(loginInfo.pass)) {
      setError({ ...error, invalidPassword: PASSWORD_NOT_STRONG });
      return;
    }

    if (hasPwLogin && (hasNewPassword || hasNewEmail)) {
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
    } else if (!hasPwLogin) {
      setProcessing(true);
    } else {
      return;
    }

    if (hasNewPassword) {
      if (loginInfo.pass === loginInfo.newPass) {
        try {
          await fbUser.updatePassword(loginInfo.pass);
          resetLoginInfo();
          setSuccess("Password successfully updated.");
        } catch (e) {
          setProcessing(false);
          console.log("Password Change Error");
          console.log(error);
          return;
        }

        console.log("Password Change Success");
      } else {
        setProcessing(false);
        setError({ ...error, noMatch: PASSWORDS_DONT_MATCH });
        return;
      }
    } else if (hasNewEmail) {
      try {
        if (hasPwLogin) {
          await fbUser.updateEmail(loginInfo.email);
          setSuccess("Email successfully updated.");
        } else {
          const credential = new firebase.auth.EmailAuthProvider.credential(
            loginInfo.email,
            loginInfo.curPass
          );
          await auth.currentUser.linkWithCredential(credential);
          setSuccess(
            "You may not log in with the supplied email and password!"
          );
        }
        const emails = me.emails;
        emails[0].email = loginInfo.email;
        await updateMeMutation({ variables: { emails } });
      } catch (e) {
        setProcessing(false);
        switch (e.code) {
          case "auth/requires-recent-login":
          case "auth/email-already-in-use":
            setError({ ...error, email: e.message });
        }
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
        {!hasPwLogin && (
          <p>
            Supply a email address and password below to enable login to your
            account with a email address.
          </p>
        )}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                label="Login Email"
                name="email"
                value={loginInfo.email}
                onChange={handleLoginInfoChange}
                disabled={hasNewPassword || processing}
                error={!!error.email}
                helperText={error.email}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField
                label={hasPwLogin ? "Current Password" : "New Password"}
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
            {hasPwLogin && (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <StyledTextField
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
                  <StyledTextField
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
              </>
            )}
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
