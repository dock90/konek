import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { MESSAGES_QUERY } from "../../queries/MessagesQueries";
import { RoomIdContext } from "./RoomIdContext";
// components
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Loading from "../Loading";

const Container = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Input = styled.div`
  flex-grow: 0;
  margin-top: 0.5rem;
`;

const Information = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const MessageContainer = () => {
  const roomIdContext = useContext(RoomIdContext);
  const { loading, error, data } = useQuery(MESSAGES_QUERY, {
    variables: {
      roomId: roomIdContext.roomId
    },
    // Don't execute if we don't have a room id.
    skip: !roomIdContext.roomId,
  });

  if (!roomIdContext.roomId) {
    return <Information>Select a conversation to display details</Information>;
  }

  if (loading) {
    return <Information><Loading/></Information>
  }

  if (error) {
    return <Information>{error}</Information>;
  }

  return (
    <Container>
      <MessageList messages={data.messages.data} />
      <Input>
        <MessageInput roomId={roomIdContext.roomId} />
      </Input>
    </Container>
  );
};

export default MessageContainer;
