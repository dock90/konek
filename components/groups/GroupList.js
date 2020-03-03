import { useQuery } from "@apollo/react-hooks";
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
    <ListContainer>
      {data.groups.map(group => (
        <GroupItem key={group.groupId} group={group} />
      ))}
    </ListContainer>
  );
};

export default GroupList;
