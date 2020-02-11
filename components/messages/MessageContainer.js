import styled from "styled-components";
// components
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Container = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const List = styled.div`
  flex-grow: 1;
`;
const Input = styled.div`
  flex-grow: 0;
  margin-top: .5rem;
`;

const NoRoomSelected = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const MessageContainer = props => {
  if (!props.roomId) {
    return (
      <NoRoomSelected>Select a conversation to display details</NoRoomSelected>
    );
  }
  return (
    <Container>
      <List>
        <MessageList roomId={props.roomId}/>
      </List>
      <Input>
        <MessageInput roomId={props.roomId}/>
      </Input>
    </Container>
  );
};

export default MessageContainer;
