import styled from 'styled-components'
// material
import Grid from '@material-ui/core/Grid';
import { H1, H2 } from './Typography';

// styles
const Layout = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100vh;
  background: #bbbbbb;
  background: url('https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/bg.png');
`;

const Branding = styled.div`
  color: #ffffff;
  margin-left: 3rem;
  margin-bottom: 5rem;
  max-width: 300px;
`;

const Intro = ({ children }) => (
  <Grid container>
    <Grid item xs={6}>
      <Layout>
        <Branding>
          <H1>CRM Beta</H1>
          <H2>Customer Relationship Management</H2>
        </Branding>
      </Layout>
    </Grid>
    <Grid item xs={6}>
      {children}
    </Grid>
  </Grid>
)

export default Intro
