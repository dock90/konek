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
  query MESSAGES_QUERY ($roomId: ID!, $after: String) {
    messages(input: { roomId: $roomId, after: $after, first: 25 }) {
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
  mutation SEND_MESSAGE_MUTATION ($roomId: ID!, $body: String!) {
    sendMessage(input: { roomId: $roomId, body: $body }) {
      __typename
      ...MessageFields
    }
  }
  ${QUERY_FIELDS}
`;
