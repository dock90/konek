import Layout from "../../components/Layout";
import GroupEdit from "../../components/groups/GroupEdit";
import { ContentContainer } from "../../components/styles/PageStyles";

export default () => (
  <Layout>
    <ContentContainer>
      <GroupEdit groupId="new" />
    </ContentContainer>
  </Layout>
);
