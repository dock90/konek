import styled from 'styled-components';
// components
import Layout from '../../components/Layout';
import Profile from '../../components/profile';

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const ProfilePage = () => (
  <Layout>
    <Container>
      <Profile />
    </Container>
  </Layout>
);

export default ProfilePage;
