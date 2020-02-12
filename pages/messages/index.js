import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
import { useState, Component } from "react";
// components
import RoomList from "../../components/messages/RoomList";
import { useRouter } from "next/router";
import MessageContainer from "../../components/messages/MessageContainer";
import { RoomContext } from "../../contexts/RoomContext";

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

  let [room, setRoom] = useState(null);

  const roomIdValue = {
    room: room,
    setRoom: newRoom => {
      setRoom(newRoom);
    }
  };

  return (
    <Dashboard>
      <Container>
        <RoomContext.Provider value={roomIdValue}>
          <RoomList />
          <MessageContainer />
        </RoomContext.Provider>
      </Container>
    </Dashboard>
  );
};

export default Messages;
