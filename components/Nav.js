import React, { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
// material
import Divider from '@material-ui/core/Divider';
import { Badge } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// icons
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import TagsIcon from '@material-ui/icons/LabelOutlined';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EmailIcon from '@material-ui/icons/Email';
// components
import { H6, AltText } from './styles/Typography';
import { ROOMS_QUERY } from '../queries/RoomQueries';
import AvatarPicture from './assets/AvatarPicture';
import { MeContext } from '../contexts/MeContext';

// styles
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #ffffff;
  padding: 1rem;
`;

const NavLayout = styled.div`
  flex-grow: 1;
`;

const StyledListItemText = styled(ListItemText)`
  .MuiListItemText-primary {
    font-size: 12px;
  }
`;

const ProfileLayout = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTitle = styled.div`
  padding-left: 1rem;
`;

const arrowIconStyle = {
  width: 13,
  height: 13,
};

const Nav = ({ children }) => {
  const [qtyUnread, setQtyUnread] = useState(0);
  const { loading, error: roomsError, data: roomsData } = useQuery(ROOMS_QUERY);
  const me = useContext(MeContext);

  useMemo(() => {
    if (loading || roomsError) {
      return;
    }

    let qty = 0;
    for (const room of roomsData.rooms) {
      qty += room.qtyUnread;
    }

    setQtyUnread(qty);
  }, [loading, roomsData]);

  return (
    <Container>
      {children}
      <NavLayout>
        <List component="nav" aria-label="main mailbox folders">
          {false && me.access.timeline && (
            <Link href="/timeline">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Timeline" />
                <ArrowForwardIosIcon style={arrowIconStyle} />
              </ListItem>
            </Link>
          )}
          {me.access.contacts && (
            <Link href="/contacts">
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <StyledListItemText primary="Contacts" />
                <ArrowForwardIosIcon style={arrowIconStyle} />
              </ListItem>
            </Link>
          )}
          {me.access.messages && (
            <Link href="/messages">
              <ListItem button>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <StyledListItemText>
                  Messages
                  <span style={{ float: 'right' }}></span>
                </StyledListItemText>
                {qtyUnread <= 0 && (
                  <ArrowForwardIosIcon style={arrowIconStyle} />
                )}
                <Badge badgeContent={qtyUnread} color="primary" />
              </ListItem>
            </Link>
          )}
          {me.access.groups && (
            <Link href="/groups">
              <ListItem button>
                <ListItemIcon>
                  <SupervisedUserCircleIcon />
                </ListItemIcon>
                <StyledListItemText primary="Groups" />
                <ArrowForwardIosIcon style={arrowIconStyle} />
              </ListItem>
            </Link>
          )}
          {me.access.contacts && (
            <Link href="/tags">
              <ListItem button>
                <ListItemIcon>
                  <TagsIcon />
                </ListItemIcon>
                <StyledListItemText primary="Tags" />
                <ArrowForwardIosIcon style={arrowIconStyle} />
              </ListItem>
            </Link>
          )}
          {false && (
            <>
              <Link href="/events">
                <ListItem button>
                  <ListItemIcon>
                    <WorkOutlineIcon />
                  </ListItemIcon>
                  <StyledListItemText primary="Events" />
                  <ArrowForwardIosIcon style={arrowIconStyle} />
                </ListItem>
              </Link>
              <Link href="/calendar">
                <ListItem button>
                  <ListItemIcon>
                    <CalendarTodayIcon />
                  </ListItemIcon>
                  <StyledListItemText primary="Calendar" />
                  <ArrowForwardIosIcon style={arrowIconStyle} />
                </ListItem>
              </Link>
            </>
          )}
        </List>
        <Divider />
        <List>
          {false && (
            <Link href="/settings">
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <StyledListItemText primary="Settings" />
                <ArrowForwardIosIcon style={arrowIconStyle} />
              </ListItem>
            </Link>
          )}
          <Link href="/invitation">
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <StyledListItemText primary="Invitations" />
              <ArrowForwardIosIcon style={arrowIconStyle} />
            </ListItem>
          </Link>
        </List>
      </NavLayout>
      <Link href="/profile">
        <a>
          <ProfileLayout>
            <AvatarPicture size={40} picture={me.picture} />
            <ProfileTitle>
              <H6>{me.name}</H6>
              <AltText color="#9EA0A5">&nbsp;</AltText>
            </ProfileTitle>
          </ProfileLayout>
        </a>
      </Link>
    </Container>
  );
};

export default Nav;
