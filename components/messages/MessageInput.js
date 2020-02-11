import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY
} from "../../queries/MessagesQueries";

const Input = styled.input`
  width: 100%;
`;

const MessageInput = props => {
  let input;
  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION, {
      variables: { roomId: props.roomId },
      update(cache, { data: sendMessageMutation }) {
        const { messages } = cache.readQuery({
          query: MESSAGES_QUERY,
          variables: { roomId: props.roomId }
        });
        // New messages go at the top of the list.
        messages.data.unshift(sendMessageMutation.sendMessage);
      }
    }),
    sendMessage = () => {
      sendMessageMutation({ variables: { body: input.value } });
    };

  const keyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      input.value = "";
    }
  };

  return (
    <div>
      <Input ref={node => (input = node)} onKeyUp={e => keyPress(e)} />
    </div>
  );
};

export default MessageInput;
