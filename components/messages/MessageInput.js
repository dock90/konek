import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useContext, useState } from "react";
import { Input } from "@material-ui/core";
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY
} from "../../queries/MessagesQueries";
import { RoomContext } from "../../contexts/RoomContext";
// components
import SendIcon from "@material-ui/icons/Send";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const InputBox = styled(Input)`
  width: 100%;
  background-color: #f5f6f7;
  flex-grow: 1;
`;

const SendButton = styled.div`
  margin: 0 5px;
  cursor: pointer;
`;

const MessageInput = () => {
  const [input, setInput] = useState(""),
    roomContext = useContext(RoomContext),
    roomId = roomContext.room ? roomContext.room.roomId : null;

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION, {
    variables: { roomId: roomId },
    update(cache, { data: mutationResponse }) {
      const { messages } = cache.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomId }
      });

      // Write to cache so
      cache.writeQuery({
        query: MESSAGES_QUERY,
        data: {
          messages: {
            ...messages,
            data: [mutationResponse.sendMessage, ...messages.data]
          }
        },
        variables: {
          roomId: roomId
        }
      });
    }
  });

  const sendMessage = () => {
    if (input.length === 0) {
      return;
    }
    sendMessageMutation({variables: {body: input}});
    setInput("");
  };

  const keyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <Container>
      <InputBox
        placeholder="Message..."
        value={input}
        onKeyUp={e => keyPress(e)}
        onChange={handleChange}
      />
      <SendButton onClick={sendMessage}>
        <SendIcon
          style={{
            height: 20,
            width: 20
          }}
        />
      </SendButton>
    </Container>
  );
};

export default MessageInput;
