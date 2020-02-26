import Router from 'next/router';
import styled from 'styled-components';
// material
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { auth } from '../config/firebase';

// components
import { H4 } from './styles/Typography';
import Search from './search';
import { BaseButton } from './material/StyledButton';

// styles
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

const Header = () => {
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
        <Search />
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
    </Container>
  );
};

export default Header;
