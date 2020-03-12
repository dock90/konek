import PropTypes from "prop-types";
import styled from "styled-components";
// hooks
import { useState } from "react";
// gql
import { Query } from "react-apollo";
import { ENTRIES_QUERY } from "../../queries/EntryQueries";
// components
import EntryList from "./EntryList";
import { BorderButton } from "../material/StyledButton";
import Loading from "../Loading";

// styles
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Entries = ({ contactId, type, NewFormComponent }) => {
  const [showNewForm, toggleNewForm] = useState(false);
  return (
    <div>
      {NewFormComponent && (
        <>
          <Actions>
            <BorderButton onClick={() => toggleNewForm(true)}>
              New {type}
            </BorderButton>
          </Actions>
          {showNewForm ? <NewFormComponent setEdit={toggleNewForm} contactId={contactId} />: null}
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
  contactId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  NewFormComponent: PropTypes.func
};

export default Entries;
