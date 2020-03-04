import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CONTACT_GROUP } from "../../../queries/ContactQueries";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid
} from "@material-ui/core";
import { ErrorMessage } from "../../styles/Messages";
import { BorderButton } from "../../material/StyledButton";
import { Cancel, Save } from "@material-ui/icons";
import styled from "styled-components";

const Container = styled(Grid)`
  width: 500px !important;
`;

const AddMembership = ({ groups, roles, contactId, open, onClose }) => {
  const [isExecuting, setIsExecuting] = useState(false),
    [error, setError] = useState(""),
    [contactGroup, setContactGroup] = useState({
      groupId: "",
      roleId: ""
    });

  const [addMembership] = useMutation(ADD_CONTACT_GROUP);

  const handleClose = () => {
    if (isExecuting) {
      return;
    }
    setError("");
    setContactGroup({
      groupId: "",
      roleId: ""
    });
    onClose();
  };

  const handleSave = async () => {
    if (isExecuting) {
      return;
    }
    if (!contactGroup.groupId) {
      setError("Group is required");
      return;
    }
    if (!contactGroup.roleId) {
      setError("Role is required");
      return;
    }
    setIsExecuting(true);
    try {
      await addMembership({
        variables: {
          ...contactGroup,
          contactId
        }
      });
    } catch (e) {
      if (e.graphQLErrors) {
        // Probably access denied.
        setError(e.graphQLErrors.map(e => e.message).join("\n"));
      }
      setIsExecuting(false);
      return;
    }
    setIsExecuting(false);
    onClose();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setContactGroup({
      ...contactGroup,
      [name]: value
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Container container>
          <Grid item xs={12}>
            <TextField
              required
              select
              name="groupId"
              label="Group"
              value={contactGroup.groupId}
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {groups.map(g => (
                <MenuItem key={g.groupId} value={g.groupId}>
                  {g.hierarchy}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              select
              name="roleId"
              label="Role"
              value={contactGroup.roleId}
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              {roles.map(r => (
                <MenuItem key={r.roleId} value={r.roleId}>
                  {r.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Container>
      </DialogContent>
      <DialogActions>
        <BorderButton disabled={isExecuting} onClick={handleClose}>
          <Cancel /> Cancel
        </BorderButton>
        <BorderButton disabled={isExecuting} onClick={handleSave}>
          <Save /> Save
        </BorderButton>
      </DialogActions>
    </Dialog>
  );
};

AddMembership.propTypes = {
  groups: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  contactId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddMembership;
