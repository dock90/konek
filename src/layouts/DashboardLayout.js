import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import styled from 'styled-components';

// components
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import CalendarContainer from '../views/Calendar/CalendarContainer';
import ContactsContainer from '../views/Contacts/ContactsContainer';
import EventsContainer from '../views/Events/EventsContainer';
import GroupsContainer from '../views/Groups/GroupsContainer';
import MessagesContainer from '../views/Messages/MessagesContainer';
import ProfileContainer from '../views/Profile/ProfileContainer';
import TimelineContainer from '../views/Timeline/TimelineContainer';
import SettingsContainer from '../views/Settings/SettingsContainer';

// styles
const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    'header header'
    'sidenav main'
    'sidenav main';
  height: 100%;
`;

const DashboardLayout = () => (
  <Layout>
    <Header />
    <Navbar />
    <Switch>
      <Route exact path="/timeline" component={TimelineContainer} />
      <Route exact path="/contacts" component={ContactsContainer} />
      <Route exact path="/messages" component={MessagesContainer} />
      <Route exact path="/groups" component={GroupsContainer} />
      <Route exact path="/events" component={EventsContainer} />
      <Route exact path="/calendar" component={CalendarContainer} />
      <Route exact path="/settings" component={SettingsContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route render={() => <Redirect to="/timeline" />} />
    </Switch>
  </Layout>
);

export default DashboardLayout;
