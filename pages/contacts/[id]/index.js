import styled from "styled-components";
// components
import Dashboard from "../../../components/Dashboard";
import ContactOverview from "../../../components/contact/ContactOverview";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Contact = ({ query }) => (
  <Dashboard>
    <Container>
      <ContactOverview id={query.id} />
    </Container>
  </Dashboard>
);

export default Contact;
