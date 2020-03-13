import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { TAGS_QUERY, UPDATE_TAG_MUTATION } from "../../queries/TagQueries";
import Button from "../styles/Button";

const EditTagDialog = ({ tag, open, onClose }) => {
  const [tagState, setTagState] = useState({});
  const [hasChange, setHasChange] = useState(false);
  const [updateTag] = useMutation(UPDATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }]
  });

  useEffect(() => {
    const t = {...tag};
    // Clean up so it doesn't bother the mutation.
    delete t.__typename;

    setTagState(t);
    setHasChange(false);
  }, [tag]);

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
      await updateTag({
        variables: tagState
      });
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Tag "{tagState.name}"</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            name="name"
            label="Name"
            value={tagState.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <TextField
            name="color"
            label="Color"
            value={tagState.color || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                name="hidden"
                checked={!!tagState.hidden}
                onChange={handleChange}
              />
            }
            label="Hidden"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button primary onClick={handleSave}>
          Save
        </Button>
        <Button onClick={() => onClose()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

EditTagDialog.propTypes = {
  tag: PropTypes.object.isRequired
};

export default EditTagDialog;
