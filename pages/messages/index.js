import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import { useState } from "react";
// components
import RoomList from "../../components/messages/RoomList";
import { useRouter } from "next/router";
import MessageContainer from "../../components/messages/MessageContainer";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;

  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "rooms messages"
    "rooms messages";
`;

const Messages = props => {
  const router = useRouter();
  let [roomId, setRoomId] = useState(router.query.roomId);

  return (
    <Dashboard>
      <Container>
        <RoomList roomId={roomId} setRoomId={setRoomId} />
        <MessageContainer roomId={roomId} />
      </Container>
    </Dashboard>
  );
};

export default Messages;
