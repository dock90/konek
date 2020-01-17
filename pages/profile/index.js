import styled from 'styled-components';
// components
import Dashboard from '../../components/Dashboard'
import Profile from '../../components/profile'

// styles
const Container = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const ProfilePage = () => (
  <Dashboard>
    <Container>
      <Profile />
    </Container>
  </Dashboard>
)

export default ProfilePage
