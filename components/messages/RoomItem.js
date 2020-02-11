import styled from "styled-components";

const Container = styled.div`
  padding: 8px;
  margin-left: ${props => props.active ? '' : '5px'};
  border-left: ${props => props.active ? 'solid 5px #4A4A4A' : ''};
  cursor: pointer;
`;

const RoomItem = props => {
  function setRoomId(e) {
    props.setRoomId(props.room.roomId);
  }

  return <Container active={props.active} onClick={setRoomId}>
    {props.room.name}
  </Container>
};

export default RoomItem;
