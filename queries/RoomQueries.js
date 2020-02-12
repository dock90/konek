import gql from "graphql-tag";

export const ROOMS_QUERY = gql`
  {
    rooms {
      roomId
      name
      qtyUnread
      memberId
    }
  }
`;
