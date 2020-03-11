import React, { useMemo, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Query, useQuery } from "react-apollo";
// queries
import { ME_QUERY } from "../queries/MeQueries";
// material
import Divider from "@material-ui/core/Divider";
import { Badge } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// icons
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import TagsIcon from '@material-ui/icons/LabelOutlined';
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import EmailIcon from "@material-ui/icons/Email";
// components
import { H6, AltText } from "./styles/Typography";
import { ROOMS_QUERY } from "../queries/RoomQueries";
import AvatarPicture from "./assets/AvatarPicture";

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

const arrowIconStyle = {
  width: 13,
  height: 13,
};

const Nav = () => {
  const [qtyUnread, setQtyUnread] = useState(0);
  const { loading, error: roomsError, data: roomsData } = useQuery(ROOMS_QUERY);
  // We don't care about loading because the query is executed by a higher component and will only render
  // children once it is loaded.
  const { data: meData } = useQuery(ME_QUERY);

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

  const me = meData.me;

  return (
    <Container>
      <NavLayout>
        <List component="nav" aria-label="main mailbox folders">
          {me.access.timeline && (
            <Link href="/timeline">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Timeline" />
                <ArrowForwardIosIcon
                  style={arrowIconStyle}
                />
              </ListItem>
            </Link>
          )}
          {me.access.contacts && (
            <Link href="/contacts">
              <ListItem button>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Contacts" />
                <ArrowForwardIosIcon
                  style={arrowIconStyle}
                />
              </ListItem>
            </Link>
          )}
          {me.access.messages && (
            <Link href="/messages">
              <ListItem button>
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText>
                  Messages
                  <span style={{ float: "right" }}></span>
                </ListItemText>
                {qtyUnread <= 0 && (
                  <ArrowForwardIosIcon
                    style={arrowIconStyle}
                  />
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
                <ListItemText primary="Groups" />
                <ArrowForwardIosIcon
                  style={arrowIconStyle}
                />
              </ListItem>
            </Link>
          )}
          {me.access.contacts && (
            <Link href="/tags">
              <ListItem button>
                <ListItemIcon>
                  <TagsIcon />
                </ListItemIcon>
                <ListItemText primary="Tags" />
                <ArrowForwardIosIcon
                  style={arrowIconStyle}
                />
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
                  <ListItemText primary="Events" />
                  <ArrowForwardIosIcon
                    style={arrowIconStyle}
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
                    style={arrowIconStyle}
                  />
                </ListItem>
              </Link>
            </>
          )}
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
                style={arrowIconStyle}
              />
            </ListItem>
          </Link>
          <Link href="/invitation">
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Invitations" />
              <ArrowForwardIosIcon
                style={arrowIconStyle}
              />
            </ListItem>
          </Link>
        </List>
      </NavLayout>
      <Link href="/profile">
        <ProfileLayout>
          <AvatarPicture size={60} picture={me.picture} />
          <ProfileTitle>
            <H6>{me.name}</H6>
            <AltText color="#9EA0A5">Managing Director</AltText>
          </ProfileTitle>
        </ProfileLayout>
      </Link>
    </Container>
  );
};

export default Nav;
