import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// material
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

// components
import { H6, AltText } from './Typography';

// styles
const Layout = styled.div`
  grid-area: sidenav;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 1rem;
`;

const NavLayout = styled.div``;

const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTitle = styled.div`
  padding-left: 1rem;
`;

const Navbar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = index => {
    setSelectedIndex(index);
  };

  return (
    <Layout>
      <NavLayout>
        <List component="nav" aria-label="main mailbox folders">
          <Link
            to="/timeline"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Timeline" />
            </ListItem>
          </Link>
          <Link
            to="/contacts"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItem>
          </Link>
          <Link
            to="/messages"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 2}
              onClick={event => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
          </Link>
          <Link
            to="/groups"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={event => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
            </ListItem>
          </Link>
          <Link
            to="/events"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 4}
              onClick={event => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <WorkOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
          </Link>
          <Link
            to="/calendar"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 5}
              onClick={event => handleListItemClick(event, 5)}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            to="/settings"
            style={{
              textDecoration: 'none',
              color: '#37474F',
            }}
          >
            <ListItem
              button
              selected={selectedIndex === 6}
              onClick={event => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </NavLayout>
      <Link
        to="/profile"
        style={{
          textDecoration: 'none',
          color: '#37474F',
        }}
      >
        <ProfileLayout>
          <Avatar
            alt="User Profile Image"
            src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/profile.png"
            style={{
              height: 60,
              width: 60,
            }}
          />
          <ProfileTitle>
            <H6>Aaron Beiler</H6>
            <AltText color="#9EA0A5">Managing Director</AltText>
          </ProfileTitle>
        </ProfileLayout>
      </Link>
    </Layout>
  );
};

export default Navbar;
