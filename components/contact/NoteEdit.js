import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
// material
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { BaseButton } from '../styles/Button';
import { StyledTextField } from '../material/StyledTextField';
import { Save } from '@material-ui/icons';
// gql
import {
  UPDATE_NOTE_MUTATION,
  CREATE_NOTE_MUTATION,
} from '../../queries/NoteQueries';
import { ENTRIES_QUERY, TYPE_NOTE } from '../../queries/EntryQueries';
import TagSelector from '../tags/TagSelector';
import NoteEditAssets from './NoteEditAssets';
import { ContactContext } from '../../contexts/ContactContext';
import { VCentered } from '../styles/LayoutStyles';
import { CONTACT_QUERY } from '../../queries/ContactQueries';
import { resolveFieldValueOrError } from 'graphql/execution/execute';

// styles
const Container = styled.div`
  margin-top: 1rem;
`;
const Title = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const accessToggle = {
  PRIVATE: 'SHARED',
  SHARED: 'PRIVATE',
};

const NoteEdit = ({ note, setEdit }) => {
  const isNew = !note || note.entryId === undefined;

  const { contactId } = useContext(ContactContext);
  const [noteState, setNoteState] = useState(
    note || {
      // Defaults
      access: 'PRIVATE',
      pinned: false,
    },
  );
  const [changed, setChanged] = useState({});
  const [updateNoteMutation, { loading: updateLoading }] = useMutation(
    UPDATE_NOTE_MUTATION,
    {
      refetchQueries: () => {
        if (noteState.pinned !== note.pinned) {
          // the pinned state changed, so we need to refresh the contact, and the entry list.
          return [
            { query: CONTACT_QUERY, variables: { contactId } },
            { query: ENTRIES_QUERY, variables: { type: TYPE_NOTE, contactId } },
          ];
        }
      },
    },
  );
  const [createNoteMutation, { loading: createLoading }] = useMutation(
    CREATE_NOTE_MUTATION,
    {
      refetchQueries: () => {
        const refresh = [];

        if (changed.pinned === true) {
          refresh.push({ query: CONTACT_QUERY, variables: { contactId } });
        } else {
          refresh.push({
            query: ENTRIES_QUERY,
            variables: { type: TYPE_NOTE, contactId },
          });
        }

        return refresh;
      },
    },
  );

  const loading = updateLoading || createLoading,
    isMe =
      note && note.createdBy && note.createdBy.isMe !== undefined
        ? note.createdBy.isMe
        : true;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteState({
      ...noteState,
      [name]: value,
    });
    setChanged({
      ...changed,
      [name]: value,
    });
  };

  const toggleAccess = () => {
    const access = accessToggle[noteState.access];
    setNoteState({
      ...noteState,
      access,
    });
    setChanged({
      ...changed,
      access,
    });
  };
  const togglePinned = () => {
    const newPinned = !noteState.pinned;
    setNoteState({
      ...noteState,
      pinned: newPinned,
    });
    setChanged({
      ...changed,
      pinned: newPinned,
    });
  };

  const handleTagsChange = (tags) => {
    setNoteState({ ...noteState, tags });
    setChanged({ ...changed, tags });
  };

  const handleAssetsChange = (assets) => {
    setNoteState({ ...noteState, assets });
    setChanged({ ...changed, assets });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let tags = [];
    if (changed.tags !== undefined) {
      tags = changed.tags.map((t) => t.tagId);
    }

    if (isNew) {
      await createNoteMutation({ variables: { ...changed, tags, contactId } });
    } else {
      await updateNoteMutation({
        variables: { ...changed, tags, entryId: note.entryId },
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
            border: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          <Card>
            <Title>
              <StyledTextField
                id="title"
                name="title"
                label="Title"
                required
                value={noteState.title || ''}
                onChange={handleChange}
              />
            </Title>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TagSelector
                    value={noteState.tags || []}
                    onChange={handleTagsChange}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  {isMe ? (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={noteState.access === 'SHARED'}
                          onChange={toggleAccess}
                          color="primary"
                        />
                      }
                      label={noteState.access}
                    />
                  ) : (
                    <VCentered>{note.access}</VCentered>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={noteState.pinned}
                        onChange={togglePinned}
                        color="primary"
                      />
                    }
                    label={noteState.pinned ? 'PINNED' : 'UN-PINNED'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    id="message"
                    name="message"
                    label="Message"
                    multiline
                    required
                    value={noteState.message || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <NoteEditAssets
                    assets={noteState.assets}
                    onChange={handleAssetsChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <BaseButton primary type="submit">
                <Save />
                &nbsp;Save
              </BaseButton>
              <BaseButton onClick={() => setEdit(false)}>Cancel</BaseButton>
            </CardActions>
          </Card>
        </fieldset>
      </form>
    </Container>
  );
};

NoteEdit.propTypes = {
  setEdit: PropTypes.func.isRequired,
  note: PropTypes.shape({
    entryId: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  contactId: PropTypes.string,
};

export default NoteEdit;
