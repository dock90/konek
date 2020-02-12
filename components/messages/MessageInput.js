import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { useContext, useState } from 'react';
import { Input } from '@material-ui/core';
import {
  SEND_MESSAGE_MUTATION,
  MESSAGES_QUERY,
} from '../../queries/MessagesQueries';
import { RoomContext } from '../../contexts/RoomContext';

const InputBox = styled(Input)`
  width: 100%;
`;

const MessageInput = () => {
  const [input, setInput] = useState(''),
    roomContext = useContext(RoomContext),
    roomId = roomContext.room ? roomContext.room.roomId : null;

  const [sendMessageMutation] = useMutation(SEND_MESSAGE_MUTATION, {
    variables: { roomId: roomId },
    update(cache, { data: sendMessageMutation }) {
      const { messages } = cache.readQuery({
        query: MESSAGES_QUERY,
        variables: { roomId: roomId },
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
