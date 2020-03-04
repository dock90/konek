import { useQuery } from "@apollo/react-hooks";
import { Grid } from "@material-ui/core";
import { GROUPS_QUERY } from "../../queries/GroupQueries";
import Loading from "../Loading";
import styled from "styled-components";
import GroupItem from "./GroupItem";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GroupList = () => {
  const { loading, data, error } = useQuery(GROUPS_QUERY);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Grid container spacing={2}>
      {data.groups.map(group => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <GroupItem
            key={group.groupId}
            group={group}
            groupList={data.groups}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default GroupList;
