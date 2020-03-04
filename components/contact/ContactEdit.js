import PropTypes from "prop-types";
// hooks
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useRouter } from "next/router";
// queries
import {
  CONTACT_QUERY,
  UPDATE_CONTACT_MUTATION
} from "../../queries/ContactQueries";
// material
import {
  Grid,
  TextField,
  Button,
  Paper
} from "@material-ui/core";
// components
import styled from "styled-components";
import { H4 } from "../styles/Typography";
import Loading from "../Loading";
import { useGroupList } from "../../hooks/useGroupList";

// styles
const Container = styled(Paper)``;
const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
`;

const Header = styled(H4)`
  margin-bottom: 1.5rem;
`;
const Input = styled(TextField)`
  width: 100%;
`;

const ContactEdit = ({ id }) => {
  const isNew = id === "new";
  const router = useRouter();
  const { loading, data, error } = useQuery(CONTACT_QUERY, {
      variables: { contactId: id },
      skip: isNew
    }),
    { loading: groupsLoading, data: groupsData } = useGroupList({
      manageOnly: true,
      includeGroupName: true
    }),
    [updateContactMutation] = useMutation(UPDATE_CONTACT_MUTATION);

  const [contact, setContact] = useState({}),
    [updatedFields, setUpdatedFields] = useState({}),
    [locked, setLocked] = useState(false);

  useEffect(() => {
    if (loading || !data || !data.contact) {
      return;
    }
    setContact(data.contact);
  }, [loading, data]);

  if (loading || groupsLoading || !contact) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  console.log(groupsData);

  const handleChange = event => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value
    });
    setUpdatedFields({
      ...updatedFields,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (Object.keys(updatedFields).length === 0) {
      // Nothing updated, nothing to do.
      router.push("/contacts/[id]", `/contacts/${id}`);
      return;
    }
    setLocked(true);
    await updateContactMutation({
      variables: {
        contactId: id,
        ...updatedFields
      }
    });
    router.push("/contacts/[id]", `/contacts/${id}`);
  };

  const fieldFactory = (name, label, options) => {
    options = options || {};
    let value = contact[name];
    if (!value) {
      // So that it is controlled.
      value = "";
    }
    return (
      <Input
        multiline={options.multiline || false}
        id={name}
        name={name}
        label={label}
        required={options.required || false}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Fieldset disabled={locked} aria-busy={locked}>
          <Header>{isNew && "New "}Contact Information</Header>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              {fieldFactory("name", "Name", { required: true })}
            </Grid>
            <Grid item xs={12} md={6}>
              {fieldFactory("legalName", "Legal Name")}
            </Grid>
            <Grid item xs={12}>
              {fieldFactory("bio", "Bio", { multiline: true })}
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <Grid container spacing={1}>*/}
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("city", "City")}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("state", "State")}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("postalCode", "Postal Code")}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("country", "Country")}
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("language", "Language")}
            </Grid>
            {/*  </Grid>*/}
            {/*</Grid>*/}
            <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
              {fieldFactory("fbProfile", "FaceBook Profile")}
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
              <Button
                type="submit"
                style={{
                  background: "#4CAF50",
                  color: "#FFF"
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Fieldset>
      </form>
    </Container>
  );
};

ContactEdit.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactEdit;
