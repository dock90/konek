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
`;

const InputWrapper = styled.div`
  flex-grow: 0;
  height: 5rem;
  background-color: white;
`;

const MLWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: #f4f6f8;
  position: relative;
`;

const MLContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  //display: flex;
`;

const Input = styled.div`
  flex-grow: 0;
  margin-top: 0.5rem;
  width: 100%;
  border-top: solid 2px #bbbbbb;
  background-color: whitesmoke;
  padding: 5px;
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
      roomId: roomId
    },
    // Don't execute if we don't have a room id.
    skip: !roomId
  });

  if (!roomId) {
    return <Information>Select a conversation to display details</Information>;
  }

  if (loading) {
    return (
      <Information>
        <Loading />
      </Information>
    );
  }

  if (error) {
    return <Information>{error}</Information>;
  }

  const messages = [...data.messages.data].reverse();

  return (
    <Container>
      <MLWrapper>
        <MLContainer>
          <MessageList messages={messages} />
        </MLContainer>
      </MLWrapper>
      <InputWrapper>
        <Input>
          <MessageInput roomId={roomContext.room.roomId} />
        </Input>
      </InputWrapper>
    </Container>
  );
};

export default MessageContainer;
