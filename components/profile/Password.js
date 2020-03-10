import { useState } from "react";
// material
import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import Button from "../styles/Button";
import { auth } from "../../config/firebase";
import { H4 } from "../styles/Typography";
import { ErrorMessage } from "../styles/Messages";

const Password = () => {
  const [password, setPassword] = useState({
    pass: "",
    newPass: ""
  });
  const [error, setError] = useState({ noMatch: "" });
  const { pass, newPass } = password;
  const { noMatch } = error;

  const handleChange = event => {
    const { name, value } = event.target;
    setPassword({
      ...password,
      [name]: value
    });
    setError({ noMatch: "" });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const fbUser = auth.currentUser;
    if (pass === newPass) {
      fbUser
        .updatePassword(pass)
        .then(() => {
          console.log("Password Change Success");
        })
        .catch(error => {
          console.log("Password Change Error");
          console.log(error);
        });
      setPassword({
        pass: "",
        newPass: ""
      });
      setError({
        noMatch: ""
      });
    } else {
      setError({ noMatch: "Passwords do not match" });
    }
  };

  return (
    <Card>
      <CardContent>
        <H4>Change Password</H4>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                id="pass"
                label="Password"
                name="pass"
                onChange={handleChange}
                style={{ marginRight: 12, marginBottom: 12 }}
                type="password"
                value={pass}
                variant="outlined"
              />
              <TextField
                id="newPass"
                label="New Password"
                name="newPass"
                onChange={handleChange}
                style={{ marginRight: 12, marginBottom: 12 }}
                type="password"
                value={newPass}
                variant="outlined"
              />
            </Grid>
            {noMatch ? (
              <Grid item xs={12}>
                <ErrorMessage>{noMatch}</ErrorMessage>
              </Grid>
            ) : null}
            <Grid item>
              <Button primary type="submit">
                Update Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Password;
