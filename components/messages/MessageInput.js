import styled from "styled-components";
import { useContext, useState } from "react";
import { RoomIdContext } from "../../contexts/RoomIdContext";
// components
import { CircularProgress, Input, TextareaAutosize } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { sendMessage } from "../../service/Messages";

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
    roomIdContext = useContext(RoomIdContext),
    roomId = roomIdContext.roomId;

  const [sending, setSending] = useState(false);

  const processMessage = async () => {
    if (input.length === 0) {
      return;
    }
    const inputVal = input;
    setInput("");
    setSending(true);
    await sendMessage(roomId, inputVal);
    setSending(false);
    if (props.updated instanceof Function) {
      props.updated();
    }
  };

  const keyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      processMessage();
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
        onFocus={props.focus}
        onBlur={props.blur}
      />
      {sending ? (
        <SendButton>
          <CircularProgress style={{ height: 20, width: 20 }} />
        </SendButton>
      ) : (
        <SendButton onClick={processMessage}>
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
