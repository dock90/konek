import styled from "styled-components";
// components
import Layout from "../../../components/Layout";
import ContactEdit from "../../../components/contact/ContactEdit";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const EditContact = ({ query }) => (
  <Layout>
    <Container>
      <ContactEdit id={query.id} />
    </Container>
  </Layout>
);
export default EditContact;
