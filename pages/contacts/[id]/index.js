import Layout from '../../../components/Layout';
import ContactOverview from '../../../components/contact/ContactOverview';
import { ContentContainer } from '../../../components/styles/PageStyles';

const Contact = ({ query }) => (
  <Layout>
    <ContentContainer>
      <ContactOverview id={query.id} />
    </ContentContainer>
  </Layout>
);

export default Contact;
