import { ChatOutlined } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";

const Container = styled(Paper)`
  margin: 5px;
  width: 250px;
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
  font-size: .9em;
  font-style: italic;
  color: grey;
`;
const Body = styled(ContainerItem)`
  flex-grow: 1;
  white-space: pre-wrap;
  // So the text is top-aligned. Surely there is a more flex-box way to do this, but I can't find it.
  display: table-cell;
  vertical-align: top;
`;
const Footer = styled(ContainerItem)``;

const GroupItem = ({ group, style }) => {
  return (
    <Container style={style}>
      <Header>
        <Link href={`/groups/[id]`} as={`/groups/${group.groupId}`}>
          <a>
            <Header>
              <Avatar style={{ width: 40, height: 40, marginRight: 5 }} />
              <div>
                <GroupName>{group.name}</GroupName>
                {group.defaultRole && <DefaultRole>Default Role: {group.defaultRole.name}</DefaultRole>}
              </div>
            </Header>
          </a>
        </Link>
      </Header>
      <Body>{group.description || <em>no description</em>}</Body>
      <Footer>
        <Link href={`/messages?roomId=${group.roomId}`} passHref={true}>
          <a>
            <ChatOutlined /> Message Group
          </a>
        </Link>
      </Footer>
    </Container>
  );
};

export default GroupItem;
