// components
import ContactList from "../../components/contacts/ContactList";
import Layout from "../../components/Layout";
import { ContentContainer } from "../../components/styles/PageStyles";

const Contacts = () => (
  <Layout>
    <ContentContainer>
      <ContactList />
    </ContentContainer>
  </Layout>
);

export default Contacts;
