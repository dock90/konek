import React from 'react';
import styled from 'styled-components';
// material
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { auth } from '../firebase';

// components
import { H4 } from './Typography';
import SearchInput from './SearchInput';
import { BaseButton } from './StyledButton';

// styles
const Layout = styled.div`
  display: flex;
  flex: 1 100%;
  justify-content: space-between;
  background: #bbbbbb;
  height: 64px;
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

const Header = () => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User Signed Out');
        localStorage.removeItem('AUTH_TOKEN');
      })
      .catch(error => {
        console.log('There was an error signing out: ', error);
      });
  };

  return (
    <Layout>
      <Branding>
        <Avatar
          alt="CRM Beta Logo"
          src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/logo.png"
        />
        <H4 color="#ffffff" pLeft="0.5rem">
          CRM Beta
        </H4>
      </Branding>
      <Actions>
        <SearchInput />
        <IconButton color="inherit">
          <Badge variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <BaseButton color="inherit" onClick={handleLogout}>
          <InputIcon />
          Sign out
        </BaseButton>
      </Actions>
    </Layout>
  );
};

export default Header;
