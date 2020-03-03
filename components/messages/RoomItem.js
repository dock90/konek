import styled from "styled-components";
import { useContext } from "react";
import { RoomIdContext } from "../../contexts/RoomIdContext";
// material
import { Avatar } from "@material-ui/core";
import { Badge } from "@material-ui/core";

const Container = styled.div`
  padding: 8px 8px 8px ${props => (props.active ? "8px" : "13px")};
  border-left: ${props => (props.active ? "solid 5px #4A4A4A" : "")};
  cursor: pointer;
  display: flex;
  background-color: #fafafa;
  margin-bottom: 1px;
`;

const RoomName = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
const QtyUnread = styled(Badge)`
  flex-grow: 0;
  margin-right: 10px;
`;

const RoomItem = props => {
  const roomIdContext = useContext(RoomIdContext),
    roomId = roomIdContext.roomId;

  function selectRoom() {
    roomIdContext.setRoomId(props.room.roomId);
  }

  return (
    <Container active={props.room.roomId === roomId} onClick={selectRoom}>
      <QtyUnread
        badgeContent={props.room.qtyUnread}
        color="error"
        invisible={props.room.qtyUnread === 0}
        overlap="circle"
      >
        <Avatar
          style={{
            height: 50,
            width: 50
          }}
        />
      </QtyUnread>
      <RoomName>{props.room.name}</RoomName>
    </Container>
  );
};

export default RoomItem;
