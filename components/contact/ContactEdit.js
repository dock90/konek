import PropTypes from "prop-types";
// hooks
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { useRouter } from "next/router";
// queries
import {
  ALL_CONTACTS_QUERY,
  CONTACT_QUERY,
  CREATE_CONTACT_MUTATION,
  UPDATE_CONTACT_MUTATION
} from "../../queries/ContactQueries";
// material
import { Grid, TextField, Button, Paper } from "@material-ui/core";
import { Add } from "@material-ui/icons";
// components
import styled from "styled-components";
import { H1, H2 } from "../styles/Typography";
import Loading from "../Loading";
import { useGroupList } from "../../hooks/useGroupList";
import ContactGroupEdit from "./ContactGroupEdit";
import { ROLES_QUERY } from "../../queries/RoleQueries";
import AddMembership from "./dialogs/AddMembership";
import ContactNewGroups from "./ContactNewGroups";

// styles
const Container = styled.div`
  max-width: 1200px;
`;
const Header = styled(H1)`
  margin-bottom: 1.5rem;
`;
const FormContainer = styled(Paper)`
  padding-top: 10px;
`;
const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
`;
const SectionHeader = styled(H2)``;
const GroupTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    border-bottom: 1px gray solid;
    margin: 0;
  }
  td {
    padding: 2px;
    border: 0;
  }
  td:nth-child(2) {
    width: 20%;
  }
  td:nth-child(3) {
    width: 45px;
  }
  tr {
    transition: background-color linear 150ms;
    height: 32px;
    min-height: 32px;
  }
  tbody tr:hover {
    background-color: lightgray;
  }
  tr:nth-child(even) {
    background-color: whitesmoke;
  }
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
    { loading: rolesLoading, data: rolesData } = useQuery(ROLES_QUERY),
    [updateContactMutation] = useMutation(UPDATE_CONTACT_MUTATION),
    [createContactMutation] = useMutation(CREATE_CONTACT_MUTATION, {
      refetchQueries: [{ query: ALL_CONTACTS_QUERY }]
    });

  const { loading: groupsLoading, data: groupsData } = useGroupList({
    manageOnly: false,
    includeGroupName: true
  });

  const [contact, setContact] = useState({}),
    [updatedFields, setUpdatedFields] = useState({}),
    [saving, setSaving] = useState(false),
    [openAddGroup, setOpenAddGroup] = useState(false);

  useEffect(() => {
    if (loading || !data || !data.contact) {
      return;
    }
    setContact(data.contact);
  }, [loading, data]);

  if (loading || groupsLoading || rolesLoading || !contact) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

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

  const newContactGroupsChange = value => {
    setContact({
      ...contact,
      groups: value
    });
    setUpdatedFields({
      ...updatedFields,
      groups: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (Object.keys(updatedFields).length === 0) {
      // Nothing updated, nothing to do.
      router.push("/contacts/[id]", `/contacts/${id}`);
      return;
    }
    setSaving(true);

    if (isNew) {
      const res = await createContactMutation({ variables: updatedFields });
      await router.replace(
        "/contacts/[id]",
        `/contacts/${res.data.createContact.contactId}`
      );
      return;
    }

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
      <Header>{isNew ? "New" : "Edit"} Contact</Header>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Fieldset disabled={saving} aria-busy={saving}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <SectionHeader>Basic Information</SectionHeader>
              </Grid>
              <Grid item xs={12} md={6}>
                {fieldFactory("name", "Name", { required: true })}
              </Grid>
              <Grid item xs={12} md={6}>
                {fieldFactory("legalName", "Legal Name")}
              </Grid>
              <Grid item xs={12}>
                {fieldFactory("bio", "Bio", { multiline: true })}
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
                {fieldFactory("fbProfile", "FaceBook Profile")}
              </Grid>
              <Grid item xs={12}>
                <SectionHeader>Contact Information</SectionHeader>
              </Grid>
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
              <Grid item xs={12}>
                <SectionHeader>Groups</SectionHeader>
                <Grid container>
                  <Grid item xs={12} sm={10} md={10} lg={6}>
                    <GroupTable>
                      <thead>
                        <tr>
                          <th>Group</th>
                          <th>Role</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      {!isNew && (
                        <>
                          <tbody>
                            {contact.groups &&
                              contact.groups.map(cg => (
                                <ContactGroupEdit
                                  key={cg.group.groupId}
                                  contactId={contact.contactId}
                                  contactGroup={cg}
                                  groups={groupsData}
                                  roles={rolesData.roles}
                                />
                              ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td> </td>
                              <td colSpan={2}>
                                <Button onClick={e => setOpenAddGroup(true)}>
                                  <Add /> Add Group
                                </Button>
                                <AddMembership
                                  roles={rolesData.roles}
                                  groups={groupsData}
                                  contactId={id}
                                  open={openAddGroup}
                                  onClose={() => setOpenAddGroup(false)}
                                />
                              </td>
                            </tr>
                          </tfoot>
                        </>
                      )}
                      {isNew && (
                        <ContactNewGroups
                          value={contact.groups}
                          onChange={newContactGroupsChange}
                          groups={groupsData}
                          roles={rolesData.roles}
                        />
                      )}
                    </GroupTable>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={saving}
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
      </FormContainer>
    </Container>
  );
};

ContactEdit.propTypes = {
  id: PropTypes.string.isRequired
};

export default ContactEdit;
