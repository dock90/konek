import gql from "graphql-tag";
import { TAG_FIELDS } from "./TagQueries";
import { ASSET_FIELDS } from "./AssetQueries";

export const TYPE_NOTE = "Note";
export const TYPE_CONVERSATION = "Conversation";

export const ENTRY_FIELDS = gql`
  fragment EntryFields on EntryTypeInterface {
    entryId
    title
    pinned
    tags {
      ...TagFields
    }
    access
  }
`;
export const NOTE_FIELDS = gql`
  fragment NoteFields on Note {
    message
    assets {
      asset {
        ...AssetFields
      }
      description
    }
  }
  ${ASSET_FIELDS}
`;
export const CONVERSATION_FIELDS = gql`
  fragment ConversationFields on Conversation {
    messages {
      body
      createdAt
    }
  }
`;
export const ENTRIES_QUERY = gql`
  query ENTRIES_QUERY($contactId: ID!, $type: EntryTypes) {
    entries(contactId: $contactId, type: $type) {
      data {
        ...EntryFields
        ... on Note {
          ...NoteFields
        }
        ... on Conversation {
          ...ConversationFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${TAG_FIELDS}
  ${ENTRY_FIELDS}
  ${NOTE_FIELDS}
  ${CONVERSATION_FIELDS}
`;
