import Link from 'next/link';
import styled from 'styled-components';
// components
import ContactList from '../../components/contacts/ContactList';
import Dashboard from '../../components/Dashboard';
import { H2, LinkText } from '../../components/styles/Typography';
import { BorderButton } from '../../components/material/StyledButton';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Contacts = () => (
  <Dashboard>
    <Container>
      <Header>
        <H2>Contacts</H2>
        <Link href="/contacts/newContact" as="/contacts/new-contact">
          <LinkText>
            <BorderButton>Add Contact</BorderButton>
          </LinkText>
        </Link>
      </Header>
      <ContactList />
    </Container>
  </Dashboard>
);

export default Contacts;
