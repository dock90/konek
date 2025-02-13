import { gql } from '@apollo/client';
import { MEMBER_FIELDS } from './MemberQueries';
import { ROOM_FIELDS } from './RoomQueries';
import { ASSET_FIELDS } from './AssetQueries';

export const MESSAGE_FIELDS = gql`
  fragment MessageFields on Message {
    __typename
    messageId
    body
    createdAt
    author {
      ...MemberFields
    }
    asset {
      ...AssetFields
    }
  }
  ${MEMBER_FIELDS}
  ${ASSET_FIELDS}
`;

export const MESSAGES_QUERY = gql`
  query MessagesQuery($roomId: ID!, $after: String) {
    messages(input: { roomId: $roomId, after: $after, first: 100 }) {
      data {
        ...MessageFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${MESSAGE_FIELDS}
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessageMutation(
    $roomId: ID!
    $body: String
    $asset: AssetInput
  ) {
    sendMessage(input: { roomId: $roomId, body: $body, asset: $asset }) {
      ...MessageFields
    }
  }
  ${MESSAGE_FIELDS}
`;

export const SET_READ_THROUGH = gql`
  mutation SetReadThroughMutation($roomId: ID!, $messageId: ID!) {
    setReadThrough(input: { roomId: $roomId, messageId: $messageId }) {
      ...RoomFields
    }
  }
  ${ROOM_FIELDS}
`;
