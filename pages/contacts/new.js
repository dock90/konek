import Layout from "../../components/Layout";
import ContactEdit from "../../components/contact/ContactEdit";
import { ContentContainer } from "../../components/styles/PageStyles";

const NewContact = () => (
  <Layout>
    <ContentContainer>
      <ContactEdit id="new" />
    </ContentContainer>
  </Layout>
);

export default NewContact;
