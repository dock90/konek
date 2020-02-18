import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import { useState } from "react";
// components
import RoomList from "../../components/messages/RoomList";
import { useRouter } from "next/router";
import MessageContainer from "../../components/messages/MessageContainer";
import { RoomIdContext } from "../../contexts/RoomIdContext";

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

const Messages = () => {
  const router = useRouter();

  let [roomId, setRoomId] = useState(null);

  const roomValue = {
    roomId: roomId,
    setRoomId: newRoomId => {
      setRoomId(newRoomId);
    }
  };

  return (
    <Dashboard>
      <Container>
        <RoomIdContext.Provider value={roomValue}>
          <RoomList />
          <MessageContainer />
        </RoomIdContext.Provider>
      </Container>
    </Dashboard>
  );
};

export default Messages;
