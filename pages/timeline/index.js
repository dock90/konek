import styled from 'styled-components';
// components
import Dashboard from '../../components/Dashboard';
import Greeting from '../../components/timeline/Greeting';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Timeline = () => (
  <Dashboard>
    <Container>
      <Greeting />
    </Container>
  </Dashboard>
);

export default Timeline;
