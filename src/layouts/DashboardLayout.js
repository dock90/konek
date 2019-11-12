import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// components
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const DashboardLayout = () => (
  <Router>
    <div>
      <Header />
      <Navbar />
      <h1>Ill be the body</h1>
    </div>
  </Router>
);

export default DashboardLayout;
