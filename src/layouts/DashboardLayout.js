import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const DashboardLayout = () => (
  <Router>
    <div>
      <h1>Ill be the header</h1>
      <h1>Ill be the sidebar</h1>
      <h1>Ill be the body</h1>
    </div>
  </Router>
);

export default DashboardLayout;
