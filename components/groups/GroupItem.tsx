import React from 'react';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import Link from 'next/link';
import MessageAction from '../actions/MessageAction';
import { useMemo } from 'react';
import { hierarchyLabel } from './hierarchyLabel';
import AvatarPicture from '../assets/AvatarPicture';
import { GroupQuery_group } from '../../queries/types/GroupQuery';
import InvitationList from '../groupInvitation/InvitationList';
import { H5 } from '../styles/Typography';

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const ContainerItemDiv = styled.div`
  padding: 5px;
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
`;

const Header = styled(ContainerItemDiv)`
  border-top: 0;
`;
const GroupName = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`;
const DefaultRole = styled.div`
  font-size: 0.9em;
  font-style: italic;
  color: grey;
`;
const Hierarchy = styled(DefaultRole)`
  font-size: 0.8em;
  font-style: italic;
`;
const Body = styled(ContainerItemDiv)`
  flex-grow: 1;
  white-space: pre-wrap;
  // So the text is top-aligned. Surely there is a more flex-box way to do this, but I can't find it.
  display: table-cell;
  vertical-align: top;
`;
const InvitationsDiv = styled(ContainerItemDiv)`
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;
const Footer = styled(ContainerItemDiv)`
  justify-content: flex-end;
  padding-right: 10px;
`;

interface Props {
  group: GroupQuery_group;
  groupList: Array<GroupQuery_group>;
  showInvitations?: boolean;
}

const GroupItem: React.FC<Props> = ({
  group,
  groupList,
  showInvitations = true,
}) => {
  const name = useMemo(() => {
    if (!groupList) {
      return '';
    }

    return hierarchyLabel(group, groupList, false);
  }, [group, groupList]);

  return (
    <Container>
      <Header>
        <Link href={`/groups/[id]`} as={`/groups/${group.groupId}`}>
          <a>
            <Header>
              <AvatarPicture
                size={40}
                picture={group.picture}
                style={{ marginRight: 5 }}
              />
              <div>
                <GroupName>{group.name}</GroupName>
                {group.defaultRole && (
                  <DefaultRole>
                    Default Role: {group.defaultRole.name}
                  </DefaultRole>
                )}
              </div>
            </Header>
          </a>
        </Link>
      </Header>
      {(name || group.description || !showInvitations) && (
        <Body>
          {name.length > 0 && <Hierarchy>Parent Groups: {name}</Hierarchy>}
          {group.description}
        </Body>
      )}
      {showInvitations && group.invitations && group.invitations.length > 0 && (
        <InvitationsDiv>
          <div style={{ width: '100%' }}>
            <H5>Group Invitations</H5>
          </div>
          <div style={{ width: '100%' }}>
            <InvitationList invitations={group.invitations} allowEdit />
          </div>
        </InvitationsDiv>
      )}
      <Footer>
        <MessageAction roomId={group.roomId}>Message Group</MessageAction>
      </Footer>
    </Container>
  );
};

export default GroupItem;
