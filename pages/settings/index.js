import styled from 'styled-components';
import Layout from '../../components/Layout';
// components
import { H1 } from '../../components/styles/Typography';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Settings = () => (
  <Layout>
    <Container>
      <H1>Settings</H1>
    </Container>
  </Layout>
);

export default Settings;
