import { gql } from '@apollo/client';

export const PUB_NUB_CONNECTION_STATE_QUERY = gql`
  query PubNubConnectionStatequery {
    pnConnected @client(always: true)
  }
`;
