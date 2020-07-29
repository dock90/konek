import React from 'react';
import BaseAction from './BaseAction';
import { PersonOutlined } from '@material-ui/icons';

interface Props {
  contactId: string;
  name: string;
}

const ContactView: React.FC<Props> = ({ contactId, name }) => {
  return (
    <BaseAction
      href={'/contacts/[id]'}
      as={`/contacts/${contactId}`}
      icon={<PersonOutlined />}
    >{`View ${name}`}</BaseAction>
  );
};

export default ContactView;
