import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import MessageItem from './MessageItem';
import { MESSAGES_QUERY } from '../../queries/MessagesQueries';

const MessageContainer = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: stretch;
`;

const MessageList = props => (
  <MessageContainer>
    {props.messages.map(m => (
      <MessageItem message={m} key={m.messageId} />
    ))}
  </MessageContainer>
);
export default MessageList;
