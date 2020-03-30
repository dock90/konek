import Link from "next/link";
import styled from "styled-components";
import { Add } from "@material-ui/icons";
// components
import ContactList from "../../components/contacts/ContactList";
import Layout from "../../components/Layout";
import { H2 } from "../../components/styles/Typography";
import {BaseButton} from "../../components/styles/Button";

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
  <Layout>
    <Container>
      <Header>
        <H2>Contacts</H2>
        <Link href="/contacts/new">
          <BaseButton><Add /> New Contact</BaseButton>
        </Link>
      </Header>
      <ContactList />
    </Container>
  </Layout>
);

export default Contacts;
