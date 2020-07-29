import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import { GROUPS_QUERY } from '../../queries/GroupQueries';
import Loading from '../Loading';
import GroupItem from './GroupItem';
import { GroupsQuery } from '../../queries/types/GroupsQuery';

const GroupList = () => {
  const { loading, data, error } = useQuery<GroupsQuery>(GROUPS_QUERY);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid container spacing={2}>
      {data &&
        data.groups.map((group) => (
          <Grid key={group.groupId} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <GroupItem
              group={group}
              groupList={data.groups}
              showInvitations={false}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default GroupList;
