import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Input } from '@material-ui/core';
import { ROOMS_QUERY } from '../../queries/RoomQueries';
// components
import RoomItem from './RoomItem';
import Loading from '../Loading';
import { useState } from 'react';
import { BodyText } from '../styles/Typography';
import { FlexContainer } from '../styles/LayoutStyles';

const RoomContainer = styled(FlexContainer)`
  grid-area: rooms;
  background-color: #eeeeee;
  flex-direction: column;
`;

const SearchInput = styled(Input)`
  width: 100%;
  padding: 5px;
  background-color: #ffffff;
`;
const RoomsContainer = styled.div`
  position: relative;
  flex-grow: 1;
`;
const RoomsWrapper = styled(FlexContainer)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
`;

const Info = styled(BodyText)`
  text-align: center;
  margin-top: 10%;
`;

export function RoomList() {
  const roomsQuery = useQuery(ROOMS_QUERY);
  const [search, setSearch] = useState('');

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
      setSearch('');
    }
  }

  let rooms = search
    ? roomsQuery.data.rooms.filter((r) => r.name.toLowerCase().includes(search))
    : roomsQuery.data.rooms;

  return (
    <RoomContainer>
      <SearchInput
        placeholder="Search..."
        onChange={searchChange}
        value={search}
      />
      <RoomsContainer>
        <RoomsWrapper>
          {rooms.map((room) => (
            <RoomItem room={room} key={room.roomId} />
          ))}
        </RoomsWrapper>
      </RoomsContainer>
      {rooms.length === 0 && <Info>No matches found.</Info>}
    </RoomContainer>
  );
}
