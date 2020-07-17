import Layout from '../../components/Layout';
import GroupEdit from '../../components/groups/GroupEdit';
import { ContentContainer } from '../../components/styles/PageStyles';

export default ({ query }) => (
  <Layout>
    <ContentContainer>
      <GroupEdit groupId={query.id} />
    </ContentContainer>
  </Layout>
);
