import gql from "graphql-tag";
import {ENTRY_FIELDS, NOTE_FIELDS} from "./EntryQueries";

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
      ...EntryFields
      ...NoteFields
    }
  }
  ${ENTRY_FIELDS}
  ${NOTE_FIELDS}
`;

// UPDATE_NOTE_MUTATION
export const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION(
    $entryId: ID!
    $title: String!
    $message: String!
  ) {
    updateNote(input: { entryId: $entryId, title: $title, message: $message }) {
      ...EntryFields
      contact {
        ...NotesFields
      }
      entryId
    }
  }
  ${ENTRY_FIELDS}
  ${NOTE_FIELDS}
`;
