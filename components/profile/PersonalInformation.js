import styled from "styled-components";
import { useContext, useState } from "react";
import { useMutation } from "react-apollo";
import { MeContext } from "../../contexts/MeContext";
import { auth } from "../../config/firebase";
import { hasEmailLogin, hasPhoneLogin } from "./helpers";
// material
import { Card, CardContent, Grid } from "@material-ui/core";
// graphql
import { UPDATE_ME_MUTATION } from "../../queries/MeQueries";
// styles
import { BaseButton } from "../styles/Button";
import { H4 } from "../styles/Typography";
import AvatarUpload from "../assets/AvatarUpload";
import Loading from "../Loading";
import GridInputs from "../contact/GridInputs";
import { StyledTextField } from "../material/StyledTextField";

const DetailTextField = styled(StyledTextField)`
  && {
    width: auto;
    margin-bottom: 12px;
    margin-right: 12px;
  }
`;

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
          originalFilename: info.original_filename,
          isAudio: info.is_audio
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
              <StyledTextField
                name="name"
                label="Name"
                required
                disabled={mutationLoading}
                value={profile.name || ""}
                onChange={handleChange}
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
              <DetailTextField
                id="city"
                name="city"
                label="City"
                value={profile.city || ""}
                onChange={handleChange}
                disabled={mutationLoading}
              />
              <DetailTextField
                id="state"
                name="state"
                label="State"
                value={profile.state || ""}
                onChange={handleChange}
                disabled={mutationLoading}
              />
              <DetailTextField
                id="postalCode"
                name="postalCode"
                value={profile.postalCode || ""}
                onChange={handleChange}
                label="Postal Code"
                disabled={mutationLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <DetailTextField
                id="country"
                name="country"
                value={profile.country || ""}
                onChange={handleChange}
                label="Country"
                disabled={mutationLoading}
              />
              <DetailTextField
                id="language"
                name="language"
                value={profile.language || ""}
                onChange={handleChange}
                label="Primary Language"
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
