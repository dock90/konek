import gql from 'graphql-tag';

export const PUB_NUB_CONNECTION_STATE_QUERY = gql`
  query {
    pnConnected @client(always: true)
  }
`;
