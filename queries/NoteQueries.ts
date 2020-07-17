import { gql } from '@apollo/client';
import { ENTRY_FIELDS } from './EntryQueries';

// CREATE_NOTE_MUTATION
export const CREATE_NOTE_MUTATION = gql`
  mutation CreateNoteMutation(
    $contactId: ID!
    $title: String!
    $message: String!
    $tags: [ID!]
    $access: EntryAccessType
    $pinned: Boolean
    $assets: [NoteAssetInput!]
  ) {
    createNote(
      input: {
        contactId: $contactId
        title: $title
        message: $message
        tags: $tags
        access: $access
        pinned: $pinned
        assets: $assets
      }
    ) {
      ...EntryFields
    }
  }
  ${ENTRY_FIELDS}
`;

export const UPDATE_NOTE_MUTATION = gql`
  mutation UpdateNoteMutation(
    $entryId: ID!
    $title: String
    $message: String
    $tags: [ID!]
    $access: EntryAccessType
    $pinned: Boolean
    $assets: [NoteAssetInput!]
  ) {
    updateNote(
      input: {
        entryId: $entryId
        access: $access
        pinned: $pinned
        title: $title
        message: $message
        tags: $tags
        assets: $assets
      }
    ) {
      ...EntryFields
    }
  }
  ${ENTRY_FIELDS}
`;
