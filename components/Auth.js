import styled from 'styled-components'
import { H1, H2 } from './styles/Typography';

// styles
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`

const Layout = styled.div`
  display: flex;
  align-items: flex-end;
  background: url('https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/bg.png');
`;

const Branding = styled.div`
  color: #ffffff;
  margin-left: 3rem;
  margin-bottom: 5rem;
  max-width: 300px;
`;

const Auth = ({ children }) => (
  <Container>
    <Layout>
      <Branding>
        <H1>CRM Beta</H1>
        <H2>Customer Relationship Management</H2>
      </Branding>
    </Layout>
    {children}
  </Container>
)

export default Auth
