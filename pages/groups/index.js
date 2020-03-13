import Dashboard from "../../components/Dashboard";
// components
import { H1, LinkText } from "../../components/styles/Typography";
import GroupList from "../../components/groups/GroupList";
import { BorderButton } from "../../components/material/StyledButton";
import Link from "next/link";
import {
  ContentContainer,
  ContentHeader
} from "../../components/styles/PageStyles";

const Groups = () => (
  <Dashboard>
    <ContentContainer>
      <ContentHeader>
        <H1>Groups</H1>
        <Link href="/groups/new">
          <LinkText>
            <BorderButton>New Group</BorderButton>
          </LinkText>
        </Link>
      </ContentHeader>
      <GroupList />
    </ContentContainer>
  </Dashboard>
);

export default Groups;
