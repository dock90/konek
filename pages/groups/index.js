import styled from "styled-components";
import Dashboard from "../../components/Dashboard";
// components
import { H1, LinkText } from "../../components/styles/Typography";
import GroupList from "../../components/groups/GroupList";
import { BorderButton } from "../../components/material/StyledButton";
import Link from "next/link";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Groups = () => (
  <Dashboard>
    <Container>
      <Header>
        <H1>Groups</H1>
        <Link href="/groups/new">
          <LinkText>
            <BorderButton>New Group</BorderButton>
          </LinkText>
        </Link>
      </Header>
      <GroupList />
    </Container>
  </Dashboard>
);

export default Groups;
