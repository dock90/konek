import styled from "styled-components";
import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
// material
import Avatar from "@material-ui/core/Avatar";

const Container = styled.div`
  padding: 8px 8px 8px ${props => (props.active ? "8px" : "13px")};
  border-left: ${props => (props.active ? "solid 5px #4A4A4A" : "")};
  cursor: pointer;
  display: flex;
  background-color: #fafafa;
  margin-bottom: 1px;
`;

const AvatarContainer = styled.div`
  flex-grow: 0;
  margin-right: 10px;
`;
const RoomName = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const RoomItem = props => {
  const
    roomContext = useContext(RoomContext),
    roomId = roomContext.room ? roomContext.room.roomId : null;

  function setRoomId() {
    roomContext.setRoom(props.room);
  }

  return (
    <Container
      active={props.room.roomId === roomId}
      onClick={setRoomId}
    >
      <AvatarContainer>
        <Avatar
          style={{
            height: 50,
            width: 50
          }}
        />
      </AvatarContainer>
      <RoomName>{props.room.name}</RoomName>
    </Container>
  );
};

export default RoomItem;
