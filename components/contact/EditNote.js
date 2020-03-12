import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMutation } from "react-apollo";
// material
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from '../styles/Button'
// gql
import {
  UPDATE_NOTE_MUTATION,
  CREATE_NOTE_MUTATION
} from "../../queries/NoteQueries";
import { ENTRIES_QUERY, TYPE_NOTE } from "../../queries/EntryQueries";
import TagSelector from "../tags/TagSelector";

// styles
const Container = styled.div`
  margin-top: 1rem;
`;

const Title = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const EditNote = ({ note, contactId, setEdit }) => {
  const isNew = note.entryId === undefined;

  const [noteState, setNoteState] = useState(note);
  const [changed, setChanged] = useState({});
  const [updateNoteMutation, { loading: updateLoading }] = useMutation(
    UPDATE_NOTE_MUTATION
  );
  const [createNoteMutation, { loading: createLoading }] = useMutation(
    CREATE_NOTE_MUTATION,
    {
      refetchQueries: [{ query: ENTRIES_QUERY, variables: { type: TYPE_NOTE } }]
    }
  );

  const loading = updateLoading || createLoading;

  const handleChange = event => {
    const { name, value } = event.target;
    setNoteState({
      ...noteState,
      [name]: value
    });
    setChanged({
      ...changed,
      [name]: value
    });
  };

  const handleTagsChange = tags => {
    setNoteState({ ...noteState, tags });
    setChanged({ ...changed, tags });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let tags = [];
    if (changed.tags !== undefined) {
      tags = changed.tags.map(t => t.tagId);
    }
    if (isNew) {
      await createNoteMutation({ variables: { ...changed, tags, contactId } });
    } else {
      await updateNoteMutation({
        variables: { ...changed, tags, entryId: note.entryId }
      });
    }
    setEdit(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={loading}
          aria-busy={loading}
          style={{
            border: "none",
            margin: 0,
            padding: 0
          }}
        >
          <Card>
            <Title>
              <TextField
                id="title"
                name="title"
                label="Title"
                required
                value={noteState.title || ""}
                onChange={handleChange}
                style={{
                  width: "100%"
                }}
              />
            </Title>
            <CardContent>
              <div>
                <TagSelector
                  value={noteState.tags || []}
                  onChange={handleTagsChange}
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  id="message"
                  name="message"
                  label="Message"
                  multiline
                  value={noteState.message || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%"
                  }}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button primary type="submit">Save</Button>
              <Button onClick={() => setEdit(false)}>Cancel</Button>
            </CardActions>
          </Card>
        </fieldset>
      </form>
    </Container>
  );
};

EditNote.propTypes = {
  setEdit: PropTypes.func.isRequired,
  note: PropTypes.shape({
    entryId: PropTypes.string,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired,
  contactId: PropTypes.string
};

export default EditNote;
