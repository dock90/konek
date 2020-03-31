import styled from "styled-components";
import Layout from "../../components/Layout";
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
  grid-template-areas: "rooms messages";

  @media screen and (max-width: 800px) {
    grid-template-columns: 45% 55%;
  }
`;

const Messages = () => {
  const router = useRouter();

  let [roomId, setRoomId] = useState(router.query.roomId);

  const roomValue = {
    roomId: roomId,
    setRoomId: newRoomId => {
      setRoomId(newRoomId);
    }
  };

  return (
    <Layout>
      <Container>
        <RoomIdContext.Provider value={roomValue}>
          <RoomList />
          <MessageContainer />
        </RoomIdContext.Provider>
      </Container>
    </Layout>
  );
};

export default Messages;
