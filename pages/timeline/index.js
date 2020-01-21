import styled from 'styled-components';
// components
import Dashboard from '../../components/Dashboard';
import { H3, H5 } from '../../components/styles/Typography';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Timeline = () => (
  <Dashboard>
    <Container>
      <H3>Good morning, Aaron.</H3>
      <H5>Heres what happened while you were away.</H5>
    </Container>
  </Dashboard>
);

export default Timeline;
