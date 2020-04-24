import styled from "styled-components";
import PropTypes from "prop-types";
import { useContext } from "react";
import { RoomIdContext } from "../../contexts/RoomIdContext";
// material
import { Badge } from "@material-ui/core";
import AvatarPicture from "../assets/AvatarPicture";

const Container = styled.div`
  padding: 8px 8px 8px ${props => (props.active ? "9px" : "13px")};
  border-left: ${props =>
    props.active ? `solid 4px ${props.theme.primary}` : ""};
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

const RoomItem = ({ room }) => {
  const { roomId, setRoomId } = useContext(RoomIdContext);

  function selectRoom() {
    setRoomId(room.roomId);
  }

  return (
    <Container active={room.roomId === roomId} onClick={selectRoom}>
      <QtyUnread
        badgeContent={room.qtyUnread}
        color="error"
        invisible={room.qtyUnread === 0}
        overlap="circle"
      >
        <AvatarPicture size={45} picture={room.picture} />
      </QtyUnread>
      <RoomName>{room.name}</RoomName>
    </Container>
  );
};

RoomItem.propTypes = {
  room: PropTypes.object.isRequired
};

export default RoomItem;
