import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useMemo, useState } from "react";
import { useRouter } from "next/router";

// queries
import {
  GROUP_UPDATE_MUTATION,
  GROUP_QUERY,
  GROUP_CREATE_MUTATION,
  GROUPS_QUERY
} from "../../queries/GroupQueries";
import { ROLES_QUERY } from "../../queries/RoleQueries";

// components
import { BorderButton } from "../material/StyledButton";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem
} from "@material-ui/core";
import GroupItem from "./GroupItem";
import Loading from "../Loading";
import { H1, H4 } from "../styles/Typography";
import GroupDetails from "./Details";
import { hierarchyLabel } from "./hierarchyLabel";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ({ groupId }) => {
  const isNew = groupId === "new";

  const router = useRouter();
  const { loading, data } = useQuery(GROUP_QUERY, {
    variables: { groupId },
    skip: isNew
  });
  const { loading: rolesLoading, data: rolesData } = useQuery(ROLES_QUERY);
  const { loading: groupsLoading, data: groupsData } = useQuery(GROUPS_QUERY);

  const [saveGroup] = useMutation(GROUP_UPDATE_MUTATION);
  const [createGroup] = useMutation(GROUP_CREATE_MUTATION, {
    refetchQueries: [{ query: GROUPS_QUERY }]
  });

  const [group, setGroup] = useState({
    name: "",
    description: "",
    defaultRoleId: "",
    parentGroupId: ""
  });
  const [updateGroup, setUpdatedGroup] = useState({});
  const [editMode, setEditMode] = useState(isNew);

  const manageGroups = useMemo(() => {
    if (groupsLoading) {
      return;
    }
    const groupList = groupsData.groups.filter(g => {
      if (!g.canManage) {
        return false;
      }
      if (
        g.groupId === groupId ||
        (g.ancestors && g.ancestors.find(ag => ag.groupId === groupId))
      ) {
        // Skip ourselves and any of our children.
        return false;
      }
      return true;
    });

    const results = [];
    for (const g of groupList) {
      results.push({
        groupId: g.groupId,
        name: hierarchyLabel(g, groupList, true)
      });
    }

    return results;
  }, [groupsData, groupsLoading]);

  useMemo(() => {
    if (data && data.group && manageGroups) {
      if (data.group.description === null) {
        // React doesn't like null values
        data.group.description = "";
      }
      const defaultRoleId = data.group.defaultRole
        ? data.group.defaultRole.roleId
        : "";
      let parentGroupId = "";
      if (manageGroups.length > 0 && data.group.ancestors) {
        const pGID =
          data.group.ancestors[data.group.ancestors.length - 1].groupId;
        if (manageGroups.find(g => g.groupId === pGID)) {
          // We can only set the parent group ID if we can manage the parent.
          parentGroupId = pGID;
        }
      }
      setGroup({
        ...data.group,
        defaultRoleId,
        parentGroupId
      });
    }
  }, [data, manageGroups]);

  if (loading || rolesLoading || groupsLoading) {
    return <Loading />;
  }

  const required = [];
  let editRowOneWidth = 6;
  if (isNew) {
    required.push(...["name", "defaultRoleId", "parentGroupId"]);
    editRowOneWidth = 4;
  } else if (group.parentGroupId) {
    editRowOneWidth = 4;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.keys(updateGroup).length === 0) {
      setEditMode(false);
      // Nothing has changed! Why update?
      return;
    }

    if (isNew) {
      const { data } = await createGroup({
        variables: updateGroup
      });
      await router.replace(
        "/groups/[id]",
        `/groups/${data.createGroup.groupId}`
      );
      setEditMode(false);
      return;
    }

    setEditMode(false);
    await saveGroup({
      variables: {
        ...updateGroup,
        groupId
      }
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setGroup({
      ...group,
      [name]: value
    });

    setUpdatedGroup({
      ...updateGroup,
      [name]: value
    });
  };

  return (
    <div>
      <Header>
        <H1>{!editMode ? "" : isNew ? "New" : "Edit"} Group</H1>
        {!editMode && !isNew && (
          <BorderButton onClick={() => setEditMode(true)}>
            Edit Group
          </BorderButton>
        )}
      </Header>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {!editMode && (
            <Grid item xs={12}>
              <GroupItem
                group={group}
                groupList={groupsData.groups}
              />
            </Grid>
          )}
          {editMode && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <H4>Group Information</H4>
                  <Grid container spacing={2}>
                    <Grid item xs={editRowOneWidth}>
                      <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        required={required.includes("name")}
                        value={group.name}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={editRowOneWidth}>
                      <TextField
                        name="defaultRoleId"
                        label="Default Role"
                        select
                        value={group.defaultRoleId}
                        required={required.includes("defaultRoleId")}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ width: "100%" }}
                      >
                        {rolesData.roles.map(r => (
                          <MenuItem key={r.roleId} value={r.roleId}>
                            {r.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    {(group.parentGroupId ||
                      required.includes("parentGroupId")) && (
                      <Grid item xs={editRowOneWidth}>
                        <TextField
                          name="parentGroupId"
                          label="Parent Group"
                          select
                          value={group.parentGroupId}
                          required={required.includes("parentGroupId")}
                          onChange={handleChange}
                          variant="outlined"
                          style={{ width: "100%" }}
                        >
                          {manageGroups.map(g => (
                            <MenuItem key={g.groupId} value={g.groupId}>
                              {g.name}
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
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BorderButton type="submit">Save Group</BorderButton>
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
