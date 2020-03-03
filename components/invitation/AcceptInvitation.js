import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ACCEPT_INVITATION_MUTATION } from "../../queries/InvitationQueries";
import { TextField, Button, Grid, CircularProgress } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { useRouter } from "next/router";
import { ROOMS_QUERY } from "../../queries/RoomQueries";

const AcceptInvitation = props => {
  const router = useRouter();
  const [code, setCode] = useState(props.code ? props.code : "");
  const [errorMessage, setErrorMessage] = useState("");
  const [doAccept, { loading }] = useMutation(ACCEPT_INVITATION_MUTATION, {
    refetchQueries: [
      // They likely have access to more groups/etc, so we'll re-load them.
      { query: ROOMS_QUERY }
    ]
  });

  const handleChange = e => {
    setCode(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await doAccept({
      variables: { code }
    });
    if (!res.data.acceptInvitation) {
      setErrorMessage("Invalid invitation code");
      return;
    }
    setCode("");
    // TODO: There would probably be a better way to do this... There should be some indication of success.
    router.push("/");
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            required
            label="Invitation Code"
            value={code}
            onChange={handleChange}
            disabled={loading}
            error={!!errorMessage}
            helperText={errorMessage}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button
            type="submit"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress style={{ width: 20, height: 20 }} />
              ) : (
                <Email />
              )
            }
            color="primary"
          >
            Accept
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AcceptInvitation;
