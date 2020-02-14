import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useContext, useState } from "react";
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY
} from "../../queries/MessagesQueries";
import { RoomContext } from "../../contexts/RoomContext";
// components
import { CircularProgress, Input, TextareaAutosize } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const InputBox = styled(TextareaAutosize)`
  width: 100%;
  background-color: #f5f6f7;
  flex-grow: 1;
  border: 0;
  font: inherit;
`;

const SendButton = styled.div`
  margin: 0 5px;
  cursor: pointer;
`;

const MessageInput = props => {
  const [input, setInput] = useState(""),
    roomContext = useContext(RoomContext),
    roomId = roomContext.room ? roomContext.room.roomId : null;

  const [sending, setSending] = useState(false);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION, {
    variables: { roomId: roomId },
    update(cache, { data: mutationResponse }) {
      const { messages } = cache.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomId, after: null }
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
          roomId: roomId,
          after: null
        }
      });
    }
  });

  const sendMessage = async () => {
    if (input.length === 0) {
      return;
    }
    const inputVal = input;
    setInput("");
    setSending(true);
    await sendMessageMutation({ variables: { body: inputVal } });
    setSending(false);
  };

  const keyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
    if (props.updated instanceof Function) {
      props.updated();
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
        onKeyPress={e => keyPress(e)}
        onChange={handleChange}
        rowsMax={5}
      />
      {sending ? (
        <SendButton>
          <CircularProgress style={{ height: 20, width: 20 }} />
        </SendButton>
      ) : (
        <SendButton onClick={sendMessage}>
          <SendIcon
            style={{
              height: 20,
              width: 20
            }}
          />
        </SendButton>
      )}
    </Container>
  );
};

export default MessageInput;
