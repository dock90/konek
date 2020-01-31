import styled from 'styled-components';
import Dashboard from '../../components/Dashboard';
// components
import CreateContact from '../../components/contacts/CreateContact';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const NewContact = () => (
  <Dashboard>
    <Container>
      <CreateContact />
    </Container>
  </Dashboard>
);

export default NewContact;
