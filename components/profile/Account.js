import { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { auth } from "../../config/firebase";
// material
import { Card, CardContent, TextField, Grid } from "@material-ui/core";

// components
import Password from "./Password";
// graphql
import { ME_QUERY, UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// styles
import Button from "../styles/Button";
import { H4, H6, BodyText } from "../styles/Typography";
import AvatarUpload from "../assets/AvatarUpload";
import Loading from "../Loading";
import GridInputs from "../contact/GridInputs";

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

  const handleGridChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
    setProfileChanged({
      ...profileChanged,
      [field]: value
    });
  };

  const handleUpload = async info => {
    await updateMeMutation({
      variables: {
        picture: {
          format: info.format,
          publicId: info.public_id,
          resourceType: info.resource_type,
          type: info.type,
          originalFilename: info.original_filename
        }
      }
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const {emails, phones} = profileChanged;
    if (emails) {
      const fbUser = auth.currentUser;
      const email = emails[0].email;

      if (email && fbUser.email !== email) {
        try {
          await fbUser.updateEmail(email);
          console.log("FB User Email Update Success - ", email);
        } catch (e) {
          console.log("FB User Email Update Fail");
          console.log(error);
          return;
        }
      }

      for (const e of emails) {
        // This field needs deleted otherwise graphql screams when saving.
        delete e.__typename;
      }
    }
    if (phones) {
      for (const p of phones) {
        delete p.__typename;
      }
    }

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
              picture={me.picture}
              avatarType="profile"
              folder={me.assetFolderId}
              onSuccess={handleUpload}
            />
            <H4>{profile.name}</H4>
            {profile.city && (
              <H6>{`${profile.city}, ${profile.state || ""}`}</H6>
            )}
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
                  <Grid item xs={12} lg={6}>
                    <GridInputs
                      onChange={v => handleGridChange("emails", v)}
                      columns={[
                        { label: "Email", name: "email" },
                        { label: "Label", name: "label" }
                      ]}
                      value={profile.emails || []}
                      rowOneLabel="Login Email"
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <GridInputs
                      onChange={v => handleGridChange("phones", v)}
                      columns={[
                        { label: "Phone Number", name: "number", required: true },
                        { label: "Label", name: "label" }
                      ]}
                      value={profile.phones || []}
                    />
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
        <Password />
      </Grid>
    </Grid>
  );
};

export default Account;
export { ME_QUERY };
export { UPDATE_ME_MUTATION };
