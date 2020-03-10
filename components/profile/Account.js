import { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { ME_QUERY, UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// material
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// components
import { H4, H6, BodyText } from "../styles/Typography";
import AvatarUpload from "../assets/AvatarUpload";
import Loading from "../Loading";

const Account = () => {
  const [profile, setProfile] = useState();
  const [profileChanged, setProfileChanged] = useState({});
  const { data, loading, error } = useQuery(ME_QUERY);
  const [updateMeMutation, { loading: mutationLoading }] = useMutation(
    UPDATE_ME_MUTATION
  );

  if (loading) return <Loading />;
  if (error) return <span>{error}</span>;

  const me = data.me;

  if (!profile && me) {
    setProfile(me);
    return <Loading />;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value
    });
    setProfileChanged({
      ...profileChanged,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await updateMeMutation({
      variables: {
        ...profileChanged
      }
    });
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 16, maxWidth: 1200 }}>
      <Grid item xs={12} sm={8} md={4} lg={3}>
        <Card
          style={{
            maxWidth: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center"
            }}
          >
            <AvatarUpload
              size={60}
              avatarType="profile"
              folder={me.assetFolderId}
            />
            <H4>{profile.name}</H4>
            {profile.city && (
              <H6>{`${profile.city}, ${profile.state || ""}`}</H6>
            )}
            <BodyText>Managing Director</BodyText>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={9}>
        <Card style={{ marginBottom: 14 }}>
          <CardContent>
            <H4>Account Information</H4>
            <form onSubmit={handleSubmit}>
              <fieldset
                disabled={mutationLoading}
                aria-busy={mutationLoading}
                style={{
                  border: "none",
                  margin: 0
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      required
                      value={profile.name || ""}
                      onChange={handleChange}
                      variant="outlined"
                      style={{
                        marginRight: 12,
                        marginBottom: 12,
                        width: "50%"
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/*/!* TODO: update to handle list of emails *!/*/}
                    {/*<TextField*/}
                    {/*  id="email"*/}
                    {/*  name="email"*/}
                    {/*  label="Email"*/}
                    {/*  defaultValue={email}*/}
                    {/*  onChange={handleEmailChange}*/}
                    {/*  variant="outlined"*/}
                    {/*  style={{ marginRight: 12, marginBottom: 12 }}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*  id="phone"*/}
                    {/*  name="phone"*/}
                    {/*  label="Phone"*/}
                    {/*  defaultValue={number}*/}
                    {/*  onChange={handlePhoneChange}*/}
                    {/*  variant="outlined"*/}
                    {/*  style={{ marginRight: 12, marginBottom: 12 }}*/}
                    {/*/>*/}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="city"
                      name="city"
                      label="City"
                      value={profile.city || ""}
                      onChange={handleChange}
                      variant="outlined"
                      style={{ marginRight: 12, marginBottom: 12 }}
                    />
                    <TextField
                      id="state"
                      name="state"
                      label="State"
                      value={profile.state || ""}
                      onChange={handleChange}
                      variant="outlined"
                      style={{ marginRight: 12, marginBottom: 12 }}
                    />
                    <TextField
                      id="postalCode"
                      name="postalCode"
                      value={profile.postalCode || ""}
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
                      value={profile.country || ""}
                      onChange={handleChange}
                      label="Country"
                      variant="outlined"
                      style={{ marginRight: 12, marginBottom: 12 }}
                    />
                    <TextField
                      id="language"
                      name="language"
                      value={profile.language || ""}
                      onChange={handleChange}
                      label="Primary Language"
                      variant="outlined"
                      style={{ marginRight: 12, marginBottom: 12 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      style={{ background: "#4CAF50", color: "#FFF" }}
                    >
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </fieldset>
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
                  <Button style={{ background: "#4CAF50", color: "#FFF" }}>
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
};

export default Account;
export { ME_QUERY };
export { UPDATE_ME_MUTATION };
