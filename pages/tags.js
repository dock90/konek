import Layout from '../components/Layout';
import {
  ContentContainer,
  ContentHeader,
} from '../components/styles/PageStyles';
import { H1 } from '../components/styles/Typography';
import TagsEdit from '../components/tags/TagsEdit';

const Tags = () => (
  <Layout>
    <ContentContainer>
      <ContentHeader>
        <H1>Tags</H1>
      </ContentHeader>
      <TagsEdit />
    </ContentContainer>
  </Layout>
);

export default Tags;
