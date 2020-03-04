import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
// queries
import { UPDATE_CONTACT_GROUP } from "../../../queries/ContactQueries";
// components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField
} from "@material-ui/core";
import { BorderButton } from "../../material/StyledButton";
import { Cancel, Save } from "@material-ui/icons";
import {ErrorMessage} from "../../styles/Messages";

export const EditMembership = ({
  contactGroup,
  onClose,
  open,
  contactId,
  group,
  roles
}) => {
  const [isSaving, setIsSaving] = useState(false),
    [currentRole, setCurrentRole] = useState(contactGroup.role.roleId),
    [error, setError] = useState("");

  const [updateContactGroup] = useMutation(UPDATE_CONTACT_GROUP);

  const handleClose = () => {
    if (isSaving) {
      return;
    }
    setError("");
    onClose();
  };
  const selectRole = e => {
    setCurrentRole(e.target.value);
  };
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContactGroup({
        variables: {
          contactId,
          groupId: group.groupId,
          roleId: currentRole
        }
      });
    } catch (e) {
      if (
        e.networkError &&
        e.networkError.result &&
        e.networkError.result &&
        e.networkError.result.errors
      ) {
        // Probably access denied.
        setError(e.networkError.result.errors.map(e => e.message).join("\n"));
      }
      setIsSaving(false);
      setCurrentRole(contactGroup.role.roleId);
      return;
    }
    setIsSaving(false);
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit "{group.name}" membership</DialogTitle>
      <DialogContent>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextField
          select
          label="Role"
          value={currentRole}
          onChange={selectRole}
        >
          {roles.map(r => (
            <MenuItem key={r.roleId} value={r.roleId}>
              {r.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <BorderButton disabled={isSaving} onClick={handleClose}>
          <Cancel /> Cancel
        </BorderButton>
        <BorderButton disabled={isSaving} onClick={handleSave}>
          <Save /> Save
        </BorderButton>
      </DialogActions>
    </Dialog>
  );
};

EditMembership.propTypes = {
  contactId: PropTypes.string.isRequired,
  contactGroup: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};
