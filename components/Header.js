import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { auth } from '../config/firebase';
// material
import { Input, Menu, NotificationsOutlined } from '@material-ui/icons';
import { Badge, Hidden, IconButton } from '@material-ui/core';
// components
import Search from './search';
import { BaseButton } from './styles/Button';
import { Logo } from './styles/Logo';

// styles
const MenuToggle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Container = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  background: #bbbbbb;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ drawerToggle }) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User Signed Out');
        Router.push('/auth/login');
      })
      .catch(error => {
        console.log('There was an error signing out: ', error);
      });
  };

  return (
    <Container>
      <Hidden smUp>
        <MenuToggle>
          <IconButton onClick={drawerToggle}>
            <Menu fontSize="large" />
          </IconButton>
        </MenuToggle>
      </Hidden>
      <Branding>
        <Logo />
      </Branding>
      <Actions>
        <Search />
        {false && (
          <IconButton color="inherit">
            <Badge variant="dot">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
        )}
        <BaseButton color="inherit" onClick={handleLogout}>
          <Input />
          &nbsp;Sign out
        </BaseButton>
      </Actions>
    </Container>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
