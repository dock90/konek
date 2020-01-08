import React from 'react';
// material
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// components
import { H4, H6, BodyText } from '../../components/Typography';

const Account = () => (
  <Grid container spacing={2} style={{ marginTop: 16, maxWidth: 1200 }}>
    <Grid item xs={12} sm={8} md={4} lg={3}>
      <Card
        style={{
          maxWidth: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt="User Profile Image"
            src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/profile.png"
            style={{
              height: 60,
              width: 60,
            }}
          />
          <H4>Aaron Beiler</H4>
          <H6>Lancaster, Pennsylvania</H6>
          <BodyText>Manging Director</BodyText>
        </CardContent>
        <CardActions>
          <Button>Upload Photo</Button>
        </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={10} md={8} lg={9}>
      <Card style={{ marginBottom: 14 }}>
        <CardContent>
          <H4>Account Information</H4>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Location"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Primary Language"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button style={{ background: '#4CAF50', color: '#FFF' }}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <H4>Change Password</H4>
          <form>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
                <TextField
                  id="outlined-basic"
                  label="New Password"
                  variant="outlined"
                  style={{ marginRight: 12, marginBottom: 12 }}
                />
              </Grid>
              <Grid item>
                <Button style={{ background: '#4CAF50', color: '#FFF' }}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default Account;
