import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Input } from "@material-ui/core";
import { ROOMS_QUERY } from "../../queries/RoomQueries";
// components
import RoomItem from "./RoomItem";
import Loading from "../Loading";
import { useState } from "react";
import { BodyText } from "../styles/Typography";

const RoomContainer = styled.div`
  grid-area: rooms;
  background-color: #eeeeee;
`;

const SearchInput = styled(Input)`
  width: 100%;
  padding: 5px;
  background-color: #ffffff;
`;

const Info = styled(BodyText)`
  text-align: center;
  margin-top: 10%;
`;

const RoomList = () => {
  const roomsQuery = useQuery(ROOMS_QUERY);
  const [search, setSearch] = useState("");

  if (roomsQuery.loading) {
    return (
      <RoomContainer>
        <Loading />
      </RoomContainer>
    );
  }

  if (roomsQuery.error) {
    return (
      <RoomContainer>
        <Info>Errors: {roomsQuery.error}</Info>
      </RoomContainer>
    );
  }

  if (roomsQuery.data.rooms.length === 0) {
    return (
      <RoomContainer>
        <Info>No messages</Info>
      </RoomContainer>
    );
  }

  function searchChange(e) {
    if (e.target.value) {
      setSearch(e.target.value.toLowerCase());
    } else {
      setSearch("");
    }
  }

  let rooms = search
    ? roomsQuery.data.rooms.filter(r => r.name.toLowerCase().includes(search))
    : roomsQuery.data.rooms;

  return (
    <RoomContainer>
      <SearchInput
        placeholder="Search..."
        onChange={searchChange}
        value={search}
      />
      {rooms.map(room => (
        <RoomItem room={room} key={room.roomId} />
      ))}
      {rooms.length === 0 && (<Info>No matches found.</Info>)}
    </RoomContainer>
  );
};

export default RoomList;
