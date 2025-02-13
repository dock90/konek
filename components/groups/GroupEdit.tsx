import React, { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  GROUP_UPDATE_MUTATION,
  GROUP_QUERY,
  GROUP_CREATE_MUTATION,
  GROUPS_QUERY,
} from '../../queries/GroupQueries';
import { ROLES_QUERY } from '../../queries/RoleQueries';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from '@material-ui/core';
import { Edit, Add } from '@material-ui/icons';
import GroupItem from './GroupItem';
import Loading from '../Loading';
import { H1, H4 } from '../styles/Typography';
import GroupDetails from './Details';
import { useGroupList } from '../../hooks/useGroupList';
import AvatarUpload from '../assets/AvatarUpload';
import { BaseButton } from '../styles/Button';
import { RolesQuery } from '../../queries/types/RolesQuery';
import {
  GroupQuery,
  GroupQuery_group,
  GroupQuery_group_picture,
  GroupQueryVariables,
} from '../../queries/types/GroupQuery';
import { FlexContainerRow } from '../styles/LayoutStyles';
import InvitationEdit from '../groupInvitation/InvitationEdit';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GroupH4 = styled(H4)`
  margin-bottom: 15px;
`;

interface Props {
  groupId: string;
}

const GroupEdit: React.FC<Props> = ({ groupId }) => {
  const isNew = groupId === 'new';

  const router = useRouter();
  const { loading, data } = useQuery<GroupQuery, GroupQueryVariables>(
    GROUP_QUERY,
    {
      variables: { groupId },
      skip: isNew,
    },
  );
  const { loading: rolesLoading, data: rolesData } = useQuery<RolesQuery>(
    ROLES_QUERY,
  );
  const { loading: groupsLoading, data: manageGroups, groups } = useGroupList({
    manageOnly: true,
    excludeGroupId: isNew ? false : groupId,
    includeGroupName: true,
  });

  const [saveGroup] = useMutation(GROUP_UPDATE_MUTATION);
  const [createGroup] = useMutation(GROUP_CREATE_MUTATION, {
    refetchQueries: [{ query: GROUPS_QUERY }],
  });

  type GroupStateType = GroupQuery_group & {
    defaultRoleId: string;
    parentGroupId: string;
  };
  const [group, setGroup] = useState<GroupStateType>({
    name: '',
    description: '',
    defaultRoleId: '',
    parentGroupId: '',
    picture: null,
  } as GroupStateType);
  const [updatedGroup, setUpdatedGroup] = useState({});
  const [newInvite, setNewInvite] = useState(false);
  const [editMode, setEditMode] = useState(isNew);

  useEffect(() => {
    if (data && data.group && manageGroups) {
      const defaultRoleId = data.group.defaultRole
        ? data.group.defaultRole.roleId
        : '';
      let parentGroupId = '';
      if (manageGroups.length > 0 && data.group.ancestors) {
        const pGID =
          data.group.ancestors[data.group.ancestors.length - 1].groupId;
        if (manageGroups.find((g) => g.groupId === pGID)) {
          // We can only set the parent group ID if we can manage the parent.
          parentGroupId = pGID;
        }
      }
      setGroup({
        ...data.group,
        defaultRoleId,
        parentGroupId,
      });
    }
  }, [data, manageGroups]);

  if (loading || rolesLoading || groupsLoading) {
    return <Loading />;
  }

  const required = [];
  let editRowOneWidth: 3 | 5 = 5;
  if (isNew) {
    required.push(...['name', 'defaultRoleId', 'parentGroupId']);
    editRowOneWidth = 3;
  } else if (group.parentGroupId) {
    editRowOneWidth = 3;
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(updatedGroup).length === 0) {
      setEditMode(false);
      // Nothing has changed! Why update?
      return;
    }

    if (isNew) {
      const { data } = await createGroup({
        variables: updatedGroup,
      });
      await router.replace(
        '/groups/[id]',
        `/groups/${data.createGroup.groupId}`,
      );
      setEditMode(false);
      return;
    }

    setEditMode(false);
    await saveGroup({
      variables: {
        ...updatedGroup,
        groupId,
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setGroup({
      ...group,
      [name]: value,
    });

    setUpdatedGroup({
      ...updatedGroup,
      [name]: value,
    });
  };

  const updateAvatar = async (info: Record<string, string>) => {
    const picture = {
      format: info.format,
      publicId: info.public_id,
      resourceType: info.resource_type,
      type: info.type,
    } as GroupQuery_group_picture;

    setGroup({
      ...group,
      picture,
    });

    setUpdatedGroup({
      ...updatedGroup,
      picture,
    });

    if (isNew) return;

    await saveGroup({
      variables: {
        groupId,
        picture,
      },
    });
  };

  return (
    <div>
      <Header>
        <H1>{!editMode ? '' : isNew ? 'New' : 'Edit'} Group</H1>
        {!editMode && !isNew && (
          <FlexContainerRow>
            <BaseButton onClick={() => setNewInvite(true)}>
              <Add />
              &nbsp;Create Invitation Code
            </BaseButton>
            <InvitationEdit
              open={newInvite}
              onClose={() => {
                setNewInvite(false);
              }}
              groupId={groupId}
            />
            <BaseButton onClick={() => setEditMode(true)}>
              <Edit />
              &nbsp;Edit Group
            </BaseButton>
          </FlexContainerRow>
        )}
      </Header>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {!editMode && (
            <Grid item xs={12}>
              <GroupItem group={group} groupList={groups} />
            </Grid>
          )}
          {editMode && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <GroupH4>Group Information</GroupH4>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={1}>
                      <AvatarUpload
                        avatarType="group"
                        folder="groups"
                        picture={group.picture}
                        size={50}
                        onSuccess={updateAvatar}
                      />
                    </Grid>
                    <Grid item xs={editRowOneWidth}>
                      <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        required={required.includes('name')}
                        value={group.name}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={editRowOneWidth}>
                      <TextField
                        name="defaultRoleId"
                        label="Default Role"
                        select
                        value={group.defaultRoleId}
                        required={required.includes('defaultRoleId')}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ width: '100%' }}
                      >
                        {rolesData &&
                          rolesData.roles.map((r) => (
                            <MenuItem key={r.roleId} value={r.roleId}>
                              {r.name}
                            </MenuItem>
                          ))}
                      </TextField>
                    </Grid>
                    {(group.parentGroupId ||
                      required.includes('parentGroupId')) && (
                      <Grid item xs={editRowOneWidth}>
                        <TextField
                          name="parentGroupId"
                          label="Parent Group"
                          select
                          value={group.parentGroupId}
                          required={required.includes('parentGroupId')}
                          onChange={handleChange}
                          variant="outlined"
                          style={{ width: '100%' }}
                        >
                          {manageGroups.map((g) => (
                            <MenuItem key={g.groupId} value={g.groupId}>
                              {g.hierarchy}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={group.description}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BaseButton type="submit">Save Group</BaseButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </form>
      {!isNew && <GroupDetails groupId={groupId} />}
    </div>
  );
};

export default GroupEdit;
