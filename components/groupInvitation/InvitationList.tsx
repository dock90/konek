import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { GroupQuery_group_invitations } from '../../queries/types/GroupQuery';
import InvitationItem from './InvitationItem';

const ContainerDiv = styled.div`
  margin-left: 4px;
  width: 100%;
`;

interface Props {
  invitations: Array<GroupQuery_group_invitations>;
  allowEdit: boolean;
}
const InvitationList: React.FC<Props> = ({ invitations, allowEdit }) => {
  return (
    <ContainerDiv>
      <Grid container spacing={1}>
        {invitations.map((i) => (
          <Grid item xs={12} md={6} lg={4} key={i.groupInvitationId}>
            <InvitationItem invitation={i} allowEdit={allowEdit} />
          </Grid>
        ))}
      </Grid>
    </ContainerDiv>
  );
};

export default InvitationList;
