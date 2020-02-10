import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// components
import { H6, AltText } from './styles/Typography';

// ME_QUERY
const ME_QUERY = gql`
  query ME_QUERY {
    me {
      name
    }
  }
`;

// styles
const Container = styled.div`
  grid-area: nav;
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

const Nav = () => (
  <Container>
    <NavLayout>
      <List component="nav" aria-label="main mailbox folders">
        <Link href="/timeline">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Timeline" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
        <Link href="/contacts">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
        <Link href="/messages">
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
        <Link href="/groups">
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Groups" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
        <Link href="/events">
          <ListItem button>
            <ListItemIcon>
              <WorkOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
        <Link href="/calendar">
          <ListItem button>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/settings">
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            <ArrowForwardIosIcon
              style={{
                height: 13,
                width: 13,
              }}
            />
          </ListItem>
        </Link>
      </List>
    </NavLayout>
    <Link href="/profile">
      <Query query={ME_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          const {
            me: { name },
          } = data;
          return (
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
                <H6>{name}</H6>
                <AltText color="#9EA0A5">Managing Director</AltText>
              </ProfileTitle>
            </ProfileLayout>
          );
        }}
      </Query>
    </Link>
  </Container>
);

export default Nav;
