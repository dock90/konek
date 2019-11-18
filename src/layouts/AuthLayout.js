import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
// material
import Grid from '@material-ui/core/Grid';

// components
import Login from '../views/Auth/Login';
import ResetPass from '../views/Auth/ResetPass';
import Signup from '../views/Auth/Signup';
import SignupConfirm from '../views/Auth/SignupConfirm';

import { H1, H2 } from '../components/Typography';

// styles
const Branding = styled.div`
  height: 100vh;
  background: #bbbbbb;
`;

const AuthLayout = () => (
  <Router>
    <Grid container>
      <Grid item xs={6}>
        <Branding>
          <H1>CRM Beta</H1>
          <H2>Customer Relationship Management</H2>
        </Branding>
      </Grid>
      <Grid item xs={6}>
        <Route exact path="/" render={() => <Redirect to="/auth/login" />} />
        <Route exact path="/auth/signup" component={Signup} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/reset" component={ResetPass} />
        <Route exact path="/auth/confirm" component={SignupConfirm} />
      </Grid>
    </Grid>
  </Router>
);

export default AuthLayout;
