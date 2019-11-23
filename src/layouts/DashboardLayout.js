import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

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

const DashboardLayout = () => (
  <>
    <Header />
    <Navbar />
    <Switch>
      <Route path="/timeline" component={TimelineContainer} />
      <Route path="/contacts" component={ContactsContainer} />
      <Route path="/messages" component={MessagesContainer} />
      <Route path="/groups" component={GroupsContainer} />
      <Route path="/events" component={EventsContainer} />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/calendar" component={CalendarContainer} />
      <Route render={() => <Redirect to="/timeline" />} />
    </Switch>
  </>
);

export default DashboardLayout;
