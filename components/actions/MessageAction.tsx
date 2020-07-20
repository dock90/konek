import React from 'react';
import { ChatOutlined } from '@material-ui/icons';
import BaseAction, { ActionType } from './BaseAction';

interface Props {
  roomId: string;
  children: React.ReactNode;
  type?: ActionType;
}
const MessageAction: React.FC<Props> = ({ roomId, children, type }) => (
  <BaseAction
    href={`/messages?roomId=${roomId}`}
    icon={<ChatOutlined />}
    type={type}
  >
    {children}
  </BaseAction>
);

export default MessageAction;
