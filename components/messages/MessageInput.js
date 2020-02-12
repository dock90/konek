import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { useContext, useState } from 'react';
import { Input } from '@material-ui/core';
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY,
} from '../../queries/MessagesQueries';
import { RoomIdContext } from './RoomIdContext';

const InputBox = styled(Input)`
  width: 100%;
`;

const MessageInput = () => {
  const [input, setInput] = useState('');
  const roomIdContext = useContext(RoomIdContext);

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION, {
    variables: { roomId: roomIdContext.roomId },
    update(cache, { data: sendMessageMutation }) {
      const { messages } = cache.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomIdContext.roomId },
      });
      // New messages go at the top of the list.
      messages.data.unshift(sendMessageMutation.sendMessage);
    },
  });

  const keyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessageMutation({ variables: { body: input } });
      setInput('');
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
