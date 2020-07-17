import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { ME_QUERY } from '../queries/MeQueries';
import { MeContext } from '../contexts/MeContext';
import { useAuthenticated } from '../hooks/useAuthenticated';
import { useState } from 'react';
// Material UI
import { SwipeableDrawer, Hidden, IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
// components
import Header from './Header';
import Nav from './Nav';
import Loading from './Loading';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 64px auto;
  grid-template-areas:
    'header header'
    'nav main';
  height: 100vh;

  @media screen and (max-width: 600px) {
    // This isn't perfect, as it doesn't exactly align with the <Hidden> component, but it works.
    grid-template-columns: auto;
    grid-template-areas:
      'header'
      'main';
  }
`;
const NavContainer = styled.div`
  grid-area: nav;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  .MuiDrawer-docked {
    height: 100%;
  }
  .MuiDrawer-paper {
    position: relative;
  }
`;
const NavCollapse = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Layout = ({ children }) => {
  const authenticated = useAuthenticated();
  const [navOpen, setNavOpen] = useState(false);

  // We run this query at the top level so that the cache is populated. Future queries will never
  // be in the loading state and can use the data directly.
  const { loading, error, data } = useQuery(ME_QUERY, {
    skip: !authenticated
  });

  let iOs = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const handleDrawerToggle = () => {
    setNavOpen(!navOpen);
  };

  if (authenticated) {
    return (
      <MeContext.Provider value={data.me}>
        <MainContainer>
          <Header drawerToggle={handleDrawerToggle} />
          {/* The mobile nav */}
          <Hidden smUp implementation="js">
            <SwipeableDrawer
              open={navOpen}
              onOpen={handleDrawerToggle}
              onClose={handleDrawerToggle}
              variant="temporary"
              disableDiscovery={iOs}
              disableBackdropTransition={!iOs}
            >
              <Nav>
                <NavCollapse>
                  <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeft fontSize="large" />
                  </IconButton>
                </NavCollapse>
              </Nav>
            </SwipeableDrawer>
          </Hidden>
          {/* The desktop nav */}
          <Hidden xsDown implementation="js">
            <NavContainer>
              <Nav />
            </NavContainer>
          </Hidden>
          {children}
        </MainContainer>
      </MeContext.Provider>
    );
  }
  return null;
};

export default Layout;
