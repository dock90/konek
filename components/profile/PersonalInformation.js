import { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import { auth } from "../../config/firebase";
import { hasEmailLogin, hasPhoneLogin } from "./helpers";
// material
import { Card, CardContent, TextField, Grid } from "@material-ui/core";
// graphql
import { UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// styles
import { BaseButton } from "../styles/Button";
import { H4, H5, H6 } from "../styles/Typography";
import AvatarUpload from "../assets/AvatarUpload";
import Loading from "../Loading";
import GridInputs from "../contact/GridInputs";
import { MeContext } from "../../contexts/MeContext";

const PersonalInformation = ({ style }) => {
  const [profile, setProfile] = useState();
  const [profileChanged, setProfileChanged] = useState({});
  const me = useContext(MeContext);
  const [updateMeMutation, { loading: mutationLoading }] = useMutation(
    UPDATE_ME_MUTATION
  );

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

  const fbUser = auth.currentUser;

  const handleSubmit = async event => {
    event.preventDefault();
    const { emails, phones, name } = profileChanged;

    if (emails) {
      const email = emails[0].email;

      if (email && fbUser.email !== email) {
        try {
          await fbUser.updateEmail(email);
          console.log("FB User Email Update Success - ", email);
        } catch (e) {
          console.log("FB User Email Update Fail");
          console.log(e);
          return;
        }
      }

      for (const e of emails) {
        // This field needs deleted otherwise graphql screams when saving.
        delete e.__typename;
      }
    }
    if (name) {
      try {
        await fbUser.updateProfile({
          displayName: name
        });
      } catch (e) {
        console.log("FB User name update fail");
        console.log(e);
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
    <Card style={style}>
      <CardContent>
        <H4 style={{ marginBottom: 15 }}>Personal Information</H4>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={4} md={2} style={{ marginBottom: 10 }}>
              <AvatarUpload
                size={50}
                picture={me.picture}
                avatarType="profile"
                folder={me.assetFolderId}
                onSuccess={handleUpload}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                name="name"
                label="Name"
                required
                disabled={mutationLoading}
                value={profile.name || ""}
                onChange={handleChange}
                variant="outlined"
                style={{
                  marginRight: 12,
                  marginBottom: 12,
                  width: "100%"
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
                disabled={mutationLoading}
                rowOneDisabled={hasEmailLogin(fbUser)}
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
                disabled={mutationLoading}
                rowOneDisabled={hasPhoneLogin(fbUser)}
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
                disabled={mutationLoading}
              />
              <TextField
                id="state"
                name="state"
                label="State"
                value={profile.state || ""}
                onChange={handleChange}
                variant="outlined"
                style={{ marginRight: 12, marginBottom: 12 }}
                disabled={mutationLoading}
              />
              <TextField
                id="postalCode"
                name="postalCode"
                value={profile.postalCode || ""}
                onChange={handleChange}
                label="Postal Code"
                variant="outlined"
                style={{ marginRight: 12, marginBottom: 12 }}
                disabled={mutationLoading}
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
                disabled={mutationLoading}
              />
              <TextField
                id="language"
                name="language"
                value={profile.language || ""}
                onChange={handleChange}
                label="Primary Language"
                variant="outlined"
                style={{ marginRight: 12, marginBottom: 12 }}
                disabled={mutationLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <BaseButton type="submit" primary disabled={mutationLoading}>
                Save Changes
              </BaseButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
