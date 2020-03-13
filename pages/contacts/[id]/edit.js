import styled from "styled-components";
// components
import Dashboard from "../../../components/Dashboard";
import ContactEdit from "../../../components/contact/ContactEdit";

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const EditContact = ({ query }) => (
  <Dashboard>
    <Container>
      <ContactEdit id={query.id} />
    </Container>
  </Dashboard>
);
export default EditContact;
