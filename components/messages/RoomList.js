import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Input } from "@material-ui/core";
import { ROOMS_QUERY } from "../../queries/RoomQueries";
// components
import RoomItem from "./RoomItem";
import Loading from "../Loading";

const RoomContainer = styled.div`
  grid-area: rooms;
  background-color: #eeeeee;
`;

const SearchInput = styled(Input)`
  width: 100%;
  padding: 5px;
  background-color: #ffffff;
`;

const RoomList = () => {
  const rooms = useQuery(ROOMS_QUERY);

  return (
    <RoomContainer>
      <SearchInput placeholder="Search..." />
      {(() => {
        if (rooms.loading) return <Loading />;
        if (rooms.error) return <span>Error: {rooms.error.message}</span>;
        if (rooms.data.rooms.length === 0) return <span>No messages! 🙁</span>;

        return rooms.data.rooms.map(room => (
          <RoomItem room={room} key={room.roomId} />
        ));
      })()}
    </RoomContainer>
  );
};

export default RoomList;
