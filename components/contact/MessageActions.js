import { JustifyRight } from '../styles/LayoutStyles';
import MessageAction from '../actions/MessageAction';
import { useContext } from 'react';
import { ContactContext } from '../../contexts/ContactContext';
import { ActionType } from '../actions/BaseAction';

export function MessageActions() {
  const { profile } = useContext(ContactContext);
  return (
    <JustifyRight>
      <MessageAction roomId={profile.roomId} type={ActionType.button}>
        Send Message
      </MessageAction>
    </JustifyRight>
  );
}
