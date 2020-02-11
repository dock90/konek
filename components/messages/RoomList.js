import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import styled from "styled-components";
import { Input } from "@material-ui/core";
// components
import RoomItem from "./RoomItem";

const ROOMS_QUERY = gql`
  {
    rooms {
      roomId
      name
      qtyUnread 
    }
  }
`;

const RoomContainer = styled.div`
  grid-area: rooms;
  background-color: #c4c4c4;
`;

const SearchInput = styled(Input)`
  width: 100%;
  padding: 5px;
  background-color: #ffffff;
`;

const RoomList = props => {
  const rooms = useQuery(ROOMS_QUERY);

  return (
    <RoomContainer>
      <SearchInput placeholder="Search Contacts" />
      {(() => {
        if (rooms.loading) return <span>loading...</span>;
        if (rooms.error) return <span>Error: {rooms.error.message}</span>;
        if (rooms.data.rooms.length === 0) return <span>No rooms! 🙁</span>;

        return rooms.data.rooms.map(room => <RoomItem room={room} key={room.roomId} active={room.roomId === props.roomId} setRoomId={props.setRoomId} />);
      })()}
    </RoomContainer>);
};

export default RoomList;
