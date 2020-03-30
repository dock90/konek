import Layout from "../../components/Layout";
// components
import { H1, LinkText } from "../../components/styles/Typography";
import GroupList from "../../components/groups/GroupList";
import Link from "next/link";
import {
  ContentContainer,
  ContentHeader
} from "../../components/styles/PageStyles";
import {BaseButton} from "../../components/styles/Button";

const Groups = () => (
  <Layout>
    <ContentContainer>
      <ContentHeader>
        <H1>Groups</H1>
        <Link href="/groups/new">
          <LinkText>
            <BaseButton>New Group</BaseButton>
          </LinkText>
        </Link>
      </ContentHeader>
      <GroupList />
    </ContentContainer>
  </Layout>
);

export default Groups;
