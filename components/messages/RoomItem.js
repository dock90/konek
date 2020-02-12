import styled from 'styled-components';
import { useContext } from 'react';
import { RoomIdContext } from './RoomIdContext';

const Container = styled.div`
  padding: 8px;
  margin-left: ${props => (props.active ? '0' : '5px')};
  border-left: ${props => (props.active ? 'solid 5px #4A4A4A' : '')};
  cursor: pointer;
`;

const RoomItem = props => {
  const roomIdContext = useContext(RoomIdContext);

  function setRoomId() {
    roomIdContext.setRoomId(props.room.roomId);
  }

  return (
    <Container
      active={props.room.roomId === roomIdContext.roomId}
      onClick={setRoomId}
    >
      {props.room.name}
    </Container>
  );
};

export default RoomItem;
