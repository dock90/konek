import React from 'react';
import styled from 'styled-components';
// material
import Avatar from '@material-ui/core/Avatar';

// components
import { H4 } from './Typography';

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
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => (
  <Layout>
    <Branding>
      <Avatar
        alt="CRM Beta Logo"
        src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/logo.png"
      />
      <H4>CRM Beta</H4>
    </Branding>
    <Actions>
      <p>Searchbar</p>
      <p>Notifications</p>
      <button>SIGN OUT</button>
    </Actions>
  </Layout>
);

export default Header;
