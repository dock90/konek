import { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { ME_QUERY, UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// material
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// components
import { H4, H6, BodyText } from '../styles/Typography';

const Account = () => {
  const [profile, setProfile] = useState({});

  const handleChange = event => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleEmailChange = event => {
    setProfile({
      ...profile,
      emails: {
        email: event.target.value,
      },
    });
  };

  const handlePhoneChange = event => {
    setProfile({
      ...profile,
      phones: {
        number: event.target.value,
      },
    });
  };

  const handleSubmit = (event, updateMeMutation, name) => {
    event.preventDefault();
    updateMeMutation({
      variables: {
        name,
        ...profile,
      },
    });
  };

  return (
    <Query query={ME_QUERY}>
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const {
          me: {
            name,
            emails,
            phones,
            city,
            state,
            postalCode,
            country,
            language,
          },
        } = data;

        const email = emails ? emails[0].email : '';
        const number = phones ? phones[0].number : '';

        return (
          <Mutation mutation={UPDATE_ME_MUTATION} variables={profile}>
            {(updateMe, { loading, error }) => (
              <Grid
                container
                spacing={2}
                style={{ marginTop: 16, maxWidth: 1200 }}
              >
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
                      <H4>{profile.name || name}</H4>
                      {(profile.city || city) && (
                        <H6>{`${profile.city || city}, ${profile.state ||
                          state}`}</H6>
                      )}
                      <BodyText>Managing Director</BodyText>
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
                      <fieldset
                        disabled={loading}
                        aria-busy={loading}
                        style={{
                          border: 'none',
                          margin: 0,
                        }}
                      >
                        <form
                          onSubmit={event =>
                            handleSubmit(event, updateMe, name)
                          }
                        >
                          <Grid container>
                            <Grid item xs={12}>
                              <TextField
                                id="name"
                                name="name"
                                label="Name"
                                required
                                defaultValue={name}
                                onChange={handleChange}
                                variant="outlined"
                                style={{
                                  marginRight: 12,
                                  marginBottom: 12,
                                  width: '50%',
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              {/* TODO: update to handle list of emails */}
                              <TextField
                                id="email"
                                name="email"
                                label="Email"
                                defaultValue={email}
                                onChange={handleEmailChange}
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                              <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                defaultValue={number}
                                onChange={handlePhoneChange}
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id="city"
                                name="city"
                                label="City"
                                defaultValue={city}
                                onChange={handleChange}
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                              <TextField
                                id="state"
                                name="state"
                                label="State"
                                defaultValue={state}
                                onChange={handleChange}
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                              <TextField
                                id="postalCode"
                                name="postalCode"
                                defaultValue={postalCode}
                                onChange={handleChange}
                                label="Postal Code"
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                id="country"
                                name="country"
                                defaultValue={country}
                                onChange={handleChange}
                                label="Country"
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                              <TextField
                                id="language"
                                name="language"
                                defaultValue={language}
                                onChange={handleChange}
                                label="Primary Language"
                                variant="outlined"
                                style={{ marginRight: 12, marginBottom: 12 }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                style={{ background: '#4CAF50', color: '#FFF' }}
                              >
                                Save Changes
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </fieldset>
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
                            <Button
                              style={{ background: '#4CAF50', color: '#FFF' }}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default Account;
export { ME_QUERY };
export { UPDATE_ME_MUTATION };
