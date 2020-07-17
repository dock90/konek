// hooks
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAcceptInvitation } from '../../hooks/useAcceptInvitation';
// components
import { TextField, Button, Grid, CircularProgress } from '@material-ui/core';
import { Email } from '@material-ui/icons';

const AcceptInvitation = (props) => {
  const router = useRouter();
  const [code, setCode] = useState(props.code ? props.code : '');
  const [errorMessage, setErrorMessage] = useState('');
  const [doAccept, { loading }] = useAcceptInvitation();

  const handleChange = (e) => {
    setCode(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await doAccept({
      variables: { code },
    });
    if (!res.data.acceptInvitation) {
      setErrorMessage('Invalid invitation code');
      return;
    }
    setCode('');
    // TODO: There would probably be a better way to do this... There should be some indication of success.
    router.push('/');
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
