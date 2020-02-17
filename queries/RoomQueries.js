import gql from "graphql-tag";

export const ROOM_FIELDS = gql`
  fragment RoomFields on Room {
    roomId
    name
    qtyUnread
    memberId
  }
`;

export const ROOMS_QUERY = gql`
  query ROOMS_QUERY {
    rooms {
      ...RoomFields
    }
  }
  ${ROOM_FIELDS}
`;
