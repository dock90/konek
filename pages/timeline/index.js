import styled from 'styled-components';
// components
import Layout from '../../components/Layout';
import Greeting from '../../components/timeline/Greeting';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const Timeline = () => (
  <Layout>
    <Container>
      <Greeting />
    </Container>
  </Layout>
);

export default Timeline;
