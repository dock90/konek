import gql from 'graphql-tag';
import { TAG_FIELDS } from './TagQueries';

export const TYPE_NOTE = 'Note';
export const TYPE_CONVERSATION = 'Conversation';

export const ENTRY_FIELDS = gql`
  fragment EntryFields on EntryTypeInterface {
    __typename
    entryId
    title
    pinned
    createdBy {
      isMe
    }
    tags {
      ...TagFields
    }
    ... on Note {
      message
      assets {
        description
        asset {
          # Not using fragment so the __typename field isn't included.
          format
          publicId
          resourceType
          type
          originalFilename
          isAudio
        }
      }
    }
    ... on Conversation {
      startDate
      endDate
    }
    access
  }
  ${TAG_FIELDS}
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
