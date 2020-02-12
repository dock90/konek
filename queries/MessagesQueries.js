import gql from "graphql-tag";

const QUERY_FIELDS = gql`
  fragment MessageFields on Message {
    messageId
    body
    createdAt
    author {
      name
      memberId
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query ($roomId: ID!, $after: String) {
    messages(input: { roomId: $roomId, after: $after, first: 50 }) {
      data {
        ...MessageFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
  ${QUERY_FIELDS}
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation ($roomId: ID!, $body: String!) {
    sendMessage(input: { roomId: $roomId, body: $body }) {
      __typename
      ...MessageFields
    }
  }
  ${QUERY_FIELDS}
`;
