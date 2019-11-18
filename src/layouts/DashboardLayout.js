import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

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
  <Router>
    <div>
      <Header />
      <Navbar />
      <Route exact path="/" render={() => <Redirect to="/timeline" />} />
      <Route exact path="/timeline" component={TimelineContainer} />
      <Route exact path="/contacts" component={ContactsContainer} />
      <Route exact path="/messages" component={MessagesContainer} />
      <Route exact path="/groups" component={GroupsContainer} />
      <Route exact path="/events" component={EventsContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/calendar" component={CalendarContainer} />
    </div>
  </Router>
);

export default DashboardLayout;
