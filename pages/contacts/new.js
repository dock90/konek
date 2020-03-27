import styled from 'styled-components';
import Layout from '../../components/Layout';
// components
import ContactEdit from '../../components/contact/ContactEdit';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const NewContact = () => (
  <Layout>
    <Container>
      <ContactEdit id="new" />
    </Container>
  </Layout>
);

export default NewContact;
