import React, { useState } from 'react';
import styled from 'styled-components';
import { GroupQuery_group_invitations } from '../../queries/types/GroupQuery';
import { Paper, IconButton } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import InvitationEdit from './InvitationEdit';

const InviteItem = styled(Paper)<{ active: boolean }>`
  padding: 3px 6px;
  display: flex;
  flex-direction: row;
  && {
    background-color: ${(props) => (!props.active ? 'lightgray' : undefined)};
  }
`;
const InviteDetails = styled.div`
  flex-grow: 1;
`;
const InviteActions = styled.div``;
const CodeDiv = styled.div``;
const CodeSpan = styled.span`
  border: solid ${(p) => p.theme.primary} 1px;
  border-radius: 2px;
  padding: 0 2px;
`;
const RoleSpan = styled.span`
  margin-left: 5px;
`;
const DescriptionDiv = styled.div`
  font-style: italic;
  color: darkgray;
`;

interface Props {
  invitation: GroupQuery_group_invitations;
  allowEdit: boolean;
}

const InvitationItem: React.FC<Props> = ({ invitation, allowEdit }) => {
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
      setShowEdit(false);
    },
    handleOpen = () => {
      if (!allowEdit) return;

      setShowEdit(true);
    };

  return (
    <>
      <InviteItem active={invitation.active}>
        <InviteDetails>
          <CodeDiv>
            {!invitation.active && <strong>(inactive) </strong>}
            <CodeSpan>{invitation.code}</CodeSpan>
            <RoleSpan>Default Role: {invitation.role.name}</RoleSpan>
          </CodeDiv>
          {invitation.description && (
            <DescriptionDiv>{invitation.description}</DescriptionDiv>
          )}
        </InviteDetails>
        {allowEdit && (
          <InviteActions>
            <IconButton onClick={handleOpen}>
              <Edit />
            </IconButton>
          </InviteActions>
        )}
      </InviteItem>
      {allowEdit && (
        <InvitationEdit
          open={showEdit}
          onClose={handleClose}
          invitation={invitation}
        />
      )}
    </>
  );
};

export default InvitationItem;
