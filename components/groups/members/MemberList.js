import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import Loading from "../../Loading";
import { GROUP_MEMBERS_QUERY } from "../../../queries/GroupQueries";
import MemberItem from "./MemberItem";
import { useMemo, useState } from "react";
import { Paper } from "@material-ui/core";
import { H3 } from "../../styles/Typography";

const Group = styled(Paper)`
  background-color: white;
  border-radius: 5px;
  padding: 5px;

  :not(:first-child) {
    margin-top: 15px;
  }
`;
const GroupHeader = styled(H3)`
  margin: 0 15px 5px;
`;

const MemberList = ({ groupId }) => {
  const { loading, data, error } = useQuery(GROUP_MEMBERS_QUERY, {
    variables: { groupId }
  });
  const [admins, setAdmins] = useState([]),
    [members, setMembers] = useState([]);

  useMemo(() => {
    if (loading || error) {
      return;
    }
    const admins = [],
      members = [];

    for (const member of data.group.members) {
      if (["admin", "manager"].includes(member.role.roleId)) {
        admins.push(member);
      } else {
        members.push(member);
      }
    }
    setAdmins(admins);
    setMembers(members);
  }, [loading, data]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {admins.length > 0 && (
        <Group>
          <GroupHeader>Admins & Managers</GroupHeader>
          {admins.map(m => (
            <MemberItem key={m.memberId} member={m} />
          ))}
        </Group>
      )}
      {members.length > 0 && (
        <Group>
          <GroupHeader>Members</GroupHeader>
          {members.map(m => (
            <MemberItem key={m.memberId} member={m} />
          ))}
        </Group>
      )}
    </div>
  );
};

export default MemberList;
