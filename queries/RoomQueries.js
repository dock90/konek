import gql from "graphql-tag";

export const ROOMS_QUERY = gql`
  query ROOMS_QUERY {
    rooms {
      roomId
      name
      qtyUnread
      memberId
    }
  }
`;
