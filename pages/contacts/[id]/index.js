import styled from "styled-components";
// components
import Layout from "../../../components/Layout";
import ContactOverview from "../../../components/contact/ContactOverview";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Contact = ({ query }) => (
  <Layout>
    <Container>
      <ContactOverview id={query.id} />
    </Container>
  </Layout>
);

export default Contact;
