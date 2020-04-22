import Layout from "../../../components/Layout";
import ContactEdit from "../../../components/contact/ContactEdit";
import { ContentContainer } from "../../../components/styles/PageStyles";

const EditContact = ({ query }) => (
  <Layout>
    <ContentContainer>
      <ContactEdit id={query.id} />
    </ContentContainer>
  </Layout>
);
export default EditContact;
