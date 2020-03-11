import gql from "graphql-tag";

const QUERY_FIELDS = gql`
  fragment NotesFields on Contact {
    contactId
    entryList {
      data {
        entryId
        createdAt
        title
        ... on Note {
          message
        }
      }
    }
  }
`;

// ALL_NOTES_QUERY
export const ALL_NOTES_QUERY = gql`
  query ALL_NOTES_QUERY($contactId: ID!) {
    contact(contactId: $contactId) {
      ...NotesFields
    }
  }
  ${QUERY_FIELDS}
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
        ...NotesFields
      }
      entryId
      createdAt
      title
      message
    }
  }
  ${QUERY_FIELDS}
`;

// UPDATE_NOTE_MUTATION
export const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION(
    $entryId: ID!
    $title: String!
    $message: String!
  ) {
    updateNote(input: { entryId: $entryId, title: $title, message: $message }) {
      contact {
        ...NotesFields
      }
      entryId
    }
  }
  ${QUERY_FIELDS}
`;
