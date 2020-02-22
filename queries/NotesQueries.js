import gql from 'graphql-tag';

// ALL_NOTES_QUERY
export const ALL_NOTES_QUERY = gql`
  query ALL_NOTES_QUERY($contactId: ID!) {
    contact(contactId: $contactId) {
      contactId
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

// CREATE_NOTE_MUTATION
export const CREATE_NOTE_MUTATION = gql`
  mutation CREATE_NOTE_MUTATION(
    $contactId: ID!
    $title: String!
    $message: String!
  ) {
    createNote(
      input: { contactId: $contactId, title: $title, message: $message }
    ) {
      contact {
        contactId
      }
      entryId
      createdAt
      title
      message
    }
  }
`;
