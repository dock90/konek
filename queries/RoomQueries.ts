import { gql } from '@apollo/client';
import { ASSET_FIELDS } from './AssetQueries';

export const ROOM_FIELDS = gql`
  fragment RoomFields on Room {
    __typename
    roomId
    name
    qtyUnread
    memberId
    readThrough
    picture {
      ...AssetFields
    }
  }
  ${ASSET_FIELDS}
`;

export const ROOMS_QUERY = gql`
  query RoomsQuery {
    rooms {
      ...RoomFields
    }
  }
  ${ROOM_FIELDS}
`;

export const ROOM_QUERY = gql`
  query RoomQuery($roomId: ID!) {
    room(roomId: $roomId) {
      ...RoomFields
    }
  }
  ${ROOM_FIELDS}
`;
