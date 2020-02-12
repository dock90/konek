import PropTypes from 'prop-types';
import styled from 'styled-components';
// gql
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// components
import NoteList from './NoteList';
import { BorderButton } from '../material/StyledButton';

// ALL_NOTES_QUERY
const ALL_NOTES_QUERY = gql`
  query ALL_NOTES_QUERY($contactId: ID!) {
    contact(contactId: $contactId) {
      entryList {
        data {
          entryId
          createdAt
          ... on Note {
            title
            message
          }
        }
      }
    }
  }
`;

// styles
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Notes = ({ contactId }) => {
  const someData = '';
  return (
    <div>
      <Actions>
        <BorderButton>New Note</BorderButton>
      </Actions>
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

export default Notes;
