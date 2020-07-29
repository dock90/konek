import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import {
  GroupInvitationUpdateMutation,
  GroupInvitationUpdateMutation_updateGroupInvitation,
  GroupInvitationUpdateMutationVariables,
} from '../../queries/types/GroupInvitationUpdateMutation';
import { TextField } from '../styles/TextField';
import { BaseButton } from '../styles/Button';
import { useMutation, useQuery } from '@apollo/client';
import { GROUP_QUERY, GROUPS_QUERY } from '../../queries/GroupQueries';
import { GroupsQuery } from '../../queries/types/GroupsQuery';
import { ROLES_QUERY } from '../../queries/RoleQueries';
import { RolesQuery } from '../../queries/types/RolesQuery';
import Loading from '../Loading';
import {
  CREATE_GROUP_INVITE_MUTATION,
  UPDATE_GROUP_INVITATION_MUTATION,
} from '../../queries/GroupInvitationQueries';
import {
  GroupInvitationCreateMutation,
  GroupInvitationCreateMutationVariables,
} from '../../queries/types/GroupInvitationCreateMutation';
import { FIELD_REQUIRED } from '../auth/messages';
import { ErrorMessage } from '../styles/Messages';
import { getError } from '../../lib/ErrorExtractor';

const Container = styled(Grid)`
  min-width: 400px !important;
`;

const codeRegex = /^[a-z0-9\.\-\_]+$/i;

interface Props {
  open: boolean;
  invitation?: GroupInvitationUpdateMutation_updateGroupInvitation;
  /**
   * Required for new groups.
   */
  groupId?: string;
  onClose: () => void;
}

const InvitationEdit: React.FC<Props> = ({
  open,
  onClose,
  invitation,
  groupId,
}) => {
  const isNew = !invitation;
  const [state, setState] = useState({
      id: invitation?.groupInvitationId || '',
      code: invitation?.code || '',
      description: invitation?.description || '',
      groupId: groupId || '',
      roleId: invitation?.role.roleId || '',
      active: true,
    }),
    [errors, setErrors] = useState<Record<string, string | null>>({}),
    [isSaving, setSaving] = useState(false);
  const {
      loading: groupsLoading,
      data: groupsData,
      error: groupsError,
    } = useQuery<GroupsQuery>(GROUPS_QUERY, {
      skip: !isNew,
    }),
    { loading: rolesLoading, data: rolesData, error: rolesError } = useQuery<
      RolesQuery
    >(ROLES_QUERY);

  const [createMutation] = useMutation<
      GroupInvitationCreateMutation,
      GroupInvitationCreateMutationVariables
    >(CREATE_GROUP_INVITE_MUTATION, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GROUP_QUERY,
          variables: {
            groupId: state.groupId,
          },
        },
      ],
    }),
    [updateMutation] = useMutation<
      GroupInvitationUpdateMutation,
      GroupInvitationUpdateMutationVariables
    >(UPDATE_GROUP_INVITATION_MUTATION);

  if (groupsLoading || rolesLoading) {
    return <Loading />;
  }

  if (groupsError || rolesError) {
    return <p>{groupsError || rolesError}</p>;
  }

  function handleCodeChange(e: ChangeEvent<HTMLInputElement>): void {
    handleChange(e);
    const value = e.target.value;
    if (value.length > 0 && !value.match(codeRegex)) {
      setErrors({
        ...errors,
        code: 'Invalid code!\n',
      });
    }
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
      network: '',
    });
  }
  function handleActiveChange(e: ChangeEvent<HTMLInputElement>): void {
    setState({
      ...state,
      [e.target.name]: e.target.checked,
    });
  }

  async function handleSave() {
    if (!state.code) {
      setErrors({
        ...errors,
        code: FIELD_REQUIRED + '\n',
      });
      return;
    }
    if (isNew && !state.groupId) {
      setErrors({
        ...errors,
        groupId: FIELD_REQUIRED,
      });
      return;
    }
    if (!state.roleId) {
      setErrors({
        ...errors,
        roleId: FIELD_REQUIRED,
      });
      return;
    }
    setSaving(true);

    if (isNew) {
      await createMutation({
        variables: state,
      });
    } else {
      try {
        await updateMutation({
          variables: state,
        });
      } catch (e) {
        const errorString = getError(e);
        setErrors({
          ...errors,
          network: errorString,
        });
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    handleClose();
  }
  const handleClose = () => {
    setErrors({});
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isNew && 'New Group Invitation'}
        {!isNew && `Edit ${invitation?.code}`}
      </DialogTitle>
      <DialogContent>
        <Container container spacing={1}>
          {errors.network && <ErrorMessage>{errors.network}</ErrorMessage>}
          <Grid item xs={6}>
            <TextField
              label="Code"
              placeholder="Code"
              name="code"
              value={state.code}
              onChange={handleCodeChange}
              disabled={isSaving}
              required
              error={!!errors.code}
              helperText={
                (errors.code || '') +
                'Can only contain letters, numbers, periods, dashes and underscores.'
              }
            />
          </Grid>
          {isNew && !groupId && (
            <Grid item xs={12}>
              <TextField
                select
                name="groupId"
                label="Group"
                value={state.groupId}
                onChange={handleChange}
                disabled={isSaving}
                required
              >
                {groupsData &&
                  groupsData.groups.map((g) => (
                    <MenuItem key={g.groupId} value={g.groupId}>
                      {g.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              select
              name="roleId"
              label="Role"
              value={state.roleId}
              onChange={handleChange}
              disabled={isSaving}
              required
            >
              {rolesData &&
                rolesData.roles.map((r) => (
                  <MenuItem key={r.roleId} value={r.roleId}>
                    {r.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              placeholder="Description"
              name="description"
              value={state.description}
              onChange={handleChange}
              disabled={isSaving}
            />
          </Grid>
          {!isNew && (
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="active"
                    checked={state.active}
                    onChange={handleActiveChange}
                  />
                }
                label="Active"
                disabled={isSaving}
              />
            </Grid>
          )}
        </Container>
      </DialogContent>
      <DialogActions>
        <BaseButton disabled={isSaving} onClick={handleClose}>
          <Cancel />
          &nbsp;Cancel
        </BaseButton>
        <BaseButton primary disabled={isSaving} onClick={handleSave}>
          <Save />
          &nbsp;Save
        </BaseButton>
      </DialogActions>
    </Dialog>
  );
};

export default InvitationEdit;
