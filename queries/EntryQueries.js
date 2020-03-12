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
    ...on Note {
      message
      assets {
        description
        asset {
          ...AssetFields
        }
      }
    }
    access
  }
  ${TAG_FIELDS}
  ${ASSET_FIELDS}
`;

export const ENTRIES_QUERY = gql`
  query ENTRIES_QUERY($contactId: ID!, $type: EntryTypes) {
    entries(contactId: $contactId, type: $type) {
      data {
        ...EntryFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ENTRY_FIELDS}
`;
