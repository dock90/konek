import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { useContext, useState } from "react";
import { Input } from "@material-ui/core";
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY
} from "../../queries/MessagesQueries";
import { RoomContext } from "../../contexts/RoomContext";

const InputBox = styled(Input)`
  width: 100%;
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

  const keyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessageMutation({ variables: { body: input } });
      setInput("");
    }
  };

  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <div>
      <InputBox
        value={input}
        onKeyUp={e => keyPress(e)}
        onChange={handleChange}
      />
    </div>
  );
};

export default MessageInput;
