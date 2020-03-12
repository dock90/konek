import PropTypes from "prop-types";
import styled from "styled-components";
// hooks
import { useState } from "react";
// gql
import { Query } from "react-apollo";
import { ENTRIES_QUERY, TYPE_NOTE } from "../../queries/EntryQueries";
// components
import NewNote from "./NewNote";
import EntryList from "./EntryList";
import { BorderButton } from "../material/StyledButton";
import Loading from "../Loading";

// styles
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Entries = ({ contactId, type, canNew }) => {
  const [newNote, setNewNote] = useState(false);
  if (canNew === undefined) {
    canNew = true;
  }

  return (
    <div>
      {canNew && (
        <>
          <Actions>
            <BorderButton onClick={() => setNewNote(true)}>
              New Note
            </BorderButton>
          </Actions>
          {newNote ? (
            <NewNote contactId={contactId} setNewNote={setNewNote} />
          ) : null}
        </>
      )}
      <Query query={ENTRIES_QUERY} variables={{ contactId, type }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <p>Error: {error}</p>;
          return <EntryList entries={data.entries} />;
        }}
      </Query>
    </div>
  );
};

Entries.propTypes = {
  contactId: PropTypes.string.isRequired
};

export default Entries;
