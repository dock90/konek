import { Paper } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import MessageAction from "../actions/MessageAction";
import { useMemo } from "react";
import { hierarchyLabel } from "./hierarchyLabel";
import AvatarPicture from "../assets/AvatarPicture";

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const ContainerItem = styled.div`
  padding: 5px;
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
`;

const Header = styled(ContainerItem)`
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
const Body = styled(ContainerItem)`
  flex-grow: 1;
  white-space: pre-wrap;
  // So the text is top-aligned. Surely there is a more flex-box way to do this, but I can't find it.
  display: table-cell;
  vertical-align: top;
`;
const Footer = styled(ContainerItem)`
  justify-content: flex-end;
  padding-right: 10px;
`;

const GroupItem = ({ group, groupList }) => {
  const name = useMemo(() => {
    if (!groupList) {
      return "";
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
      <Body>
        {name.length > 0 && <Hierarchy>Parent Groups: {name}</Hierarchy>}
        {group.description}
      </Body>
      <Footer>
        <MessageAction roomId={group.roomId}>Message Group</MessageAction>
      </Footer>
    </Container>
  );
};

export default GroupItem;
