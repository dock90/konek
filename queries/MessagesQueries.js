import gql from "graphql-tag";

const queryFields = `
    messageId
    body
    createdAt
    author {
      name
      memberId
    } 
`;

export const MESSAGES_QUERY = gql`
  query ($roomId: ID!, $after: String) {
    messages(input: { roomId: $roomId, after: $after, first: 50 }) {
      data {
        ${queryFields}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;


export const SEND_MESSAGE_MUTATION = gql`
  mutation ($roomId: ID!, $body: String!) {
    sendMessage(input: { roomId: $roomId, body: $body }) {
      ${queryFields}
    }
  }
`;
