import styled from 'styled-components';
import Dashboard from '../../components/Dashboard';
// components
import ContactEdit from '../../components/contact/ContactEdit';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const NewContact = () => (
  <Dashboard>
    <Container>
      <ContactEdit id="new" />
    </Container>
  </Dashboard>
);

export default NewContact;
