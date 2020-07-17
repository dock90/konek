import { gql } from '@apollo/client';
import { TAG_FIELDS } from './TagQueries';
import { MESSAGE_FIELDS } from './MessagesQueries';
import { ROOM_FIELDS } from './RoomQueries';

export const CONVERSATION_QUERY = gql`
  query ConversationQuery($entryId: ID!) {
    entry(entryId: $entryId) {
      entryId
      __typename
      tags {
        ...TagFields
      }
      ... on Conversation {
        room {
          ...RoomFields
        }
        messages {
          ...MessageFields
        }
      }
    }
  }
  ${TAG_FIELDS}
  ${ROOM_FIELDS}
  ${MESSAGE_FIELDS}
`;
