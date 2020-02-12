import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { MESSAGES_QUERY } from "../../queries/MessagesQueries";
import { RoomContext } from "../../contexts/RoomContext";
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
  const roomContext = useContext(RoomContext);
  const roomId = roomContext.room ? roomContext.room.roomId : null;

  const { loading, error, data } = useQuery(MESSAGES_QUERY, {
    variables: {
      roomId: roomId,
    },
    // Don't execute if we don't have a room id.
    skip: !roomId,
  });

  if (!roomId) {
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
        <MessageInput roomId={roomContext.room.roomId} />
      </Input>
    </Container>
  );
};

export default MessageContainer;
