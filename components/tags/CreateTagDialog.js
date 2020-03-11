import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Button from "../styles/Button";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TAG_MUTATION, TAGS_QUERY } from "../../queries/TagQueries";

const CreateTagDialog = ({ open, name, onClose }) => {
  const [tagName, setTagName] = useState(name);
  const [tagColor, setTagColor] = useState("ffffff");
  const [createTag] = useMutation(CREATE_TAG_MUTATION, {
    refetchQueries: [{ query: TAGS_QUERY }]
  });

  useEffect(() => {
    // Set the tag name only when the name prop changes.
    setTagName(name);
    setTagColor('ffffff');
  }, [name]);

  const handleClose = e => {
    onClose();
  };

  const handleSave = async () => {
    const { data } = await createTag({
      variables: { name: tagName, color: tagColor }
    });

    onClose(data.createTag);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Tag</DialogTitle>
      <DialogContent>
        <div>
          <TextField
            value={tagName}
            onChange={e => setTagName(e.target.value)}
            label="Name"
            required
          />
        </div>
        <div>
          <TextField
            value={tagColor}
            onChange={e => setTagColor(e.target.value)}
            label="Color"
            required
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button primary onClick={handleSave}>Create New Tag</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

CreateTagDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default CreateTagDialog;
