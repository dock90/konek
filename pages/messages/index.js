import styled from 'styled-components';
import { useState } from 'react';
// components
import Layout from '../../components/Layout';
import { RoomList } from '../../components/messages/RoomList';
import { useRouter } from 'next/router';
import MessageContainer from '../../components/messages/MessageContainer';
import { RoomIdContext } from '../../contexts/RoomIdContext';
import { ContentContainer } from '../../components/styles/PageStyles';

// styles
const Container = styled(ContentContainer)`
  padding: 0;
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-areas: 'rooms messages';

  @media screen and (max-width: 800px) {
    grid-template-columns: 45% 55%;
  }
`;

const Messages = () => {
  const router = useRouter();

  let [roomId, setRoomId] = useState(router.query.roomId);

  const roomValue = {
    roomId: roomId,
    setRoomId: (newRoomId) => {
      setRoomId(newRoomId);
    },
  };

  return (
    <Layout>
      <RoomIdContext.Provider value={roomValue}>
        <Container>
          <RoomList />
          <MessageContainer />
        </Container>
      </RoomIdContext.Provider>
    </Layout>
  );
};

export default Messages;
