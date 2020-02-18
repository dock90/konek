import gql from "graphql-tag";

export const ROOM_FIELDS = gql`
  fragment RoomFields on Room {
    __typename
    roomId
    name
    qtyUnread
    memberId
    readThrough
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

export const ROOM_QUERY_LOCAL = gql`
  query ROOM_QUERY ($roomId: ID!) {
    room(roomId: $roomId) @client {
      ...RoomFields,
    }
  }
  ${ROOM_FIELDS}
`;
