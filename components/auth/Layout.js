import styled from 'styled-components';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useRouter } from 'next/router';
import { Logo } from '../styles/Logo';
import { Hidden } from '@material-ui/core';

// styles
const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: 'branding content';
  height: 100vh;
  @media (max-width: 800px) {
    grid-template-columns: auto;
    grid-template-areas: 'branding' 'content';
    grid-template-rows: 150px auto;
  }
  @media (max-width: 600px) {
    grid-template-rows: 75px auto;
  }
`;

const Branding = styled.div`
  grid-area: branding;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.gray};
`;

const ContentContainer = styled.div`
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const Layout = ({ children }) => {
  const authenticated = useAuthenticated(false);
  const router = useRouter();

  if (authenticated === true) {
    let target = '/';
    if (router.query.target) {
      target = decodeURIComponent(router.query.target);
    }
    router.replace(target);
  }
  return (
    <Container>
      <Branding>
        <Hidden xsDown>
          <Logo size={100} />
        </Hidden>
        <Hidden smUp>
          <Logo size={50} />
        </Hidden>
      </Branding>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Layout;
