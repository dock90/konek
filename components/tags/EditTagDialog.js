import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel
} from "@material-ui/core";
import { Save, Cancel } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_TAG_MUTATION,
  TAGS_QUERY,
  UPDATE_TAG_MUTATION
} from "../../queries/TagQueries";
import { BaseButton } from "../styles/Button";
import { StyledTextField } from "../material/StyledTextField";
import styled from "styled-components";

const FieldWrapper = styled.div`
  margin-bottom: 15px;
`;

const accessToggle = {
  PRIVATE: "SHARED",
  SHARED: "PRIVATE"
};

export const NewTag = () => ({
  tagId: null,
  name: "New Tag",
  access: "PRIVATE",
  color: "FFFFFF",
  isMine: true
});

const EditTagDialog = ({ tag, open, onClose }) => {
  const [tagState, setTagState] = useState({});
  const [hasChange, setHasChange] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [updateTag] = useMutation(UPDATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }]
  });
  const [createTag] = useMutation(CREATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }]
  });

  useEffect(() => {
    const t = { ...tag };
    // Clean up so it doesn't bother the mutation.
    delete t.__typename;

    setTagState(t);
    setHasChange(false);
  }, [tag, open]);

  const toggleAccess = () => {
    const access = accessToggle[tagState.access];
    setTagState({
      ...tagState,
      access
    });
    setHasChange(true);
  };

  const handleChange = e => {
    let { name, value } = e.target;

    if (name === "hidden") {
      value = e.target.checked;
    }

    setHasChange(true);
    setTagState({
      ...tagState,
      [name]: value
    });
  };

  const handleSave = async () => {
    if (hasChange) {
      setSaving(true);
      if (!tag.tagId) {
        await createTag({
          variables: tagState
        });
      } else {
        await updateTag({
          variables: tagState
        });
      }
      setSaving(false);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {tagState.tagId ? `Edit Tag "${tagState.name}"` : 'New Tag'}
      </DialogTitle>
      <DialogContent>
        <FieldWrapper>
          <StyledTextField
            name="name"
            label="Name"
            value={tagState.name || ""}
            onChange={handleChange}
            required
            disabled={isSaving}
          />
        </FieldWrapper>
        <FieldWrapper>
          <StyledTextField
            name="color"
            label="Color"
            value={tagState.color || ""}
            onChange={handleChange}
            required
            disabled={isSaving}
          />
        </FieldWrapper>
        {tag.isMine ? (
          <FieldWrapper>
            <FormControlLabel
              control={
                <Switch
                  checked={tagState.access === "SHARED"}
                  onChange={toggleAccess}
                  color="primary"
                  disabled={isSaving}
                />
              }
              label={tagState.access}
            />
          </FieldWrapper>
        ) : (
          tag.access
        )}
        <FieldWrapper>
          <FormControlLabel
            control={
              <Checkbox
                name="hidden"
                checked={!!tagState.hidden}
                onChange={handleChange}
                disabled={isSaving}
              />
            }
            label="Hidden"
          />
        </FieldWrapper>
      </DialogContent>
      <DialogActions>
        <BaseButton primary onClick={handleSave} disabled={isSaving}>
          <Save />
          &nbsp;Save
        </BaseButton>
        <BaseButton onClick={() => onClose()} disabled={isSaving}>
          <Cancel />
          &nbsp;Cancel
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

EditTagDialog.propTypes = {
  tag: PropTypes.object.isRequired
};

export default EditTagDialog;
