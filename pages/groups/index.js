import styled from 'styled-components';
import Dashboard from '../../components/Dashboard'
// components
import { H1 } from '../../components/styles/Typography';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Groups = () => (
  <Dashboard>
    <Container>
      <H1>GROUPS</H1>
    </Container>
  </Dashboard>
)

export default Groups
