import Link from 'next/link';
import styled from 'styled-components';
import Dashboard from '../../components/Dashboard';
// components
import { H2 } from '../../components/styles/Typography';
import { StyledButton } from '../../components/material/StyledButton';
import ContactList from '../../components/contacts/ContactList';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Contacts = () => (
  <Dashboard>
    <Container>
      <Header>
        <H2>Contacts</H2>
        <Link href="/contacts/newContact">
          <a>
            <StyledButton>Add Contact</StyledButton>
          </a>
        </Link>
      </Header>
      <ContactList />
    </Container>
  </Dashboard>
);

export default Contacts;
