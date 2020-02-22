import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// gql
import { Query } from 'react-apollo';
import { ALL_NOTES_QUERY } from '../../queries/NotesQueries';
// components
import NewNote from './NewNote';
import NoteList from './NoteList';
import { BorderButton } from '../material/StyledButton';

// styles
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Notes = ({ contactId }) => {
  const [newNote, setNewNote] = useState(false);

  return (
    <div>
      <Actions>
        <BorderButton onClick={() => setNewNote(true)}>New Note</BorderButton>
      </Actions>
      {newNote ? (
        <NewNote contactId={contactId} setNewNote={setNewNote} />
      ) : null}
      <Query query={ALL_NOTES_QUERY} variables={{ contactId }}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const {
            contact: { entryList },
          } = data;
          return <NoteList notes={entryList} />;
        }}
      </Query>
    </div>
  );
};

Notes.propTypes = {
  contactId: PropTypes.string.isRequired,
};

export default Notes;
