import PropTypes from "prop-types";
import styled from "styled-components";
// hooks
import { useContext, useState } from "react";
// gql
import { useQuery } from "react-apollo";
import { ENTRIES_QUERY } from "../../queries/EntryQueries";
// components
import EntryList from "./EntryList";
import Loading from "../Loading";
import { ContactContext } from "../../contexts/ContactContext";
import { BaseButton } from "../styles/Button";
import { Add } from '@material-ui/icons';

// styles
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const NoneFound = styled.div.attrs(() => ({
  children: "None found"
}))`
  text-align: center;
  font-size: 1.3em;
  font-style: italic;
  color: ${props => props.grayer};
  margin-top: 15px;
`;

const Entries = ({ type, NewFormComponent }) => {
  const [showNewForm, toggleNewForm] = useState(false);
  const { contactId } = useContext(ContactContext);
  const { loading, error, data } = useQuery(ENTRIES_QUERY, {
    variables: { contactId, type }
  });

  return (
    <div>
      {NewFormComponent && (
        <>
          <Actions>
            <BaseButton onClick={() => toggleNewForm(true)}>
              <Add />&nbsp;New {type}
            </BaseButton>
          </Actions>
          {showNewForm ? <NewFormComponent setEdit={toggleNewForm} /> : null}
        </>
      )}
      {(() => {
        if (loading) return <Loading />;
        if (error) return <p>{error}</p>;
        return data.entries.data.length > 0 ? (
          <EntryList entries={data.entries} />
        ) : (
          <NoneFound />
        );
      })()}
    </div>
  );
};

Entries.propTypes = {
  type: PropTypes.string.isRequired,
  NewFormComponent: PropTypes.func
};

export default Entries;
